/* extract SVG data from DOM node, remove formatting from source code */
const _svgdata = _svg => {
    let svg = _svg.cloneNode(true);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let preface = '<?xml version="1.0" standalone="no"?>';
    return preface + svg.outerHTML.replace(/\n/g, "").replace(/[ ]{8}/g, "");
};

export const downloadSVG = (_svg, filename) => {
    let svgBlob = new Blob([_svgdata(_svg)], {type:"image/svg+xml;charset=utf-8"});
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

export const copySVG = (_svg) => {
    const el = document.createElement('textarea');
    el.value = _svgdata(_svg);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
