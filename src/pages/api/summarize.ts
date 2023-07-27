import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getNoteSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = `
      Pretend to be an expert summarizer and notes generator for a given text.
      The given text is: ${req.body.prompt}. Create a valid JSON array of objects for the summary following this format:
    
      [{"summary": "the summary of the prompt given by the user"}]
    
      The JSON object:`;

    const prompt2 = `You are an enthusiastic student and an amazing writer who has is nerd and 
      always makes notes, you just listed to a wise man speak and tell you something very important
      At the end, you're given a machine-generated transcript of his speakings.
      You must edit the transcript so that it works as a written piece 
      (that is, makes sense without the accompanying visuals).
       Make sure you retain all the key pieces and important information.
      After you're done, generate a list of the most important points discussed in the 
      lecture sort of a "lessons learned").
       Each point should have a title followed by a paragraph that properly conveys the idea.
      Use at least 1,000 words. here is your transcript: ${req.body.prompt}.`;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt2,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_KEY || ""}`,
        },
      }
    );

  console.log("response", response.data);

   const summary = response.data.choices[0].text.trim();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error generating note summary:", error);
    res.status(500).json({ error: "Failed to generate note summary",message: error });
  }
};

export default getNoteSummary;
