import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Google Generative AI with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '');

// System prompt to guide the AI's behavior
const SYSTEM_PROMPT = `You are a helpful food assistant for a restaurant. Your job is to help users:
1. Find food items on the menu
2. Answer questions about ingredients and preparation
3. Make recommendations based on dietary preferences
4. Help with food selection

Be friendly, concise, and helpful. If you don't know something, say so honestly.

Current menu items (with descriptions):
- Margherita Pizza: Classic pizza with tomato sauce, mozzarella, and basil
- Spaghetti Carbonara: Pasta with eggs, cheese, pancetta, and black pepper
- Caesar Salad: Romaine lettuce, croutons, parmesan, with Caesar dressing
- Grilled Salmon: Fresh salmon fillet with lemon butter sauce and vegetables
- Chocolate Lava Cake: Warm chocolate cake with a molten center, served with vanilla ice cream

Note: Always respond in markdown format for better readability.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "Hello! I'm your food assistant. How can I help you with your order today?",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send the message and get the response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
