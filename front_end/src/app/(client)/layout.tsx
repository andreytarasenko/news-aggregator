import React from "react";
import { ChildrenPropT } from "../common/declarations/types";

const Layout = ({ children }: ChildrenPropT) => {
  return <div>{children}</div>;
};

export default Layout;
