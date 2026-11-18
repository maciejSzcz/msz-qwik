import {
  component$,
  isDev,
  noSerialize,
  useSignal,
  useVisibleTask$,
  type NoSerialize,
} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import Lenis from 'lenis';
import { RouterHead } from './components/router-head/router-head';

import funnelDisplayUrl from '@fontsource/funnel-display/files/funnel-display-latin-800-normal.woff2?url';
import funnelSansUrl from '@fontsource/funnel-sans/files/funnel-sans-latin-400-normal.woff2?url';
import '@fontsource/funnel-display/800.css';
import '@fontsource/funnel-sans/400.css';
import '@fontsource/funnel-sans/500.css';
import '@fontsource/jetbrains-mono/500.css';
import 'lenis/dist/lenis.css';
import './global.css';

export default component$(() => {
  const lenis = useSignal<NoSerialize<Lenis> | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    lenis.value = noSerialize(
      new Lenis({
        autoRaf: true,
        anchors: true,
        duration: 0.5,
      })
    );

    return () => {
      if (lenis.value) {
        lenis.value.destroy();
        lenis.value = null;
      }
    };
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="preload" href={funnelDisplayUrl} as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href={funnelSansUrl} as="font" type="font/woff2" crossOrigin="" />
        {/* Skip the home intro if it already played this session. Runs before first paint. */}
        <script
          dangerouslySetInnerHTML={`try{sessionStorage.getItem('intro')&&document.documentElement.classList.add('intro-done')}catch(e){}`}
        />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
        {!isDev && <ServiceWorkerRegister />}
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
