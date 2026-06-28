const SKELETONS = Array.from({ length: 10 });

export default function SkeletonElement() {
  return (
    <section
      data-testid="skeleton-element"
      className="mx-auto max-w-screen-xl px-4 py-6"
    >
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {SKELETONS.map((_, i) => (
          <li
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-3"
          >
            <div className="mb-3 aspect-[3/4] animate-pulse rounded-lg bg-slate-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          </li>
        ))}
      </ul>
    </section>
  );
}
