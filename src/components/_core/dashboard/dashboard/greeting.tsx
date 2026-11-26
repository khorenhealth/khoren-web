import { Sparkles } from "lucide-react";

export function Greeting() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm text-healiu-dark">Good morning,</p>
        <h1 className="text-2xl font-semibold tracking-tight text-healiu-dark-dark">
          Adaeze Okonkwo
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-healiu-dark">Monday, March 16, 2026</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-healiu-blue-light px-3 py-1 text-xs font-semibold text-healiu-blue">
          <Sparkles className="size-3.5" strokeWidth={2.25} />
          Free Plan
        </span>
      </div>
    </header>
  );
}
