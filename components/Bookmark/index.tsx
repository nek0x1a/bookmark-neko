import { ComponentProps } from "react";

import { BookmarkData } from "@/bookmarkData";
import EmphasizedGroup from "./EmphasizedGroup";
import NormalGroup from "./NormalGroup";

export default function Bookmark({
  isDataComplete = true,
  bookmarkData = new BookmarkData(),
  ...restProps
}: ComponentProps<"div"> & {
  isDataComplete: boolean;
  bookmarkData: BookmarkData;
}) {
  const emoji = "> w < ~";

  /** 所有重要书签组 */
  const emphasizedGroup = bookmarkData.data
    .filter((c) => c.is_emphasized)
    .map((c) => <EmphasizedGroup key={c.id} dataCategory={c} />);

  /** 所有书签组 */
  const normalGroup = (
    <div
      className={`my-8 grid gap-x-4 gap-y-4 justify-between grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
    >
      {bookmarkData.data
        .filter((c) => !c.is_emphasized)
        .map((c) => (
          <NormalGroup key={c.id} dataCategory={c} />
        ))}
    </div>
  );

  return (
    <>
      <header {...restProps}>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">喵 {emoji}</h1>
          <p className="font-thin">这是猫猫的书签页</p>
          {isDataComplete ? null : (
            <p className="text-amber-600">书签数据不完整，请重新授权！</p>
          )}
        </div>
      </header>
      <main {...restProps}>
        {emphasizedGroup}
        {normalGroup}
      </main>
    </>
  );
}
