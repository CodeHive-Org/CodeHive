import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    isLoggedin: false,
    data: null,
  },
});

export const alertAtom = atom({
  key: "alertAtom",
  default: {
    isOpen: false,
    title: "",
    description: "",
  },
});

export const submissionErrorAtom = atom({
  key: "submissionErrorAtom",
  default: {
    isError: false,
    message: "",
  },
});
