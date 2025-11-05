// services/reviewService.js
import openai from './openaiClient.js';
import { generateReviewPrompt } from '../templates/reviewPrompt.js';

export const reviewCode = async (code) => {
  const prompt = generateReviewPrompt(code);

  const chat = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }]
  });

  return chat.choices[0].message;
};
