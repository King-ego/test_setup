export function removeEmptyKeys(obj): Object {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            removeEmptyKeys(obj[key]);
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        } else if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj;
}