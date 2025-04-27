import { DataCategory } from "@/bookmarkData/category";

export default function NormalGroup({
  dataCategory,
  ...restProps
}: {
  dataCategory: DataCategory;
} & React.ComponentProps<"div">) {
  /** 所有书签 */
  const group = dataCategory.bookmarks.map((item) => (
    <a href={item.url} target="_blank" key={item.id}>
      <div className="flex gap-2 p-2 rounded-md hover:bg-slate-900 transition duration-150">
        <div className="flex-none content-center justify-center">icon</div>
        <div className="">{item.name}</div>
      </div>
    </a>
  ));

  return (
    <div {...restProps}>
      <h2 className="text-lg font-bold mt-0 mb-2 text-amber-300">
        {dataCategory.name}
      </h2>
      <div className="flex flex-col gap-x-2">{group}</div>
    </div>
  );
}
