import Hero from '@/components/ui/Hero/Hero';
import supabaseAdmin from '@/utils/supabase_admin';
import RecentSumarries from "../components/ui/RecentSummaries";

interface Props {
}

export default function Index({ data }: { data: [] }) {
  return <>
    {/* Add a column to the left of the hero, without affecting hero center, that displays the most recents summaries */}
    <div className='relative w-full h-full'>
      <RecentSumarries data={data} />
    <Hero idd='' summaryy='' />
  </div>
  </>

}


// get server side props
export async function getServerSideProps(context: any) {
  // get the last 10 summaries from the 'hn-artciles' table
  const { data, error } = await supabaseAdmin
    .from('hn-articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    props: {
      data: data
    }
  }
}




