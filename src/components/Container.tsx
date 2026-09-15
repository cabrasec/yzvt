import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  headerWide?: boolean;
};

export function Container({
  children,
  className = "",
  wide = false,
  headerWide = false,
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${
        wide ? "lg:max-w-none lg:w-[min(92vw,1600px)]" : ""
      } ${headerWide ? "lg:max-w-[1360px]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
