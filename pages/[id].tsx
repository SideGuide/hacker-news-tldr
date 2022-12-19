import Hero from '@/components/ui/Hero/Hero'
import supabaseAdmin from '@/utils/supabase_admin'
import React from 'react'
import RecentSumarries from "../components/ui/RecentSummaries";

export default function Id({ id, summary, data }: { id: string , summary: string, data: []}) {
    return (
        <div className='relative w-full h-full'>
      <RecentSumarries data={data} />
        <Hero idd={id} summaryy={summary} />
        </div>
    )
}

// get the id from url
export async function getServerSideProps(context: any) {
    const { id } = context.query
    // query supbase database hn articles to see if there is a summary
    // if there is a summary, return the summary
    const supabaseServer =await  supabaseAdmin.from('hn-articles').select('*').eq('item', id);
 // get the last 10 summaries from the 'hn-artciles' table
 const { data, error } = await supabaseAdmin
 .from('hn-articles')
 .select('*')
 .order('created_at', { ascending: false })
 .limit(10);
    if (supabaseServer.data && supabaseServer.data.length > 0) {
        return {
            props: {
                id,
                summary: supabaseServer.data[0].summary,
                data: data
            }
        }
    }
    return {
        props: {
            id,
            summary: "",
            data: data

        }
    }

}
