import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getNoteSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const prompt = `You are an enthusiastic student and an amazing writer who has is nerd and 
      always makes notes, you just listed to a wise man speak and tell you something very important
      At the end, you're given a machine-generated transcript of his speakings.
      You must edit the transcript so that it works as a written piece 
      (that is, makes sense without the accompanying visuals).
       Make sure you retain all the key pieces and important information.
      After you're done, generate a list of the most important points discussed in the 
      lecture sort of a "lessons learned").
       Each point should have a title followed by a paragraph that properly conveys the idea.
      Use at least 1,000 words. here is your transcript: ${req.body.prompt}.`;

    const prompt2 = `Write a Title for the transcript that is under 15 words.
    Then write: "--Summary--"
    Write "Summary" as a Heading 1.
    Write a summary of the provided transcript.
    Then write: "--Additional Info--".
    Then return a list of the main points in the provided transcript. Then return a list of action items. Then return a list of follow up questions. Then return a list of potential arguments against the transcript.
    For each list, return a Heading 2 before writing the list items. Limit each list item to 100 words, and return no more than 5 points per list.
    Transcript:
    dont forget to add line breaks after each paragraph, and it must contain all the feilds mentioned above.
     ${req.body.prompt}`
    
    const context = `You are an assistant that only speaks in Markdown. Do not write text that isn't formatted as markdown.

    Example formatting:
    
    Testing No-Code Workflow
    
    --Summary--
    
    This audio recording documents a test of a no-code workflow using Google Drive and a single code step to reduce calls and improve efficiency.
    
    --Additional Info--
    
    ## Main Points
    
    - point 1
    - point 2
    
    ## Action Items
    
    - point 1
    - point 2
    
    ## Follow Up Questions
    
    - point 1
    - point 2
    
    ## Potential Arguments Against
    
    - point 1
    - point 2`

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `system:${context} user ${prompt2}`,
        temperature: 0.2,
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
