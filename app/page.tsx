import Auth from "@/components/Auth";
import Bookmark from "@/components/Bookmark";
import { checkAuthToken } from "@/server/auth";
import { getUserBookmarks } from "@/server/user/getData";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStored = await cookies();
  const userID = cookieStored.get("user_id")?.value;
  const authToken = cookieStored.get("auth_token")?.value;
  // 任一为空需要授权
  if (!userID || !authToken) {
    return <Auth />;
  }
  // 检查失败则需要授权
  if (!(await checkAuthToken(userID, authToken))) {
    return <Auth />;
  }
  // 授权通过
  const rawBookmarkData = await getUserBookmarks(userID);

  return (
    <Bookmark
      isDataComplete={rawBookmarkData.success}
      bookmarkData={rawBookmarkData.result.toBookmarkData()}
    />
  );
}
