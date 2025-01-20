import React from "react";
import { ChildrenPropT } from "../common/declarations/types";

const Page = ({ children }: ChildrenPropT) => {
  return <div>{children}</div>;
};

export default Page;
