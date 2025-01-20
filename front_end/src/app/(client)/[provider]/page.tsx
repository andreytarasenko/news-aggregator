import { ChildrenPropT } from "@/app/common/declarations/types";
import React from "react";

const Page = ({ children }: ChildrenPropT) => {
  return <div>{children}</div>;
};

export default Page;
