import { textToClipboard, downloadBlob } from '../../common/utils';

/* extract SVG data from DOM node, remove formatting from source code */
export const _svgdata = _svgnode => {
    if (!_svgnode) { return ''; }
    let _svg = _svgnode.getElementsByTagName('svg')[0];
    if (!_svg) return '';
    let svg = _svg.cloneNode(true);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let preface = '<?xml version="1.0" standalone="no"?>';
    return preface + svg.outerHTML.replace(/\n/g, "").replace(/[ ]{8}/g, "");
};

export const downloadSVG = (_svg, filename) => {
    downloadBlob(
        new Blob([_svgdata(_svg)], {type:"image/svg+xml;charset=utf-8"}),
        filename
    );
};

export const copySVG = (_svg) => (
    textToClipboard(_svgdata(_svg))
);
