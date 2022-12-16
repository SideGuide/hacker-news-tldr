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

export async function getSessionToken(req: any, res: any) {
    return res.json({ success: true, data: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..T4rFvXenmQY-tZ2W.Gyqh85QUUN7Dtw6F97Tlu9tIwMwf8dn-LOjitl5pSZDS2ql1y-BEg7KCqIB5jKaUEcSHZSPVl0W5pgK7zn8KQwQqKb6cgJGnFNUzwV7IkOBvlh_VjAH5ZsyrmyNezwYIaHMjjopk3HA74mXfVZCWUGjd5VdcUcE4vdJEokea-5nupivzP3lnm66KLjR3Q_TvIQRmJJjC1nTpzwVFQ1zIyyDpP-MkfpyO4aBla6dJyldNhlwGBtnOxBxEW1Fjo055Sx9JweCNo_6RNwYjHGjWQ9FtG-H_qhcsb256iNSSYJe8S5WSIgq7Xen4QePJKtjDe1pZiuEsuxNkaQ1ci8NvI_fBKiD666409m99OQd1_9ZdBW_UxO6u7XFycIBxFMozSLju29PoED_6LFbn6Cs-DN_HVDOOJhK6XfBdhtSdZLqLGxsPBRke4unJJ5iJoQ_Bcys2DDdR1IOXvNWMssBEsmHpid8EnjrShdcxNNHQNSI8GQoNfvhXcfj3SCLdkvzKI9UkTvYf9ZV2OcpQMB52_OGMnmtojgi4mbUdXS5M0ChoP7Nc5wN7gEinp_V3aWkAbO3aKeT_D9A3naVBfyrL4U1rpfYyTbJ_2VvPkzGz7RoRUo_w0htD_EkyFR7fpj0DzIUoCvQy6U6gqcQC8JUdnzhZ__C_m8p3vQyqG1FYTFATro3kIrNVgpzikGyOhhEAsGzozZM49dI6vdUoM3VbW2MNTlBN0laohJaCbCbapKrIwI_wfGzttEVPjI4hED9MH1oneah0vEHEmIQ_UyausHuVKWR3tOsQfWaJucpMXwDtB7WVX4nkM-lQzh1FQ4cjQQVLCAxKbt7VXAMChi_Gj8S4MznV4i2kz6xlFhmL_p10Lc_o_xgiTTBRC4uwEDT6OhgAF9hD6_RH3UK_G3q00NQ5IgpGHE1X5DcaPlEVDIXnEweSM-arn7Vzvq_fHrL6_h-cXE0WX8diwa5KlaAr9mQeJDp6Pum__eWs5NFIIwuxMsqqzFcfWmaOgdpXiVguheCLzjbnUmejq0oijhlhI4zUaUute5xcqHoG-J2wZsf3K0uEH4EixKDlzBTnmfg8OqMRoO0L0lQfsQjLxfupvInUnhc7M_x9tHHJeXY0qlUHuWPKh-s1Ad5DUvS9ZwgJNu2uyms1t0kSxZVBkCz0MVy51gteS0KgjDxI1RbXZvnvap2uKPoD43xYRbQnUZwLxJ3LytRiquFg__CC3St18kJpk7MMbyvbkBhoKWkoHtNLPr3qIuXNH9XmFkoMS22-lgoOpfCDSrof3CieUZCoBrztgykWyGL2ETFS82ne98I4OaBQabtwiDiBQwPHP9P_PVT3XpvTmkidLOZ0BMuykuc3bSaZ6zL39Kp8sYext5hFI8xItBikFiui9inqIcS49wXyftcmWdbKLC3P6wFfelfPyygXR0eLDSw29puoBDrDHZT0enJP1yi9y5bn3FJxILufOeI7npNeQLi-Kd5o35mXQ0xIn2zOM0ysLWECzgr2fQFQWdk16PEC9tRERyG-_HRw2VLp4AreV8eLGDxkvC8ZOiVzKEqC3g-DJzvvatPPzLVksKzDShFt5I3K2VokuPxpAztAzByrPhPjWiRitr_TuhwH6Vc5cYyyJswNPpMKG-sxB_uGcAhzAwhh-EbMio3Ed056L0SOzgkoyv_k1e9d4xcvPzmwtYXTDzculvmDyUAYXHY9Yn8b_btA2QIO81QmkePZxsx57ab5OMn_kV0urOvHbcfS6lGP5tbIpMRRqx7EcJ7ikMufNWLS-xbcCIiAmo3Yi0Yune7Dns_jpPDnUGWIhql1m0de3iwlgtxKXQXxF4JE7AJjIyGAxBJYxqcr5YGPeQWjsW6NC4amMriP86XID358bvUK6C5hQW606vNZ1GvYdK3n-YXWvjnrfLHdNhvPkZqNOnF8xAdy4X3Z_1R0F7c0XLHbM4e0K_F7GB-aCfGGXmo_heanewG2jZPoh4cQdQzqgVRDU40kgugb0cDcHIm-Iw9iOItx7KnvgjbgqnwdtKp8L2dy0rkojeFBWuELFe5CCIkMQqV3FYQpeleVR6-A9GfN4RFzzjWvjr5XRlRrCIn0PZhPnh6l4iJkJwUa_KBnUvbRk9qBVd2c0Yrz5rNXWWb5wpqDkwGf_Cpd9XcjJ6QQVQj3AIW4zNdQiAsqRFZSnNtYA4hIzsZx5OdHT7rkMp5rURm_9S2PLTdXmvUycwh-xWEDxtnc2ZYKFk5J9A.ABsEjDnhjHNrt9GTvxRyTw" });
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






