
import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { usePostHog } from 'next-use-posthog';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  usePostHog(process.env.POSTHOG_KEY ?? "", {
    api_host: 'https://app.posthog.com', loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })

  return (

    <SessionContextProvider supabaseClient={supabase} >
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SessionContextProvider>
  );
}
