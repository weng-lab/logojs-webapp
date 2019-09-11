import namedColors from 'color-name-list';
import { CompleteAlphabet } from 'logosj-react';

export const glyphsymbols = () => {
    let retval = {};
    CompleteAlphabet.map( v => (
	retval[v.regex] = v
    ));
    return retval;
};

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

export const colorNameFromHex = hex => {
    let color = namedColors.find(x => x.hex === hex);
    return (color && color.name) || hex;
};

export const hexFromColorName = name => {
    if (name[0] === '#') { return name; }
    if (!name || !name[0] || !name.substring || typeof name.substring !== "function") { return "#888888"; }
    let color = namedColors.find(x => x.name === name[0].toUpperCase() + name.substring(1));
    return (color && color.hex) || "#888888";
};

export const colorlightness = hex => {
    if (hex[0] !== '#') { hex = hexFromColorName(hex); }
    return (parseInt("0x" + hex.substring(1, 3), 16)
	    + parseInt("0x" + hex.substring(3, 5), 16)
	    + parseInt("0x" + hex.substring(5, 7), 16)) / 3.0
};

export const foregroundColor = hex => (
    (hex && colorlightness(hex) < 150.0 ? "#ffffff" : "#000000")
);

export const anyNegative = vset => (
    any(vset.map( v => any(v.map( x => x < 0.0 )) ))
);

export const any = b => {
    let retval = false;
    b.forEach( v => { if (v) retval = true; } );
    return retval;
};

export const indentCode = (code, indent) => (
    code.split('\n').filter(x => x !== "").map(x => indent + x).join('\n')
);

export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
