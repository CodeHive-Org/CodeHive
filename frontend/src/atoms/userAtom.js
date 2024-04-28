import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        isLoggedin: false,
        data: null
    },
});