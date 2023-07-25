// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  transcript: string;
};

async function transcribeAudio(api_token: string, audio_url: string) {
  const headers = {
    authorization: api_token,
    'content-type': 'application/json',
  };

  const response = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    body: JSON.stringify({ audio_url }),
    headers,
  });

  const responseData = await response.json();
  const transcriptId = responseData.id;

  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  while (true) {
    // Send a GET request to the polling endpoint to retrieve the status of the transcript
    const pollingResponse = await fetch(pollingEndpoint, { headers });
    const transcriptionResult = await pollingResponse.json();

    if (transcriptionResult.status === 'completed') {
      return transcriptionResult;
    } else if (transcriptionResult.status === 'error') {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

const Transcriber = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { source } = req.body;
  const secret = process.env.ASSEMBLY_AI_TOKEN as string;

  const transcript = await transcribeAudio(secret, source);
  res.status(200).json({ transcript: transcript.text });
};

export default Transcriber;
