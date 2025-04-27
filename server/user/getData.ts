import { type DBQueryResult, RawBookmarksData } from "@/bookmarkData";
import { RawBookmark } from "@/bookmarkData/bookmark";
import { RawCategory } from "@/bookmarkData/category";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * 从数据库获取用户书签数据。
 *
 * @param userId - 用户 ID
 * @returns 原始用户书签数据
 */
export async function getUserBookmarks(
  userId: string
): Promise<DBQueryResult<RawBookmarksData>> {
  const context = getCloudflareContext();
  const categoryResult = await context.env.DB.prepare(
    "SELECT * FROM 'categories' WHERE is_deleted=0 AND user_id=?"
  )
    .bind(userId)
    .all<Record<string, string>>();
  const bookmarkResult = await context.env.DB.prepare(
    "SELECT * FROM 'bookmarks' WHERE is_deleted=0 AND user_id=?"
  )
    .bind(userId)
    .all<Record<string, string>>();

  // 将结果转为 RawBookmarksData
  const categories = categoryResult.results.map((r) =>
    RawCategory.fromRecord(r)
  );
  const bookmarks = bookmarkResult.results.map((r) =>
    RawBookmark.fromRecord(r)
  );

  const rawData = new RawBookmarksData(categories, bookmarks);
  // 如果有失败则返回不完整数据
  if (!categoryResult.success || !bookmarkResult.results) {
    return {
      success: false,
      result: rawData,
    };
  }
  // 没有失败则返回正确数据
  return {
    success: true,
    result: rawData,
  };
}
