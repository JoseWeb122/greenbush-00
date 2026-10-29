"use client";

import { useState } from "react";
import { Link2, Share2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setMsg("Copy isn't available in this browser – you can copy the address bar instead.");
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      setMsg("Native sharing isn't supported here – copied link instead.");
      copy();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Share</span>
      <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-medium text-evergreen hover:border-forest">
        {copied ? <Check className="h-3.5 w-3.5 text-forest" /> : <Link2 className="h-3.5 w-3.5" />} {copied ? "Link copied" : "Copy link"}
      </button>
      <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-medium text-evergreen hover:border-forest">
        <Share2 className="h-3.5 w-3.5" /> Share
      </button>
      {msg && <p className="w-full text-xs text-charcoal/55" role="status">{msg}</p>}
    </div>
  );
}
