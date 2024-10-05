import { NextResponse } from "next/server";
import { wordBank } from "./words_to_images.json";

// To handle a GET request to /api
export async function GET(request) {

  const randomWords = Object.values(wordBank)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  return NextResponse.json({
    "a": randomWords[0],
    "b": randomWords[1],
    "c": randomWords[2]
   }, { status: 200 });
   
}
