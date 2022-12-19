import Link from 'next/link';
import React from 'react'

export default function RecentSummaries({data}: {data: any}) {
    return (
        <div className='lg:absolute top-0 lg:top-0 left-0 h-32 lg:w-1/5 w-full lg:h-full '>
            <h2 className='p-2'>Recent summaries (Global):</h2>
            <div className='flex flex-row lg:flex-col overflow-x-scroll lg:overflow-y-scroll items-start justify-start w-full h-full '>
                {data.map((item: any) => {
                    return <div className='p-2 flex flex-col items-center justify-center w-full '>
                        <Link href={`/${item.item}`}>
                            <a
                                className='relative flex flex-col items-center justify-center w-full h-full p-2 text-center bg-gray-50 text-gray-900   shadow-sm rounded-md hover:bg-gray-100'>
                                {/*  onlt the first 180 characters of summary */}
                                {/* <div className='absolute top-[2px] right-[2px] text-[8px]'>{item.item}</div> */}
                                <p className='text-sm'>{item.title}</p>
                            </a>
                        </Link>
                    </div>
                })}
            </div>
        </div>
    );
}
