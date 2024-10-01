import { atom } from "recoil";

export const outputAtom = atom({
  key: "outputAtom",
  default: {
    type: "run",
    data: [],
    expectedOutput: "",
  },
});

export const resultAtom = atom({
  key: "resultAtom",
  default: false,
});

export const questionAddStatus = atom({
  key: "questionAddStatus",
  default: -1,
});

export const codeRunLoadingState = atom({
  key: "codeRunLoadingState",
  default: false,
});
