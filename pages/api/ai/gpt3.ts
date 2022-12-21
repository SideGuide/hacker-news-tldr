import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt, mendableToken} = req.body;
        // Process a POST request
        console.log('outside');
        if (prompt !== null && mendableToken !== null && mendableToken !== "") {
            return getBaseCompletion(prompt).then((completion) => {
                return res.json({ success: true, data: completion });
            });
        }
        return res.json({ success: false, data: "No prompt or mendable token provided" });
    }
    res.status(405).end('Method Not Allowed');

}


export async function getComp(req: any, res: any) {
    const prompt = req.body.prompt ?? "";
    if (req.body.prompt !== null) {
        return getBaseCompletion(prompt).then((completion) => {
            return res.json({ success: true, data: completion });
        });
    }
    return res.json({ success: false, data: "No prompt provided" });
}

export async function getMendableCompletion(req: any, res: any) {
    const prompt = req.body.prompt ?? "";
    const mendableToken = req.body.mendableToken ?? "";
    if (req.body.prompt !== null && mendableToken !== null && mendableToken !== "") {
        return getBaseCompletion(prompt).then((completion) => {
            return res.json({ success: true, data: completion });
        });
    }
    return res.json({ success: false, data: "No prompt provided" });
}





export async function getCommandExplanation(command: string) {
    const explanation = await getCompletion(`The user typed the following command: ${command}.\n
        What does that do?
        `);
    return explanation;

}

export async function getBaseCompletion(prompt: string, completeSenteces = true) {
    const completion = await getCompletion(prompt, undefined, completeSenteces);
    return completion ?? "";
}


export async function getChangeExplanation(change: string, filename: string) {
    const explanation = await getCompletion("The user added the following text '" + change + "' to a file named " + filename + "\nWhat does this change mean?");
    return explanation;
}

function getTokensBasedOnLength(prompt: string) {
    const lengthPrompt = prompt.length;
    if (lengthPrompt < 300) {
        return 1000;
    }
    return 1000;
}


async function getCompletion(prompt: any, options?: any, completeSenteces = true) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);


    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            max_tokens: getTokensBasedOnLength(prompt),
        })
        if (completeSenteces) {
            try {
                // check if last character is a period, question mark, exclamation mark or newline
                const completion = response.data.choices[0].text ?? "";
                if (completion[completion.length - 1] === '.') {
                    return completion;
                } else {
                    // remove whatever is after the last period
                    const lastPeriodIndex = completion.lastIndexOf('.');
                    const completionWithoutLastSentence = completion.substring(0, lastPeriodIndex + 1);
                    return completionWithoutLastSentence;
                }
            } catch (error) {
                console.error(error);
                return response.data.choices[0].text ?? "";
            }


        }
        return response.data.choices[0].text;
    } catch (error) {
        console.error("Error in getCompletion: " + error);
        return "error";
    }


}






