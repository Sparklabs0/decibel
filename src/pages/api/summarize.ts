import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getNoteSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = `
    You are given a machine-generated transcript of an audio file, and your task is to use the OpenAI model to create a valid JSON object for Editor.js.
    
    The given transcript is:
    ${req.body.prompt}
    
    Your JSON object should have the following structure:
    {
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "Your Heading Text",
            "level": 1
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Your paragraph content goes here. Be concise and keep it informative."
          }
        },
        {
          "type": "list",
          "data": {
            "style": "unordered",
            "items": [
              "List item 1",
              "List item 2",
              "List item 3"
            ]
          }
        }
      ]
    }
    
    Please use the provided transcript to populate the header, parapraph and the list in the JSON object. Make sure to retain all the key pieces and important information while creating a note out of it to increase productivity and use it for Editor.js. The JSON Object:`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0.2,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 2000,
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_KEY || ''}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();

    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error generating note summary:', error);
    res
      .status(500)
      .json({ error: 'Failed to generate note summary', message: error });
  }
};

export default getNoteSummary;
