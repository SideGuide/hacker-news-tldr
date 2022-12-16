import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt'
import { HNStory, HNStoryCurated } from 'types';
import { generatePromptToSummarize } from './prompts';

export async function getResponseFromAI(prompt: string) {
    return await fetch("api/ai/gpt3", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt,
        })
    }).then(res => res.json()).then(data => {
        return data.data;
    })

}