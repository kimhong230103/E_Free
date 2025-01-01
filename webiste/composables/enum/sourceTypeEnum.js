import { createEnum } from "./createEnum";

const YOUTUBE = 1;
const FACEBOOK = 2;

const value = [
  { key: "youtube", value: YOUTUBE },
  { key: "facebook", value: FACEBOOK },
];

export default createEnum(value);
