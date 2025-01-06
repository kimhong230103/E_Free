export function createEnum(objectsArray) {
    const enumObject = {};

    for (const obj of objectsArray) {
        const { key, value } = obj;
        enumObject[key] = value;
    }

    enumObject.list = Object.keys(enumObject).map((key) => ({
        key: key,
        value: enumObject[key],
    }));

    enumObject.getKey = function (value) {
        const key = Object.keys(enumObject).find((key) => enumObject[key] === value);
        return key !== undefined ? key : " ";
    };

    return enumObject;
}
