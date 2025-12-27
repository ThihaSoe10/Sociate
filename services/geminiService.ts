import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCaption = async (topic: string, language: 'en' | 'mm', tone: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "Error: API Key missing. Please configure your environment.";
  }

  const modelId = 'gemini-3-flash-preview';
  
  const systemInstruction = `You are an expert social media manager for the Myanmar market. 
  You speak fluent English and Burmese (Myanmar Unicode).
  Your goal is to write engaging, viral-worthy social media captions.
  
  If the target language is Myanmar, ensure proper Unicode encoding and natural phrasing (not robotic translation).
  Use emojis appropriately.`;

  const prompt = `Write a social media caption about "${topic}".
  Target Language: ${language === 'mm' ? 'Burmese (Myanmar)' : 'English'}
  Tone: ${tone}
  Platform: Facebook and Telegram
  Length: Short to Medium (max 3 sentences + hashtags)`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};
