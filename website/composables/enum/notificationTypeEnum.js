import { createEnum } from "./createEnum";

const LIVE_MATCH = 1;
const RECENT_NEWS = 2;
const RECENT_HIGHLIGHT = 3;

const value = [
  {
    key: "live_match",
    value: LIVE_MATCH,
  },
  {
    key: "recent_news",
    value: RECENT_NEWS,
  },
  {
    key: "recent_highlight",
    value: RECENT_HIGHLIGHT,
  },
];

const notificationTypeEnum = createEnum(value);
export default notificationTypeEnum;
