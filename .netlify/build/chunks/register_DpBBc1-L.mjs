import { c as createComponent } from './astro-component_CY_QnYb-.mjs';
import 'piccolore';
import { h as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_CMQdFz9U.mjs';
import { $ as $$Layout } from './Layout_RUuG525T.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Register" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-6 py-24 max-w-sm mx-auto space-y-12"> <header class="text-center space-y-2"> <h2 class="text-5xl font-['Cormorant_Garamond'] italic tracking-tighter">Register</h2> <p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Create your Orren account</p> </header> <form action="/api/auth/register" method="POST" class="space-y-6"> <div class="space-y-4"> <div class="space-y-1"> <label for="email" class="text-[10px] font-bold uppercase tracking-widest opacity-40">Email Address</label> <input type="email" name="email" id="email" required class="w-full bg-white border border-[#1a1a1a]/5 p-4 font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:border-[#B18B53] transition-colors"> </div> <div class="space-y-1"> <label for="password" class="text-[10px] font-bold uppercase tracking-widest opacity-40">Password</label> <input type="password" name="password" id="password" required class="w-full bg-white border border-[#1a1a1a]/5 p-4 font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:border-[#B18B53] transition-colors"> </div> </div> <button type="submit" class="w-full bg-[#1a1a1a] text-white py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B18B53] transition-colors cursor-pointer active:scale-[0.98] duration-200">
Register
</button> <div class="text-center"> <a href="/signin" class="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Sign In</a> </div> </form> </div> ` })}`;
}, "/Users/sam/projects/orren/src/pages/register.astro", void 0);

const $$file = "/Users/sam/projects/orren/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
