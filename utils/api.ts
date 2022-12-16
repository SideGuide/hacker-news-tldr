export async function getBaseCompletion(prompt: string, mendableToken="", completeSenteces = true, ) {
    // fetch our server, post request with prompt
    return fetch("api/ai/getMendableCompletion",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                mendableToken: mendableToken
            })
        }

    )
    .then((response) => {
        return response.json();
    })
    .then((data: any) => {
        if (data.success) {
            return data.data;
        }
        return "Error: " + data.error;
    })
    .catch((err) => {
        console.log(err);
    });

}