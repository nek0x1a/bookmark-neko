import { ComponentProps } from "react";

export default function Footer(props: ComponentProps<"footer">) {
  const currentYear = new Date().getFullYear();
  return (
    <footer {...props}>
      <div className="my-10 text-center">
        Copyright © {currentYear} neko | 猫 ♥ 喵
      </div>
    </footer>
  );
}
