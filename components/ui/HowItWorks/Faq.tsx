


export default function Faq() {

    return <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 id="faqs-title" className="text-3xl font-medium tracking-tight text-gray-100">Frequently asked questions</h2>
                <p className="mt-2 text-lg text-gray-300">
                    If you have anything else you want to ask,
                    <a className="text-primary underline ml-2" href="mailto:hello@sideguide.dev">reach out to us</a>.
                </p>
            </div>
            <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
                <li>
                    <ul role="list" className="space-y-10">

                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">Is it free?</h3>
                            <p className="mt-4 text-sm text-gray-200">You can use the free trial. We will consider creating a free plan in perpetuity, but we haven't figured out our pricing model yet.</p>
                        </li>
                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">Do you train your AI model with my code?</h3>
                            <p className="mt-4 text-sm text-gray-200">We don't look at your repository's code so we don't at the moment, since OpenAI doesn't support fine-tuning with their newest models. However, in the future we may add it. We will always give you the option to opt out of sharing your data.</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul role="list" className="space-y-10">
                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">Is it 100% accurate?</h3>
                            <p className="mt-4 text-sm text-gray-200">Like Humans, AI will never be 100% accurate. So we can't assure you that every solution will be correct. We recommend trying the free version to test it out!</p>
                        </li>
                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">How do I cancel my subscription?</h3>
                            <p className="mt-4 text-sm text-gray-200">Simply log into our platform, go to your account and click on "Open customer portal" button. There you will be able to cancel/modify it through Stripe.</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul role="list" className="space-y-10">
                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">How does Mendable work?</h3>
                            <p className="mt-4 text-sm text-gray-200">Our application uses GitHub code actions to detect when an issue is opened, then Mendable responds with a automatic suggested fix</p>
                        </li>

                        <li>
                            <h3 className="text-lg font-semibold leading-6 text-gray-100">Are you open-source?</h3>
                            <p className="mt-4 text-sm text-gray-200">Currently, we're closed source. However, we're strongly considering moving towards an open-source model. If you have input here, please message us at 
                                <a className="text-primary underline ml-2" href="mailto:hello@sideguide.dev">hello@sideguide.dev</a>.
                            
                            </p>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>

    </>
}