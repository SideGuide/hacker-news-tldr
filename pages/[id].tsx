import Hero from '@/components/ui/Hero/Hero'
import supabaseAdmin from '@/utils/supabase_admin'
import React from 'react'

export default function Id({ id, summary }: { id: string , summary: string}) {
    return (
        <Hero idd={id} summaryy={summary} />
    )
}

// get the id from url
export async function getServerSideProps(context: any) {
    const { id } = context.query
    // query supbase database hn articles to see if there is a summary
    // if there is a summary, return the summary
    const supabaseServer =await  supabaseAdmin.from('hn-articles').select('*').eq('item', id);

    if (supabaseServer.data && supabaseServer.data.length > 0) {
        return {
            props: {
                id,
                summary: supabaseServer.data[0].summary
            }
        }
    }
    return {
        props: {
            id,
            summary: ""

        }
    }

}
