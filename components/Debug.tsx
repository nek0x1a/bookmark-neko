import { cookies } from "next/headers";
import { ComponentProps } from "react";

export default async function Home() {
  const cookieStored = await cookies();
  const requestCookies = cookieStored.getAll();
  return (
    <div className="p-4 border-2 border-slate-800 rounded-md">
      <h2 className="text-2xl font-bold">Debug</h2>
      <div>
        <p>cookies:</p>
        <ul>
          {requestCookies.map((item, index) => (
            <li key={index}>
              {item?.name ? (
                <Badge className="bg-cyan-800 text-white">{item.name}</Badge>
              ) : (
                <Badge className="bg-red-800 text-white">null</Badge>
              )}
              {": "}
              {item?.value ? (
                <Badge className="bg-green-800 text-white">{item.value}</Badge>
              ) : (
                <Badge className="bg-red-800 text-white">null</Badge>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Badge({ children, className, ...restProps }: ComponentProps<"span">) {
  return (
    <span
      className={`${className} px-1 mx-1 text-xs rounded-sm`}
      {...restProps}
    >
      {children}
    </span>
  );
}
