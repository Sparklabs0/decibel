import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getNoteSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prompt = `
    You you're given a machine-generated
    transcript of an audio file.
    
    You must edit the transcript so that it works as a
    written piece of note for studying later to boost productivity
    (that is, makes sense without the
    audio file). Make sure you retain all
    the key pieces and important information.
    
    The given text is: ${req.body.prompt}. Create a valid JSON array of objects for the summary following this format:

    [{"summary": "the study note of the audio expanded to at least 100 words"}]

    Use at least 100 words for summary field.
    
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
