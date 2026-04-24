import { c as createComponent } from './astro-component_CY_QnYb-.mjs';
import 'piccolore';
import { h as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_CMQdFz9U.mjs';
import { $ as $$Layout } from './Layout_RUuG525T.mjs';

const $$NetWorth = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Net Worth" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-6 py-12 max-w-2xl mx-auto space-y-12"> <header class="space-y-2"> <h2 class="text-5xl font-['Cormorant_Garamond'] italic tracking-tighter">Net Worth</h2> <p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Financial Snapshot</p> </header> <!-- Total Net Worth --> <div class="bg-[#1a1a1a] text-white p-12 text-center space-y-4"> <span class="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Consolidated Wealth</span> <h3 class="text-6xl font-bold tracking-tighter">$142,500.00</h3> <div class="flex justify-center items-center gap-2 text-[#7ea493]"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> <span class="text-[10px] font-bold uppercase tracking-widest">+2.4% this month</span> </div> </div> <!-- Assets vs Liabilities --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <section class="space-y-6"> <h4 class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Assets</h4> <div class="space-y-3"> ${[
    { name: "Checking", value: 8500 },
    { name: "Savings", value: 24e3 },
    { name: "Investments", value: 11e4 }
  ].map((item) => renderTemplate`<div class="bg-white p-6 flex justify-between items-center border-l-2 border-[#7ea493]"> <span class="font-['Cormorant_Garamond'] italic text-lg">${item.name}</span> <span class="font-bold tracking-tighter text-lg">$${item.value.toLocaleString()}</span> </div>`)} </div> </section> <section class="space-y-6"> <h4 class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-right md:text-left">Liabilities</h4> <div class="space-y-3"> ${[
    { name: "Credit Cards", value: 0 },
    { name: "Auto Loan", value: 0 }
  ].map((item) => renderTemplate`<div class="bg-white p-6 flex justify-between items-center border-l-2 border-[#B18B53]/20"> <span class="font-['Cormorant_Garamond'] italic text-lg">${item.name}</span> <span class="font-bold tracking-tighter text-lg">$${item.value.toLocaleString()}</span> </div>`)} </div> </section> </div> <!-- Manual Entry Button --> <button class="w-full border-2 border-[#1a1a1a] py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] hover:text-white transition-all cursor-pointer">
Log Asset / Liability
</button> </div> ` })}`;
}, "/Users/sam/projects/orren/src/pages/net-worth.astro", void 0);

const $$file = "/Users/sam/projects/orren/src/pages/net-worth.astro";
const $$url = "/net-worth";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NetWorth,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
