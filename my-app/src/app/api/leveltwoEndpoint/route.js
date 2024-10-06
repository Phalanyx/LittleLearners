import { NextResponse } from "next/server";


import wordBank from "./words_to_images.json";


// To handle a GET request to /api
function getRandomKeys(obj) {
  const keys = Object.keys(obj); // Get all keys from the object
  // Shuffle the keys array using sort with a random comparator
  const shuffledKeys = keys.sort(() => 0.5 - Math.random());
  // Return the first 3 keys from the shuffled array
  return shuffledKeys.slice(0, 3);
}




export async function GET(request) {

  const randomWords = Object.values(wordBank)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);


  const randomPairs = getRandomKeys(wordBank);
  const links = randomPairs.map((key) => wordBank[key]);
  return NextResponse.json({randomPairs, links}, { status: 200 });
   
}
