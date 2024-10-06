import { NextResponse } from "next/server";
<<<<<<< Updated upstream
=======
import wordBank from "./words_to_images.json";

>>>>>>> Stashed changes

// To handle a GET request to /api
function getRandomKeys(obj) {
  const keys = Object.keys(obj); // Get all keys from the object
  // Shuffle the keys array using sort with a random comparator
  const shuffledKeys = keys.sort(() => 0.5 - Math.random());
  // Return the first 3 keys from the shuffled array
  return shuffledKeys.slice(0, 3);
}




export async function GET(request) {
<<<<<<< Updated upstream
  const wordBank = {
    'a': 'apple',
    'b': 'banana',
    'c': 'carrot',
    'd': 'dog',
    'e': 'elephant',
    'f': 'frog',
    'g': 'grape',
    'h': 'hat',
    'i': 'ice',
    'j': 'jelly',
    'k': 'kite',
    'l': 'lemon',
    'm': 'monkey',
    'n': 'nose',
    'o': 'orange',
    'p': 'pear',
    'q': 'queen',
    'r': 'rabbit',
    's': 'snake',
    't': 'tiger',
    'u': 'umbrella',
    'v': 'violin',
    'w': 'whale',
    'x': 'xylophone',
    'y': 'yogurt',
    'z': 'zebra'
  }
  const randomWords = Object.values(wordBank)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  return NextResponse.json({
    "a": randomWords[0],
    "b": randomWords[1],
    "c": randomWords[2]
   }, { status: 200 });
=======

  const randomPairs = getRandomKeys(wordBank);
  const links = randomPairs.map((key) => wordBank[key]);
  return NextResponse.json({randomPairs, links}, { status: 200 });
   
>>>>>>> Stashed changes
}
