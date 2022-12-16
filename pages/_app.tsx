
import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { usePostHog } from 'next-use-posthog';

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  usePostHog(process.env.POSTHOG_KEY ?? "", {
    api_host: 'https://app.posthog.com', loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })

  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
