"use client";

import { Download, Eye, FileText } from "lucide-react";

export type HealthDocument = {
  id: string;
  name: string;
  date: string;
  kind: string;
  size: string;
};

function fileContents(document: HealthDocument) {
  return [document.name, `${document.date} · ${document.kind} · ${document.size}`].join("\n");
}

function openDocument(document: HealthDocument) {
  const url = URL.createObjectURL(new Blob([fileContents(document)], { type: "text/plain" }));
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadDocument(document: HealthDocument) {
  const url = URL.createObjectURL(new Blob([fileContents(document)], { type: "text/plain" }));
  const link = window.document.createElement("a");
  link.href = url;
  link.download = `${document.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function DocumentRow({ document }: { document: HealthDocument }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl bg-[#F6F8F9] px-4 py-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-healiu-blue-light text-healiu-blue">
        <FileText className="size-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-healiu-dark-dark">{document.name}</h3>
        <p className="mt-0.5 text-xs text-[#98A2B3]">
          {document.date} · {document.kind} · {document.size}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`View ${document.name}`}
          onClick={() => openDocument(document)}
          className="flex size-8 items-center justify-center rounded-full text-[#8B97A6] transition-colors hover:bg-white hover:text-healiu-dark-dark"
        >
          <Eye className="size-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label={`Download ${document.name}`}
          onClick={() => downloadDocument(document)}
          className="flex size-8 items-center justify-center rounded-full text-[#8B97A6] transition-colors hover:bg-white hover:text-healiu-dark-dark"
        >
          <Download className="size-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
