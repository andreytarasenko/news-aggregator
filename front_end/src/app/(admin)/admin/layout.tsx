import { ChildrenPropT } from "@/app/common/declarations/types";
import React from "react";

const Layout = ({ children }: ChildrenPropT) => {
  return <div>{children}</div>;
};

export default Layout;
