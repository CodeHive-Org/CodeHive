import { atom } from "recoil";

export const authTokenState = atom({
  key: "authTokenState",
  default: null,
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const userState = atom({
  key: "userState",
  default: {},
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
