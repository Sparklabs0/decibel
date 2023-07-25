import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getNoteSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = `
      Pretend to be an expert summarizer and notes generator for a given text.
      The given text is: ${req.body.prompt}. Create a valid JSON array of objects for the summary following this format:
    
      [{"summary": "the summary of the prompt given by the user"}]
    
      The JSON object:`;

    // Call the GPT API to generate the task description
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
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
    res.status(500).json({ error: 'Failed to generate note summary' });
  }
};

export default getNoteSummary;
