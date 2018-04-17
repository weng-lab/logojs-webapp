export const isArrayOfArrays = x => {
    if (!Array.isArray(x)) { return false; }
    for (let sx in x) {
	if (!Array.isArray(x[sx])) { return false; }
	if (!x[sx].length) { return false; }
    }
    return true;
};
