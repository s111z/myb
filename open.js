const axios = require('axios');

// 设置你的 OpenAI API 密钥
const apiKey = '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';
const promptPrefix = '```javascript\n'; // 在生成的代码前加上JavaScript代码块

async function generateCode(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt: promptPrefix + prompt + '\n',
      max_tokens: 150,
      n: 1,
      stop: '\n',
      temperature: 0.5
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    }
  );

  const code = response.data.choices[0].text.trim();
  return code;
}

// 用户输入一段话
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入一段话：', async (userInput) => {
  try {
    // 调用生成代码函数
    const generatedCode = await generateCode(userInput);

    // 输出生成的代码
    console.log('生成的代码：');
    console.log(generatedCode);
  } catch (error) {
    console.error('生成代码时出现错误：', error);
  } finally {
    rl.close();
  }
});