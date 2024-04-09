import { $, component$, useTask$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import SelectPreview from "~/components/previewComponents/SelectPreview";
import CheckboxPreview from "~/components/previewComponents/CheckboxPreview";
import TogglePreview from "~/components/previewComponents/TogglePreview";
import NavbarPreview from "~/components/previewComponents/NavbarPreview";
import DaisyLinkPreview from "~/components/previewComponents/DaisyLinkPreview";
import CardPreview from "~/components/previewComponents/CardPreview";
import TooltipPreview from "~/components/previewComponents/TooltipPreview";
import ButtonPreview from "~/components/previewComponents/ButtonPreview";
import { isBrowser } from "@builder.io/qwik/build";
export default component$(() => {
  const components = [
    "Button",
    "DaisyLink",
    "Card",
    "Select",
    "Checkbox",
    "Toggle",
    "Tooltip",
    "Navbar",
  ];
  const goTo = $((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -125;
      const y = element.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });

  const active = useSignal<string | null>("Button");

  const activeClass =
    "inline-block bg-gradient-to-r from-accent via-primary to-secondary dark:from-accent from-25% via-50% to-75% dark:via-secondary dark:to-accent bg-clip-text !text-transparent";

  useTask$(() => {
    let scrollListener: undefined | (() => void) = undefined;
    if (isBrowser) {
      const elements: HTMLElement[] = [];
      const main = document.getElementsByTagName("main")[0];
      const mainRect = main.getBoundingClientRect();
      scrollListener = () => {
        const intersector = document.getElementById("intersector");
        if (intersector && getComputedStyle(intersector).display === "block") {
          if (elements.length === 0) {
            components.forEach((component) => {
              const element = document.getElementById(`${component}-header`);
              if (element) {
                elements.push(element);
              }
            });
          }
          const intersectorRect = intersector.getBoundingClientRect();
          elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < intersectorRect.bottom) {
              active.value = element.id.replace("-header", "");
            }
          });
          if (window.scrollY + window.innerHeight > mainRect.height - 25) {
            active.value = components[components.length - 1];
          } else if (window.scrollY < intersectorRect.height / 2) {
            active.value = components[0];
          }
        }
      };
      scrollListener();
      window.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (scrollListener) {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  });
  return (
    <>
      <div class="relative grid grid-cols-1 pt-4">
        <div class="mt-20 lg:hidden"></div>
        <div
          class="bg-base-100 invisible fixed left-0 top-0 mt-20 hidden h-96 w-full lg:block"
          id="intersector"
        ></div>
        <ul class="menu rounded-box hidden lg:fixed lg:top-28 lg:block lg:w-40">
          {components.map((component) => (
            <li key={component}>
              <a
                onClick$={(e) => {
                  e.preventDefault();
                  goTo(component);
                  setTimeout(() => {
                    active.value = component;
                  }, 50);
                }}
                class={`text-lg ${
                  active.value === component ? activeClass : ""
                }`}
                href={`#${component}`}
              >
                {component}
              </a>
            </li>
          ))}
        </ul>
        <div class="flex flex-col gap-6 lg:ml-40">
          <ButtonPreview />
          <DaisyLinkPreview />
          <CardPreview />
          <SelectPreview />
          <CheckboxPreview />
          <TogglePreview />
          <TooltipPreview />
          <NavbarPreview />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Bits - daisyUI Components",
  meta: [
    {
      name: "description",
      content: "Qwik Bits daisyUI Components",
    },
  ],
};
