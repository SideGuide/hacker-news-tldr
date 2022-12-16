import React from 'react'
import Card from '../Card'
import CodeWrapper from '../CodeWrapper'
import hljs from 'highlight.js';
import { installationCodeString } from '@/utils/installation';
import { useUser } from '@/utils/useUser';

export default function HowItWorks() {
  const { isLoading, subscription, userDetails } = useUser();

    const highlightedCode = hljs.highlight('yaml', installationCodeString).value;
    const highlightedFile = hljs.highlight('yaml', ".github/workflows/mendable.yml").value;
    const highlightedPath = hljs.highlight('yaml', "Settings -> Secrets -> Actions").value;
    return (
        <div className="p-4">
            <Card
                title="1. Add your token to your repository's environment variables"
                description={<p><br/>- Insert the token in your repository's environment variables, which can be found on GitHub Repo: <CodeWrapper code={highlightedPath} renderWithHighlight={true} border={false} />(This token is used to get access to the code action. You can always find this token under your account.)</p>}
            >
                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 text-xl mt-8 mb-4 font-semibold">
                    <p>MENDABLE_TOKEN</p>
                    {/* Add a copy code button to the snippet below */}
                    <CodeWrapper code={subscription?.mendable_token ?? "YOUR TOKEN WILL APPEAR HERE AFTER PURCHASE"} renderWithHighlight={true} />
                </div>
            </Card>
            <Card
                title="2. Add the snippet below to your repository's workflow file"
                description={<p><br/>- Create a workflow file:<br/> <span className='my-1 mr-2'><CodeWrapper code={highlightedFile} renderWithHighlight={true} border={false} /></span><br/>- Paste the snippet below inside file. This will trigger the code action when a issue is opened.</p>}
            >

                <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-4 text-xl mt-8 mb-4 font-semibold">

                    <CodeWrapper code={highlightedCode} renderWithHighlight={true} />
                </div>


            </Card>

        </div>
    )
}
