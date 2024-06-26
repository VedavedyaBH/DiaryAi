import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTitle(content: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give a title for this ${content}.
    Do not respond with anthing else. Just the title.
    Add emotions to it. Should not be very long. No emojis.
    Just letters. Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    return text;
}

export async function generateTags(content: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give comma separated tags based on this ${content}.
    Do not respond with anthing else. Just the tags. Maximum 3 tags.
    Minimum 1 tag. Tag's length should be small.
    Should be a word. Should not be very long.
    For example, if the content has "sad" emotions, give sad as tag.
    Happy, success, lonley, betrayal are some of the examples.
    Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    return text;
}

export async function generateResponse(content: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give response to this ${content}. Console/motivate/cheer according to the content.
    Respond like a family/friend etc. If needed, give suggestions/ideas/tips as well.
    Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    return text;
}
