import { RawBookmark } from "./bookmark";
import { DataCategory, RawCategory } from "./category";

/** 数据库查询结果 */
export type DBQueryResult<T> = { success: boolean; result: T };

export class RawBookmarksData {
  categories: RawCategory[];
  bookmarks: RawBookmark[];
  /**
   * 原始书签数据
   *
   * @param categories - 原始类别
   * @param bookmarks - 原始书签
   */
  constructor(categories: RawCategory[] = [], bookmarks: RawBookmark[] = []) {
    this.categories = categories;
    this.bookmarks = bookmarks;
  }
  toBookmarkData(): BookmarkData {
    const data = this.categories
      .sort((a, b) => a.position - b.position)
      .map(
        (c) =>
          new DataCategory(
            c.id,
            c.name,
            c.is_emphasized,
            c.description,
            this.bookmarks
              .filter((b) => b.category_id === c.id)
              .sort((a, b) => a.position - b.position)
          )
      );
    return new BookmarkData(data);
  }
}

export class BookmarkData {
  data: DataCategory[];
  constructor(data: DataCategory[] = []) {
    this.data = data;
  }
}
