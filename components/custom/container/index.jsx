import React from "react";

export default function Container({ children }) {
  return (
    <div className="max-w-[1440px] mx-auto md:px-10 lg:px-5 xl:px-20">
      {children}
    </div>
  );
}
