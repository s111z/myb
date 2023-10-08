const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const apiKey = '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'; // 替换为你的 OpenAI API 密钥

app.post('/get-response', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const gptResponse = response.data.choices[0].message.content;
        res.json({ response: gptResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '抱歉，发生了错误。' });
    }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
