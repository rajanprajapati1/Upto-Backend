// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import TopPic from '@/models/TopPic';
// const USER_ID = "68442960aae27a0095be782a";

// const topics = [
//   {
//     title: "llama-3_1-nemotron-70b-instruct.",
//     description: "AI Response Message. View. llama-3_1-nemotron-70b-instruct. How can I help you today? Say something like. Write a limerick about the wonders of GPU computing.",
//     tags: ["NVIDIA", "ai", "llm", "ollama"],
//     imageUrl: "https://i.ibb.co/QF1MXks2/80b239d6e367.png",
//     externalLink: "https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct",
//     reference: "https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct",
//   },
//   {
//     title: "Qwen Chat",
//     description: "Qwen Chat offers comprehensive functionality spanning chatbot, image and video understanding, image generation, document processing, web search integratio",
//     tags: ["Qwen", "ai", "llm", "china"],
//     imageUrl: "https://i.ibb.co/0jyDXtH5/18400d80605e.png",
//     externalLink: "https://chat.qwen.ai",
//     reference: "https://chat.qwen.ai"
//   },
//   {
//     title: "Mistral AI: Frontier AI LLMs, assistants, agents, services",
//     description: "Unified AI for all your work. Your multilingual, multimodal AI assistant that can help with anything. Search, create, code, learn, automate and collaborate with...",
//     tags: ["Mistral", "llm", "ai", "Mistral AI", "chatgpt", "claude", "agent"],
//     imageUrl: "https://i.ibb.co/N2YnZRkp/7cba38f0ae27.jpg",
//     externalLink: "https://mistral.ai/",
//     reference: "https://mistral.ai/"
//   },
//   {
//     title: "Grok AI ",
//     description: "Meet Grok by x AI: your truth-seeking AI companion for honest answers and insightful analysis.",
//     tags: ["Grok", "x", "twitter", "ai", "llm"],
//     imageUrl: "https://i.ibb.co/d01TGNRQ/49cd819acde8.webp",
//     externalLink: "https://x.ai/grok",
//     reference: "https://grok.com"
//   },
//   {
//     title: "Google Gemini",
//     description: "Gemini is your personal, proactive, and powerful AI assistant from Google. Try it for free to help with work, school, and at home for whatever inspires you.",
//     tags: ["google", "gemini", "llm"],
//     imageUrl: "https://i.ibb.co/FqDX6vy5/3f9fdfae0b79.jpg",
//     externalLink: "https://gemini.google.com/",
//     reference: "https://gemini.google.com/app"
//   },
//   {
//     title: "Firebase Studio - Make your app   the best it can be with Firebase and generative AI",
//     description: "Build AI-powered experiences into your apps and accelerate app development with managed infrastructure, powered by Google Cloud, so you can focus on what matters most.",
//     tags: ["Firebase", "AI", "Firebase Studio"],
//     imageUrl: "https://i.ibb.co/jvVj85hD/612973363c97.png",
//     externalLink: "https://firebase.google.com/",
//     reference: ""
//   },
//   {
//     title: "llamacoder - Turn your idea into an app",
//     tags: ["llamacoder", "Quiz app SaaS Landing page Pomodoro Timer Blog app Flashcard app Timezone dashboard", "facebook", "ollama", "lama", "meta"],
//     imageUrl: "https://llamacoder.io/og-image.png",
//     externalLink: "https://llamacoder.together.ai/",
//   },
//   {
//     title: "What is Claude AI? Understanding its Function and Purpose",
//     tags: ["Claude ", "ai", "anthropic"],
//     imageUrl: "https://miro.medium.com/v2/resize:fit:1024/1*hCxk2mtEOgt5K1izVBn2zQ.png"
//   },
//   {
//     title: "The Evolution of ChatGPT & AI Interfaces",
//     description: "Exploring the new tiered offerings of ChatGPT and how it changes the game.",
//     tags: ["AI", "ChatGPT", "OpenAI", "News"],
//     imageUrl: "https://media.wired.com/photos/66425c483aeee12d6ca99835/4:3/w_2400,h_1800,c_limit/New-ChatGPT-Tier-Gear-GettyImages-2151457871.jpg",
//     externalLink: "https://www.wired.com/story/chatgpt-new-tiers/",
//     reference: "https://openai.com/chatgpt"
//   },
//   {
//     title: "Next.js + Netlify: Perfect Combo?",
//     description: "A quick test post using a Netlify image to check API integration.",
//     tags: ["Next.js", "Netlify", "Web"],
//     imageUrl: "https://www.netlify.com/_astro/ac77c3fd1d2b79690380ca6709898f717d5272c5-1200x630_tyhJP.webp",
//     externalLink: "https://www.netlify.com/blog/",
//     reference: "https://nextjs.org/"
//   }
// ].map(topic => ({
//   ...topic,
//   user: USER_ID,
// }));
// export async function GET() {
//   try {
//     await connectDB();
//     const a = await TopPic.insertMany(topics);
//     return NextResponse.json({ success: true, a }, { status: 500 });


//   } catch (error) {
//     console.error('Test post creation failed:', error);
//     return NextResponse.json({ success: false, message: 'Error creating test2 post', error: error.message }, { status: 500 });
//   }
// }
