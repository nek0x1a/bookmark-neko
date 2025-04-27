"use server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";

import Logger from "@/server/logger";

/** 日志记录 */
const logger = new Logger("auth");

/**
 * 生成随机 Token
 * 格式为 32 位包含小写字母和数字（/[0-9a-z]{32}/）的随机字符串。
 *
 * @returns 生成的 Token
 */
function genCookieToken() {
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += Math.floor(Math.random() * 36).toString(36);
  }
  return token;
}

/**
 * 将 Token 与数据库搜索，获取 user_id 和 auth_token 设置到 Cookies中。
 *
 * @param token - 用于验证的 Token
 */
export async function authToken(token: string): Promise<boolean> {
  if (!token) {
    return false;
  }
  logger.debug(`AuthToken - ${token}`);
  const context = getCloudflareContext();
  // 查找匹配的 Token
  const userIdRecord = await context.env.DB.prepare(
    "SELECT id FROM 'users' WHERE token=?"
  )
    .bind(token)
    .first<Record<string, number>>();
  if (!userIdRecord) {
    return false;
  }

  // 生成新 authToken
  const userId = userIdRecord["id"];
  const authToken = genCookieToken();
  const insertResult = await context.env.DB.prepare(
    "INSERT INTO 'cookies' ('user_id', 'auth') VALUES (?, ?)"
  )
    .bind(userId, authToken)
    .run<Record<string, string>>();
  logger.info(
    `AuthToken - NewCookieToken { user_id: ${userId}, auth_token: ${authToken}, result: ${insertResult} }`
  );

  // 写入 Cookies
  const cookieStored = await cookies();
  cookieStored.set({
    name: "user_id",
    value: userId.toString(),
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  cookieStored.set({
    name: "auth_token",
    value: authToken,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

/**
 * 从数据库中删除无效的数据
 *
 * @param userId - 用户 ID
 * @param authToken - 过期或无效的 authToken
 */
export async function deleteCookies(userId: string, authToken: string) {
  // 删除数据库中的项
  if (userId && authToken) {
    const context = getCloudflareContext();
    const deleteResult = await context.env.DB.prepare(
      "DELETE FROM 'cookies' WHERE user_id=? AND auth=?"
    )
      .bind(userId, authToken)
      .run<Record<string, string>>();
    logger.info(
      `DeleteCookies - { user_id: ${userId}, auth_token: ${authToken}, result: ${deleteResult} }`
    );
  }
}

/**
 * 将 userId 和 authToken 与数据库对比，确定是否通过授权。
 *
 * @param userId - 用户 ID
 * @param authToken - 用于验证的 authToken
 * @returns 是否通过授权
 */
export async function checkAuthToken(
  userId: string,
  authToken: string
): Promise<boolean> {
  // 若传入参数不全则授权失败
  if (!userId || !authToken) {
    return false;
  }
  logger.debug(
    `CheckAuthToken - { user_id: ${userId}, auth_token: ${authToken} }`
  );
  const context = getCloudflareContext();
  const { results: cookieTokensRecord } = await context.env.DB.prepare(
    "SELECT auth FROM 'cookies' WHERE user_id=?"
  )
    .bind(userId)
    .all<Record<string, string>>();

  logger.debug(
    `CheckAuthToken - ValidRecode [${cookieTokensRecord.map(
      (item) => item["auth"]
    )}]`
  );
  const isSuccess = cookieTokensRecord.some(
    (item) => item["auth"] === authToken
  );
  if (!isSuccess) {
    deleteCookies(userId, authToken);
  }
  return isSuccess;
}
