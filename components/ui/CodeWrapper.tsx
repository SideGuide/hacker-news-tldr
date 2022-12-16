import React from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import 'highlight.js/styles/monokai-sublime.css';

export default function CodeWrapper({ code, renderWithHighlight, border=true }: { code: string, renderWithHighlight?: boolean, border?: boolean }) {
    return (
        <pre
            className={`relative p-1 pr-2 w-full prose overflow-auto  text-white ${border ? "border border-gray-700" : ""} group rounded-xl scale-90 sm:scale-100 `}>
            <div className='absolute top-2 right-2 hover:cursor-pointer ' onClick={() => {
                navigator.clipboard.writeText(code)
            }}>
                <AiOutlineCopy color='#ffffff' className='hover:cursor-pointer hidden group-hover:block' onClick={() => {
                    navigator.clipboard.writeText(code)
                }} />
            </div>
            {renderWithHighlight === true ?
                <code
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: code }}
                    />
            :<code lang="js" >{code} {"  "}</code>}
        </pre>
    )
}
