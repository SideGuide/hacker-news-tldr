import { generatePromptToSummarize } from "@/utils/prompts";
import { ChatGPTAPI } from "chatgpt";
import { NextApiRequest, NextApiResponse } from "next";

// handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // use puppeteer to bypass cloudflare (headful because of captchas)
    // const openAIAuth = await getOpenAIAuth({
    //     email: process.env.OPENAI_EMAIL,
    //     password: process.env.OPENAI_PASSWORD
    // })

    const api = new ChatGPTAPI({ sessionToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..7O0FNfAMI47xyPS8.hj1-jE6yJSiFOKhHQ7A-WMCJsE5whARqpopk_zVAYeNLZ0JsTAh7MrcZIpnCrzHVEf4jP50IsolgS0VroJSUXc9Yh1_k0kKYypuvIwbT0Vok8HPGqNNrrHWVY4UScNomijCWZALOcsdcSSQ8PbQQyAFnk3v34wRVtMOyw9IYibjG0f_jWUZIHdrxMFSaU7suHTSN6kh8C2wy7VDI2kR5qz6hbsl7Ehr1ZW229XkZUR4CtHTcw_i6WrPHMxubcfCBAu1Z1ud2_P2VpC6SfbdwClshOiGWY-QlWhhOXOoOTE_PHxU4D4v5-1jWelxGghNVswyhO2kqbFGz7CnIA4AEQJoo2Eu9Ww0jNkrWwk-qY8turU4JzAMncm91hT1Oj0_WS5tUxTecK9vcI5byl3nall3NUOR3bojfSAcGPSkYfSkVTZu8yPhRNUJiTPRL7XpgHHkjsX0Qbm16kKmWrziNlWeVmbbT-XJuJWq7l0fjAwtCarSq0XqqWIyivEBfHlz0Us5MFBvVaXywSZrbHBj-RtC6yLnAd1-WdXeWo6kaHQkg-rVfpdlOj8v67DMXf-0z7Ix6JIuxEdML9qIN69DFu7EZjDuh7kHineWBOcIWOKYn7jj2XElGGvYpg2EZhxvj1fDrVd0K24gprTUB4fUwv4a5iFQ4u1cjfdl9CXN-hOLcB_oDTm8lnPNTy7-6hYAA6Y1LGUS9oksDiv_djiUMFUkAXsG9EF1XrzL07USGMyLzD7A0yWPtkuV4rtFRyzzRnGOWmfPxolkvF4a2kdIFfdWZYlw_lw9SI21ae53uOPiCVyrYUVg_HUdqYF9EevTpfX5jzVWXYiAXM3x5wPrzjA7tVVOldUEGZyCR-SyRyUQBlxK6tGDiq95UxufnxuNeE1_olV18as-UlpVSFI0OTVxpKANITL-fNDW-J9WIJENiI-SSYRmKl9rjIrgJZqWQpfTH43LRQH92lP7Cq_wTfGUoOShFDzNSptKvWVIE7jf2xRLECgzCMByQgM6O9ZjpaF8cf9IqI1j_xg-8ihZSGCVDOYKZmXtGzGO2xK3ZaWyCLnlFGsAIftREB_FEmi9CV8-QJhfr1S045C-xEIOGXjeEUpO3SfbosqsWEetA9K0oU7l8xCj-kxxYjqgwOlI-jigbHLEWjQrJjz4d1MFhwTFCjB9IeRpEhLgcIl9V0u98Fjd4c0wxc8qGnXanzNTHUjS_LD-i_7_x7xRneOf6xrUxVKpQLhvfVKgRnU-2NrMIBfDE2Rt4yLccC-SGppbllENtJyt-_3EdNyO-bal19WOFQ7n2v0d5JnJJ0bicXSkLgSLYmjVgbQXPx0ZSD8PLxayfVowN6oPVg0bjgzEBRUJguXS8fdNzFaMoqNifEnVMTFuIFuMjkQbd_c_fZ8_3dWEhWdaMRMUrR1f8xgBUqk7MWG0e7YMoHkhkC8qUaFmz0hINOXYd4NgEwK-yiFeRGChFq3QIfT-W1p7q1r1kdvHPASIHcxNhKv57MjqZVSGmzxI0ajB90gpW2U5gDlDDNH0dZuUr5TzLHmIFN1cOevY2G1CD_33S_2P0aa9X-NMzS8Jqu0T2U91rDsITAanyUs1ER8BlqurRZnGa1AqFzqnphArdUFBCy_-X6pE2CY7Zd4OF1MXRonK6uKMN9JVaRobiUcoPgX605oFcR--ycmbbedW9rSgYG07oSHRdu43Rh2hX0SPZX9i97Sl3MeGQdIFCGD_HUI2UNYawPlPKdiL4a4U9AwPmnhqaDe-D5f5Q5NgtHIwzKzxitYEvCTYozjaNnB7vvIQvTjvSHEYdlRc7GVnsqh1AnrraCOLAWcuCzdZPKlzkuOSR3HB39ECzgb53UW3dLPXcWqY9CRbgWYXLB7lK464cHe-gXgbiMXD30UcC3ZRtoXIQcavTcYD5dAd2muut1OAEbhj-z2s0rS1xzb4UqgK_XvgBRPYXE9vzKJNSoqLIozf0nWcDJw0dU4sw8f4dq0KhB2Z8vLhMjvPZvGfruDN680DAB0e_bSVjUcFlgv2UEFmcZDucPBRnILVshCVwbPSOaePelgnFoQTl0cN1JylPb63SEZvM2CntkUYs-ue2HspC3kJGmDpEPFmCC6epxejGeWbipfoppvpTbDNkWe4Yq0M3Brn9Mzz5WXwz8ahiPCczYq5KsABKUbM7C8r3xJoNYma9UZ5McrK0VmaNz1bY-PymUkuMGkwPCfkWQDCzaptfKRlDlvhako_3CL9gnK2xy53Ssw.SO43NcJWicjy-Qa_aaaaRA", clearanceToken: "c_E0C7bTd3oZlVpRp19c_o1uw5EHQjkHfyk2iKuRjxw-1671211444-0-1-487ba6d.28095554.93e5c5e-160", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36" })
    await api.ensureAuth();

    // send a message and wait for the response
    const prompt = generatePromptToSummarize(req.body.article);
    console.log(prompt);
    const response = await api.sendMessage(prompt);



    // response is a markdown-formatted string
    console.log(response)
    return response;
};






