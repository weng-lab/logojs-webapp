export const TYPEID = {
    DNA: 0,
    RNA: 1,
    AA: 2,
    custom: 3
};

export const isArrayOfArrays = x => {
    if (!Array.isArray(x)) { return false; }
    for (let sx in x) {
	if (!Array.isArray(x[sx])) { return false; }
	if (!x[sx].length) { return false; }
    }
    return true;
};

export const apiUrls = apibase => ({
    pwm: uuid => apibase + "/api/pwm/" + uuid,
    logo: uuid => apibase + "/api/logo/" + uuid
});

export const textToClipboard = text => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
