import { atom } from "recoil";

export const outputAtom = atom({
  key: "outputAtom",
  default: null,
});

export const resultAtom = atom({
  key: "resultAtom",
  default: false,
});

export const questionAddStatus = atom({
  key: "questionAddStatus",
  default: -1,
})