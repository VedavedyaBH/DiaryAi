const { GoogleGenerativeAI } = require("@google/generative-ai");
import dotenv from "dotenv";

// Access your API key as an environment variable (see "Set up your API key" above)

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTitle(content: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give a title for this ${content}.
    Do not respond with anthing else. Just the title.
    Add emotions to it. Should not be very long. Include today's (India) date also.
    Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    console.log(text);
    return text;
}

export async function generateTags(content: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give tags based on this ${content}.
    Do not respond with anthing else. Just the tags. Maximum 3 tags. Minimum 1 tag.
    Should be a word. Should not be very long.
    For example, if the content has "sad" emotions, give sad as tag.
    Happy, success, lonley, betrayal are some of the examples,
    Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    console.log(text);
    return text;
}

export async function generateResponse(content: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give response to this ${content}. Console/motivate/cheer according to the content.
    Keep it concise. Respond like a brother/father/mother/family/friend etc.
    Ignore html tags like <p><h1><pre> etc`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    console.log(text);
    return text;
}
