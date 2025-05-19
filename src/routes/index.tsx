import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { animate } from 'motion';
import { Section } from "~/components/section";

export default component$(() => {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Next.js",
    "Rust",
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
        repeatType: "reverse",
      }
    );
  });

  return (
    <div class="relative overflow-x-hidden">
      <div id="animation-target" class="absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 blur-3xl" />
      <Section id="home" class="pt-24">
        <div class="z-10">
          <h1 class="mb-4 text-7xl tracking-wide font-bold">Maciej Szczęsny</h1>
          <p class="text-2xl text-neutral-400">Software Developer</p>
        </div>
      </Section>

      <Section id="about">
        <h2 class="mb-6 text-4xl font-bold">About Me</h2>
        <p class="mb-12 text-lg text-neutral-400">
          I'm a passionate developer with a passion for challenges. While my
          primary focus is in web technologies, lately I've been working on a
          more full stack approach.
        </p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill}
              class="rounded-lg bg-neutral-900/70 px-6 py-4 text-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" class="text-center">
        <div>
          <h2 class="mb-4 text-4xl font-bold">Get in Touch</h2>
          <p class="mb-8 text-neutral-400">
            Interested in collaborating or just want to say hi? Feel free to
            reach out!
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
  title: "Maciej Szczęsny - Software Developer",
  meta: [
    {
      name: "description",
      content:
        "Personal portfolio of Maciej Szczęsny, a passionate software developer.",
    },
  ],
};
