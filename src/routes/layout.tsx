import type { Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import Header from "../components/header/header";
import { routeLoader$ } from "@builder.io/qwik-city";
import { isBrowser } from "@builder.io/qwik/build";
export const ThemeContext =
  createContextId<Signal<boolean>>("docs.theme-context");
export default component$(() => {
  const serverTheme = useTheme();
  const lightMode = useSignal<boolean | null>(
    serverTheme.value === "light" ||
      (isBrowser &&
        !window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      null,
  );

  useTask$(() => {
    if (isBrowser) {
      let cookies: Record<string, string> = {};
      if (!serverTheme.value) {
        cookies = document.cookie.split(";").reduce(
          (acc, c) => {
            const [key, value] = c.trim().split("=");
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );
      }
      const theme = serverTheme.value || cookies.theme;
      if (theme === "light") {
        lightMode.value = true;
      } else if (theme === "dark") {
        lightMode.value = false;
      } else {
        lightMode.value = !window.matchMedia("(prefers-color-scheme: dark)")
          .matches;
      }
    }
  });
  useTask$((ctx) => {
    if (isBrowser) {
      ctx.track(() => lightMode.value);
      document.cookie = `theme=${lightMode.value ? "light" : "dark"};`;
    }
  });
  useContextProvider(ThemeContext, lightMode);
  return (
    <main>
      <div
        class={{
          "bg-base-100 min-h-screen": true,
          dark: !lightMode.value,
          light: !!lightMode.value,
        }}
        data-theme={lightMode.value ? "qb-light" : "qb-dark"}
      >
        <Header />
        <section class="z-10 px-6 pt-8">
          <Slot />
        </section>
      </div>
    </main>
  );
});

export const useTheme = routeLoader$(({ cookie }) => {
  const theme = cookie.get("theme");
  return theme?.value;
});
