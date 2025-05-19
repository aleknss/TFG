export function ensure(value) {
    if (value === null || value === undefined) {
        throw new Error('no value');
    }
    return value;
}
export function clone(object) {
    const source = object;
    if (source === null || typeof source !== 'object') {
        return source;
    }
    const result = Array.isArray(source) ? [] : {};
    for (let key in source) {
        if (!source.hasOwnProperty(key)) {
            continue;
        }
        const value = source[key];
        if (value !== null && typeof value === 'object') {
            result[key] = clone(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
export function merge(dest, source) {
    for (const key in source) {
        if (!source.hasOwnProperty(key)) {
            continue;
        }
        if (source[key] === undefined) {
            continue;
        }
        if (dest[key] === undefined || typeof source[key] !== 'object') {
            dest[key] = source[key];
        }
        else {
            merge(dest[key], source[key]);
        }
    }
    return dest;
}
