import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { DaisyCityLink } from "@qwikbits/daisyui";
import { CodeBlock } from "~/components/code-block/code-block";

export default component$(() => {
  const activeClass =
    "inline-block bg-gradient-to-r from-accent via-primary to-secondary dark:from-accent from-1% via-50% to-75% dark:via-secondary dark:to-accent bg-clip-text !text-transparent";
  return (
    <div class="mt-20 flex flex-col gap-16 lg:mt-0">
      <div class="flex flex-col items-center">
        <h1 class="flex w-fit items-center bg-gradient-to-r from-[#18b6f6] to-[#ac7ef4] bg-clip-text text-6xl font-extrabold text-transparent lg:text-8xl">
          Qwik Bits
        </h1>
        <p class="text-base-content text-xl font-bold lg:text-3xl">
          Your one stop for accessible components and other helpers for Qwik
        </p>
      </div>
      <div class="grid gap-16 lg:grid-cols-2">
        <div class="flex flex-col gap-8">
          <h3>
            <a
              href="/components/"
              class={`font-bold hover:bg-gradient-to-l ${activeClass}`}
            >
              daisyUI
            </a>
          </h3>
          <h5>
            The most popular component library for Tailwind CSS as Qwik
            components.
          </h5>
          <p>
            Including all the themes, options and modififers daisyUI provides.
          </p>
          <CodeBlock
            wrapperClass="font-mono hidden lg:block"
            language="javascript"
            code={"npm install @qwikbits/daisyui @qwikbits/utils"}
          />
          <DaisyCityLink
            class="btn btn-primary max-w-max self-end no-underline "
            href="/components/"
          >
            {" "}
            View Components
          </DaisyCityLink>
        </div>
        <div class="flex h-full flex-col gap-8">
          <h3 class={`font-bold ${activeClass}`}>Utils</h3>
          <h5>Utilities and other helpers for Qwik</h5>
          <p>
            Create components with variables and modifiers, fix 100vh on iPhone
            and more!
          </p>

          <div class="mt-auto">
            <CodeBlock
              wrapperClass="font-mono hidden lg:block"
              language="javascript"
              code={"npm install @qwikbits/utils"}
            />
          </div>
          <p>
            For example, use <span>Qwik Bits Variants</span> to make simple
            declaritive components styles such as:
          </p>

          <CodeBlock
            wrapperClass="font-mono hidden lg:block"
            language="javascript"
            code={
              '<Button variant={{"theme":"primary"}} modifiers={{"outline":true,"glass":true,"no-animation":false}}}>Button</Button>'
            }
          />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Bits",
  meta: [
    {
      name: "description",
      content: "Qwik UI Library",
    },
  ],
};
