// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Amplify, Auth, withSSRContext } from 'aws-amplify';
import type { NextApiRequest, NextApiResponse } from 'next';
import awsExports from '../../aws-exports';
type Data = {
  transcript?: string;
  error?: string;
};

Amplify.configure({ ...awsExports });
Auth.configure({ ...awsExports });

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
  const { API, Auth } = withSSRContext({ req });

  try {
    if (!source) {
      return res.status(400).json({ error: 'Source audio URL is missing' });
    }

    const user = await Auth.currentAuthenticatedUser();
    const is_authenticated = !!user;

    if (!is_authenticated) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }

    const transcript = await transcribeAudio(secret, source);
    res.status(200).json({ transcript: transcript.text });
  } catch (err) {
    console.log('Error transcribing audio:', err);
    res.status(500).json({ error: 'Error transcribing audio' });
  }
};

export default Transcriber;
