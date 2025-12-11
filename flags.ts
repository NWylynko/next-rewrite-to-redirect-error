import { flag } from "flags/next";

export const myRandomFlag = flag<"cats" | "dogs">({
  key: "my-random-flag",
  defaultValue: "dogs",
  decide: async (request) => {
    return Math.random() > 0.5 ? "cats" : "dogs";
  },
  options: ["cats", "dogs"] as const,
});
