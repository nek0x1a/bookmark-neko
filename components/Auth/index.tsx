"use client";
import { authToken } from "@/server/auth";
import { useState } from "react";

export default function Auth({
  ...restProps
}: {} & React.ComponentProps<"div">) {
  const [token, setToken] = useState("");
  const [isAuthFailed, setAuthFailed] = useState(true);

  async function getPageWithCookies() {
    setAuthFailed(await authToken(token));
  }

  return (
    <main {...restProps}>
      <div className="flex flex-col gap-4 justify-center">
        {/* 标题 */}
        <h1 className="text-4xl font-bold text-center">Authorization</h1>
        {isAuthFailed ? (
          <div className="text-center font-thin">需要授权</div>
        ) : (
          <div className="text-center text-red-500">— 授权失败 —</div>
        )}

        {/* 输入框 */}
        <div className="m-16 h-18 flex justify-self-center">
          <input
            type="password"
            placeholder="Secret Token"
            value={token}
            className="flex-1 text-xl text-center placeholder:text-slate-500 placeholder:italic hover:rounded-md border-slate-300 border-b-1 hover:border-slate-500 hover:bg-slate-600 focus:bg-slate-400 focus:text-slate-800 hover:shadow-md focus:shadow-lg active:shadow-xl shadow-slate-800 transition duration-200 ease-in-out"
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </div>

        {/* 操作区 */}
        <div className="flex justify-center">
          <button
            className="py-4 px-16 rounded-md hover:bg-slate-400 active:bg-slate-300 text-slate-300 hover:text-slate-800 active:text-slate-800 hover:shadow-lg focus:shadow-0 active:shadow-xl shadow-slate-800 transition duration-200 ease-in-out"
            onClick={getPageWithCookies}
          >
            <span className="text-2xl">确认</span>
          </button>
        </div>
      </div>
    </main>
  );
}
