import { createEnum } from "./createEnum";

const LIVE = 1;
const DISABLE = 0;

const NO_LIVE = 2;

const value = [
	{ key: "disable", value: DISABLE },
	{ key: "live", value: LIVE },
	{ key: "no_live", value: NO_LIVE },
];


const statusEnum = createEnum(value);
export default statusEnum;
