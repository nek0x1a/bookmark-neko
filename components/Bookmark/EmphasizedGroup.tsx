import { DataCategory } from "@/bookmarkData/category";

export default function EmphasizedGroup({
  dataCategory,
  ...restProps
}: {
  dataCategory: DataCategory;
} & React.ComponentProps<"div">) {
  /** 所有重要书签 */
  const group = dataCategory.bookmarks.map((b) => (
    <a href={b.url} target="_blank" key={b.id}>
      <div className="flex gap-2 rounded-md p-2 hover:bg-slate-900 transition duration-150">
        <div className="flex-none content-center justify-center">icon</div>
        <div>
          <div className="text-amber-300">{b.name}</div>
          <div className="text-xs font-thin">{b.description}</div>
        </div>
      </div>
    </a>
  ));

  return (
    <div className="my-8" {...restProps}>
      <h2 className="text-3xl mt-0 mb-4 font-bold text-amber-300">
        {dataCategory.name}
      </h2>
      <div className="grid gap-x-4 gap-y-4 justify-between grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {group}
      </div>
    </div>
  );
}
