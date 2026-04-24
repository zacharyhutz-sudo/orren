import { c as createComponent } from './astro-component_CY_QnYb-.mjs';
import 'piccolore';
import { h as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from './ssr-function_CMQdFz9U.mjs';
import { $ as $$Layout } from './Layout_RUuG525T.mjs';

const $$Budget = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Budget" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-6 py-12 max-w-2xl mx-auto space-y-12"> <header class="space-y-2"> <h2 class="text-5xl font-['Cormorant_Garamond'] italic tracking-tighter">Budget</h2> <p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Monthly Allocation</p> </header> <!-- Summary Card --> <div class="bg-white p-8 space-y-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"> <div class="flex justify-between items-end border-b border-[#1a1a1a]/5 pb-6"> <div> <span class="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">Remaining</span> <span class="text-4xl font-bold tracking-tighter">$1,240.00</span> </div> <div class="text-right"> <span class="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">Spent</span> <span class="text-xl font-bold tracking-tighter text-[#B18B53]">$2,800 / $4,040</span> </div> </div> <!-- Simple Progress Bar --> <div class="h-1 w-full bg-[#1a1a1a]/5 overflow-hidden"> <div class="h-full bg-[#1a1a1a] w-[70%]"></div> </div> </div> <!-- Categories List --> <section class="space-y-6"> <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Categories</h3> <div class="space-y-4"> ${[
    { name: "Housing", spent: 1800, budget: 1800 },
    { name: "Groceries", spent: 450, budget: 600 },
    { name: "Utilities", spent: 220, budget: 300 },
    { name: "Entertainment", spent: 330, budget: 400 }
  ].map((cat) => renderTemplate`<div class="group bg-white p-6 flex justify-between items-center transition-all hover:translate-x-1 border-l-2 border-transparent hover:border-[#B18B53]"> <div> <span class="text-lg font-['Cormorant_Garamond'] italic">${cat.name}</span> <div class="flex items-center gap-2 mt-1"> <div class="h-0.5 w-12 bg-[#1a1a1a]/5 overflow-hidden"> <div class="h-full bg-[#B18B53]"${addAttribute(`width: ${cat.spent / cat.budget * 100}%`, "style")}></div> </div> <span class="text-[9px] font-bold uppercase tracking-widest opacity-30">${Math.round(cat.spent / cat.budget * 100)}%</span> </div> </div> <div class="text-right"> <span class="block text-lg font-bold tracking-tighter">$${cat.spent}</span> <span class="text-[9px] font-bold uppercase tracking-widest opacity-30">of $${cat.budget}</span> </div> </div>`)} </div> </section> <!-- Manual Entry Button --> <button class="w-full bg-[#1a1a1a] text-white py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B18B53] transition-colors cursor-pointer active:scale-[0.98] duration-200">
Add Transaction
</button> </div> ` })}`;
}, "/Users/sam/projects/orren/src/pages/budget.astro", void 0);

const $$file = "/Users/sam/projects/orren/src/pages/budget.astro";
const $$url = "/budget";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Budget,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
