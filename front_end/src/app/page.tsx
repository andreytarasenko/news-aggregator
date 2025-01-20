import { ChildrenPropT } from "./common/declarations/types";

export default function Home({ children }: ChildrenPropT) {
  return <div>{children}</div>;
}
