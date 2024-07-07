require('dotenv').config(); // Load environment variables

import axios from 'axios';

export const sendOpenAi = async (messages:any, userId:string, max = 100, temp = 1) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  console.log('process',process.env.STRIPE_SECRET_KEY);
  console.log('OpenAI API Key:', `message: ${process.env.OPENAI_API_KEY}`); // Verify the key is loaded

  console.log('Ask GPT >>>', process.env.OPENAI_API_KEY,'checking bases');
  messages.map((m: { role: string; content: string; }) => console.log(' - ' + m.role.toUpperCase() + ': ' + m.content));

  const body = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: max,
    temperature: temp,
    user: userId,
  };

  const options = {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(url, body, options);

    const answer = res.data.choices[0].message.content;
    const usage = res?.data?.usage;

    console.log('>>> ' + answer);
    console.log(
      'TOKENS USED: ' +
      usage?.total_tokens +
      ' (prompt: ' +
      usage?.prompt_tokens +
      ' / response: ' +
      usage?.completion_tokens +
      ')'
    );
    console.log('\n');

    return answer;
  } catch (e) {
    console.error('GPT Error: ' + e?.response?.status, e?.response?.data);
    return null;
  }
};

// Test the function to see if the API key is being loaded
// sendOpenAi([{ role: 'user', content: 'Hello!' }], '123');
