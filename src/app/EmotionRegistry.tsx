"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const entries = cache.inserted;
    if (!entries || Object.keys(entries).length === 0) return null;

    const names: string[] = [];
    const styles: string[] = [];

    for (const [name, style] of Object.entries(entries)) {
      if (typeof style === "string") {
        names.push(name);
        styles.push(style);
      }
    }

    if (styles.length === 0) return null;

    // 삽입된 스타일을 flush하여 중복 방지
    for (const name of names) {
      delete entries[name];
    }

    return (
      <style
        key="emotion-ssr"
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles.join("") }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
