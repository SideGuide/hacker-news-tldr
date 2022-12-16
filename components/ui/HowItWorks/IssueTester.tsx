import React, { useState } from 'react';

import { getBaseCompletion } from '@/utils/api';
import { Octokit } from '@octokit/rest';
import Button from '../Button';
import { genSolutionIssuePrompt } from "../../../utils/prompts";
import posthog from 'posthog-js'
import ReactMarkdown from 'react-markdown'
const octokit = new Octokit();






async function getGitHubIssueCode(issueLink: string) {
    // Extract the owner and repository name from the issue link
    const ret = issueLink.match(/https:\/\/github.com\/([^/]+)\/([^/]+)\/issues\/\d+/);
    if (ret === null) {
        return { title: "", body: "", labels: [] };
    }
    const [, owner, repo] = ret;

    // Get the issue number from the link
    const issueNumberRet = issueLink.match(/https:\/\/github.com\/[^/]+\/[^/]+\/issues\/(\d+)/);

    if (issueNumberRet === null) {
        return { title: "", body: "", labels: [] };
    }

    const issueNumber = parseInt(issueNumberRet[1]);



    // Get the details of the issue
    const { data: issue } = await octokit.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
    });
    console.log("code " + issue.body);

    // Return the code from the issue body
    return { title: issue.title, body: issue.body, labels: issue.labels };
}

type props = {
    token: string | null;
}




export default function IssueTester(props: props) {
    const [inputLink, setInputLink] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLink(event.target.value);
    }
    function thumbsUp() {
        // log in posthog
        posthog.capture('thumbs up', {
            inputLink: inputLink,
            output: output
        })

    }

    function thumbsDown() {
        // log in posthog
        posthog.capture('thumbs down', {
            inputLink: inputLink,
            output: output
        })

    }


    const handleRunClick = () => {
        try {


            setIsLoading(true);
            // fetch the data from the input link and set the output
            getGitHubIssueCode(inputLink)
                .then((text) => {
                    if (text.title === null || text.title === undefined) {
                        text.title = "No code found";
                    }
                    if (props.token === null) {
                        console.log("token is null");
                        setOutput("token is null");
                        return;
                    }
                    getBaseCompletion(genSolutionIssuePrompt(text.title, text.body, text.labels), props.token).then(
                        (response) => {
                            console.log(response);
                            setOutput(response);
                            setIsLoading(false);
                            posthog.capture("Issue Tester", {
                                title: text.title,
                                body: text.body,
                                labels: text.labels,
                                output: response
                            });
                        }
                    )
                });
        } catch (error) {
            setOutput("Something went wrong...");
            setIsLoading(false);
        }
    }

    return (

        <div className="max-w-4xl md:py-10 mx-auto ">

            {/* <h2 className="flex justify-center items-center text-center w-full text-4xl font-bold text-left md:text-5xl md:text-center md:justify-center"><span className="">Give it a go! Just enter in a link to a github issue below</span></h2> */}
            <br />
            <div className="flex flex-col w-full gap-4 items-center justify-center  ">
                <label className="block text-lg font-medium text-gray-200">GitHub Issue Link (Must be public)</label>
                <input
                    className="border  p-2  bg-gray-900 shadow-sm text-white block w-4/5 sm:w-1/2 sm:text-sm border-gray-500 rounded-md"
                    type="text"
                    value={inputLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/facebookexperimental/Recoil/issues/2126"
                />

                <Button
                    style={{
                        color: "#fff !important",
                    }}
                    variant="slim"
                    type="button"
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={() => handleRunClick()}
                    className="inline-block px-5 mr-2  text-sm md:text-base font-semibold  no-underline align-middle bg-gradient-to-tr from-primary via-primary to-primary rounded-xl  text-white cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-opacity-75 hover:text-gray-50"
                >
                    Generate Response
                </Button>
                <div className='relative w-full h-full flex items-center justify-center'>
                <div
                    className="mt-4 prose-invert dark:prose text-white w-5/6 min-h-[400px] overflow-scroll relative p-10 bg-black box-shadow border border-primary space-y-2 rounded-lg mx-auto"
                    placeholder="Output will appear here"
                    // value={output}
                >
                    <ReactMarkdown className='prose text-white prose-strong:text-white prose-a:text-white prose-li:text-white prose-code:text-white'>{output === "" ? "Output will appear here..." : output}</ReactMarkdown>
                </div>


                {output !== "" && <div className="hidden absolute sm:flex  top-4 right-0 flex-col justify-center items-center gap-4">
                    <button
                        onClick={() => {
                            thumbsUp();
                        }}
                        className="p-4 bg-white  bg-opacity-10 rounded transition-all hover:bg-opacity-40"
                    >
                        <span className="text-3xl text-white">👍</span>
                    </button>
                    <button
                        onClick={() => {
                            thumbsDown();
                        }}
                        className="p-4 bg-white  bg-opacity-10 rounded transition-all hover:bg-opacity-40"
                    >
                        <span className="text-3xl text-white">👎</span>
                    </button>
                </div>}
                </div>
                {output !== "" && <div className="sm:hidden flex  flex-row justify-center items-center gap-4">
                    <button
                        onClick={() => {
                            thumbsUp();
                        }}
                        className="p-4 bg-white bg-opacity-10 rounded transition-all hover:bg-opacity-40"
                    >
                        <span className="text-3xl text-white">👍</span>
                    </button>
                    <button
                        onClick={() => {
                            thumbsDown();
                        }}
                        className="p-4 bg-white bg-opacity-10 rounded transition-all hover:bg-opacity-40"
                    >
                        <span className="text-3xl text-white">👎</span>
                    </button>
                </div>}

            </div>
        </div>
    );
}