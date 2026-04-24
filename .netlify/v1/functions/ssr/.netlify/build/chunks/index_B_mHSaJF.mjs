import { c as createComponent } from './astro-component_CY_QnYb-.mjs';
import 'piccolore';
import { h as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_CMQdFz9U.mjs';
import { $ as $$Layout } from './Layout_RUuG525T.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="px-8 py-24 md:py-48 flex flex-col items-center text-center"> <h2 class="text-6xl md:text-9xl font-['Cormorant_Garamond'] italic tracking-tighter mb-8 reveal-fade-up">
Coming Soon
</h2> <div class="w-24 h-px bg-ink/20 mb-8"></div> <p class="max-w-md text-sm md:text-base opacity-60 leading-relaxed font-['Plus_Jakarta_Sans']">
A new digital presence designed by Hutzell Creative Co. 
			Refined, intentional, and strictly editorial.
</p> </section> ` })}`;
}, "/Users/sam/projects/orren/src/pages/index.astro", void 0);

const $$file = "/Users/sam/projects/orren/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
