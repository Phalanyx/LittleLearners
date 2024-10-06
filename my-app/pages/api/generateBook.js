require('dotenv').config();
const openai = require('openai');

// Handler for the API route
export default async function handler(req, res) {

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { preferences } = req.body;

    const model = new openai(process.env.OPENAI_API_KEY);  

    try {
        const book = await GenerateBook(model, preferences);
        console.log(book);
        return res.status(200).json({ book });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Error generating book' });
    }
}

// Generate the book content and images
async function GenerateBook(model, preferences) {

    const book = {};
    
    const pages_content = await GenerateContent(model, preferences);
    const pages_images = await GenerateImages(model, pages_content);

    for (let i = 0; i < pages_content.length; i++) {
        book[`Content ${i + 1}`] = pages_content[i];
        book[`Image ${i + 1}`] = pages_images[i];
    }

    return book;

}

// Split the story content into pages (max 50 words per page)
function SplitContent(story, max_words_per_page = 50) {

    const words = story.split(' ');
    const pages = [];

    // Remove any asterisks from the words generated by the model
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/\*/g, '');
    }

    for (let i = 0; i < words.length; i += max_words_per_page) {
        pages.push(words.slice(i, i + max_words_per_page).join(' '));
    }

    return pages;

}

async function GenerateContent(model, preferences) {

    console.log('Generating content...');

    const main_character = preferences.main_character;
    const theme = preferences.theme;
    const story = preferences.story;
    const creativity = preferences.creativity;

    const outline = `The story follows protagonist ${main_character} through a ${theme} themed narrative focusing on the following plot: ${story}.`;

    const generate_story = async() => {
        try {
            const response = await model.chat.completions.create({
                model: 'chatgpt-4o-latest',
                messages: [
                    { role: 'system', content: `You are a children's story writer.` },
                    { role: 'user', content: `Write a short children's story (no title) based on the following requirements: ${outline} (Strictly between 100 and 200 words)` },
                ],
                max_tokens: 250,
                temperature: creativity,
            });
            const content = SplitContent(response.choices[0].message.content);
            return content;
        } 
        catch (error) {
            console.error("Error generating story:", error);
            return '';
        }
    }

    return generate_story();

}

async function GenerateImages(model, pages_content) {

    console.log('Generating images...');
    
    const generate_image = async(page_prompt) => {
        try {
            const response = await model.images.generate({
                model: 'dall-e-3',
                prompt: `Generate a cartoon image (no text) based on the following prompt: ${page_prompt}`,
                size: '1024x1024',
                quality: 'standard',
                num_images: 1
            });
            return response.data[0].url;
        }
        catch (error) {
            console.error("Error generating image:", error);
            return '';
        }
    }

    const imagePromises = pages_content.map(page => generate_image(page));

    return await Promise.all(imagePromises);

}