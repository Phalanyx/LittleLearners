import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
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
}
