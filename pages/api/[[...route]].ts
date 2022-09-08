import { App } from '@slack/bolt';
import { NextApiRequest, NextApiResponse } from 'next';
import NextConnectReceiver from 'utils/NextConnectReceiver';

const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || 'invalid',
  processBeforeResponse: true,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  receiver: receiver,
  developerMode: false,
});

app.event('message', async ({ event, say }) => {
  const text = (event as any).text;
  say({
    text: text || 'Hello world!',
  });
});

// this is run just in case
const router = receiver.start();

router.get('/api', (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    test: true,
  });
})

export default router;
