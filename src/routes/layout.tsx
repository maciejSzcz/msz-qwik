import { component$, Slot } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="min-h-screen text-white">
      <header class="fixed top-0 left-0 z-50 h-20 w-full overflow-hidden border-gray-900">
        <nav class="mask-image-gradient h-[200%] w-full px-12 py-6 backdrop-blur-xs">
          <ul class="flex justify-end space-x-8">
            <li>
              <a href="#about" class="transition-colors hover:text-neutral-400">
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                class="transition-colors hover:text-neutral-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Slot />
      </main>

      <footer class="py-8">
        <div class="container mx-auto px-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Maciej Szczęsny. All rights reserved.
        </div>
      </footer>
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
