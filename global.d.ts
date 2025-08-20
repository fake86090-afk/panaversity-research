declare module "*.md" {
  import type { ReactElement } from "react";

  export const attributes: Record<string, any>;
  export const react: () => ReactElement;
}
