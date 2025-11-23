import { component$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRust,
  SiTypescript,
} from '@qwikest/icons/simpleicons';
import { animate } from 'motion';
import { Section } from '~/components/section';

export default component$(() => {
  const skills = [
    {
      value: 'JavaScript',
      icon: SiJavascript,
    },
    {
      value: 'TypeScript',
      icon: SiTypescript,
    },
    {
      value: 'React',
      icon: SiReact,
    },
    {
      value: 'Node.js',
      icon: SiNodedotjs,
    },
    {
      value: 'Next.js',
      icon: SiNextdotjs,
    },
    {
      value: 'Rust',
      icon: SiRust,
    },
  ];

  useVisibleTask$(() => {
    animate(
      '#animation-target',
      {
        scale: [1, 1.2, 1],
        rotate: [0, 45, 0],
      },
      {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse',
      }
    );
  });

  return (
    <div class="relative overflow-x-hidden">
      <div
        id="animation-target"
        class="absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 blur-3xl"
      />
      <Section id="home" class="pt-24">
        <div class="z-10">
          <h1 class="mb-4 text-4xl md:text-7xl font-bold tracking-wide">Maciej Szczęsny</h1>
          <p class="text-xl md:text-2xl text-neutral-400">Software Developer</p>
        </div>
      </Section>

      <Section id="about">
        <h2 class="mb-6 text-4xl font-bold">About Me</h2>
        <p class="mb-12 text-lg text-neutral-400">
          I'm a passionate developer with a passion for challenges. While my primary focus is in web
          technologies, lately I've been working on a more full stack approach.
        </p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.value}
              class="flex flex-row items-center rounded-lg bg-neutral-900/70 px-6 py-4"
            >
              <skill.icon class="h-6 w-6" />
              <span class="flex-1 text-center">{skill.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" class="text-center">
        <div>
          <h2 class="mb-4 text-4xl font-bold">Get in Touch</h2>
          <p class="mb-8 text-neutral-400">
            Interested in collaborating or just want to say hi? Feel free to reach out!
          </p>
          <a
            href="mailto:mszczesny@macez.dev"
            class="inline-block rounded-full bg-white px-8 py-3 text-black transition-colors hover:bg-neutral-200"
          >
            Say Hello
          </a>
          <div class="mt-12 flex justify-center space-x-6">
            <a
              href="https://github.com/maciejSzcz"
              target="_blank"
              rel="noopener noreferrer"
              class="text-neutral-400 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/maciej-szcz%C4%99sny-a14b55134/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-neutral-400 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Maciej Szczęsny - Software Developer | Full Stack Developer',
  meta: [
    {
      name: 'description',
      content:
        'Maciej Szczęsny - Full Stack Software Developer specializing in JavaScript, TypeScript, React, Node.js, and Rust. View my portfolio and get in touch for collaboration opportunities.',
    },
    {
      name: 'keywords',
      content:
        'Maciej Szczęsny, Software Developer, Full Stack Developer, JavaScript, TypeScript, React, Node.js, Rust, Web Development',
    },
    {
      name: 'author',
      content: 'Maciej Szczęsny',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Maciej Szczęsny - Software Developer | Full Stack Developer',
    },
    {
      property: 'og:description',
      content:
        'Full Stack Software Developer specializing in JavaScript, TypeScript, React, Node.js, and Rust. View my portfolio and get in touch for collaboration opportunities.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://macez.dev',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Maciej Szczęsny - Software Developer | Full Stack Developer',
    },
    {
      name: 'twitter:description',
      content:
        'Full Stack Software Developer specializing in JavaScript, TypeScript, React, Node.js, and Rust. View my portfolio and get in touch for collaboration opportunities.',
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: 'https://macez.dev',
    },
  ],
};
