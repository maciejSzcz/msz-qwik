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

import 'lenis/dist/lenis.css';
import './global.css';

export default component$(() => {
  const lenis = useSignal<NoSerialize<Lenis> | null>(null);

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
