import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateSummary = async (text) => {
  const prompt = `Summarize the following note into 3-5 concise bullet points and respond only with the summary, no other text. Only use provided info:\n\n${text}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You summarize notes into clear bullet points.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};

export default generateSummary;