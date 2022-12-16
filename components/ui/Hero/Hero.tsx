"use client";

import { getResponseFromAI } from '@/utils/ai_wrapper';
import { analyticsInstance } from '@/utils/analytics';
import { fetchHN } from '@/utils/hacker_news_api';
import { generatePromptToSummarize } from '@/utils/prompts';
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { HNStory, HNStoryCurated } from 'types';
import Button from '../Button';

export default function Hero() {
    const [link, setLink] = useState("");
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [numParagraphs, setNumParagraphs] = useState("1");
    const [numComments, setNumComments] = useState("5");
    const [commentDepth, setCommentDepth] = useState("s");
    const [fastMode, setFastMode] = useState(true);

    async function fetchHNRecursively(item: string): Promise<any> {
        var data = await fetchHN(item);

        if (data.kids && data.kids.length > 0) {
            for (const k of data.kids) {
                // get index of k
                //@ts-ignore
                const index: number = data.kids.indexOf(k);
                // recursive get the comments
                const comment = await fetchHNRecursively(k.toString());
                // replace the comment id with the comment
                data.kids[index] = comment;
            }
        }
        return data;
    }


    // where link is a Hacker News link
    async function summarize() {
        // make sure link is not empty, null or undefined
        if (!link) return;
        // get the item id from a url like this https://news.ycombinator.com/item?id=34015953
        const id = link.split('id=')[1];
        // make sure id is not empty, null or undefined
        if (!id) return;
        // set loading to true
        setIsLoading(true);
        setError(false);

        let article: HNStory;
        if (fastMode) {
            article = await fetchHN(id);
            // make sure article is not empty, null or undefined
            if (!article) return;
            // get top comments 10 comments, if there are less than 10 comments, get all comments
            const comments = article.kids.slice(0, 10);
            // make sure comments is not empty, null or undefined
            if (!comments) return;
            // fetch comments
            const commentsData = await Promise.all(comments.map(async (commentId) => {
                const comment = await fetchHN(commentId.toString());
                // fetch all the comennts from the comment
                return comment;
            }));
            const commentsTextArray = commentsData.map((comment) => "Comment 1: " + comment.text + "\n");
            const commentsText = commentsTextArray.join(";");

            const curated: HNStoryCurated = { title: article.title, text: article.text ?? "", comments: commentsText };

            const summary = await getResponseFromAI(generatePromptToSummarize(curated));
            analyticsInstance.track('summarize', {
                articleLink: link,
                id: id,
                summary: summary,
                fastMode: fastMode,
            });
            setSummary(summary);




        } else {
            article = await fetchHNRecursively(id);
            // make sure article is not empty, null or undefined
            if (!article) return;



        }






    }
    return (
        <div className="bg-white py-32 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center text-hnorange">
                    <h2 className="text-3xl font-extrabold leading-9 tracking-tight">
                        Summarize Hacker News posts with GPT-3
                    </h2>
                    <p className="mt-3 max-w-md mx-auto text-lg leading-7 text-gray-900">
                        Quickly summarize Hacker News links using the power of GPT-3 and ChatGPT. Simply insert the link into the input box below and try it out!
                    </p>
                    <div className="mt-5">
                        <div className="max-w-md mx-auto">
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    id="link-input"
                                    className="form-input py-3 px-4 block w-full leading-5 rounded-md transition text-black border border-hnorange duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    placeholder="https://news.ycombinator.com/item?id=29154216"
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <Button loading={isLoading}
                                    onClick={() => summarize().then((e) => setIsLoading(false)).catch((e) => { setIsLoading(false); setError(true) })}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-hnorange bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800"

                                >
                                    Try it out
                                </Button>

                            </div>

                        </div>

                    </div>
                </div>
                {/* Create an error box if error is true */}
                {error && <div className="mt-8 prose overflow-scroll relative p-10 text-left  border bg-hnorange space-y-2 rounded-lg mx-auto">
                    <p className="text-red-500">An error occurred. Please try again.</p>
                </div>}
                {summary !== "" && <div
                    className="mt-8 prose overflow-scroll text-black relative p-10 text-left  border bg-gray-100 space-y-2 rounded-lg mx-auto"
                    placeholder="Output will appear here"
                // value={output}
                >
                    <ReactMarkdown className='prose text-black'>{summary === "" ? "Summary will appear here..." : summary}</ReactMarkdown>
                </div>}
            </div>
        </div>
    );
}

