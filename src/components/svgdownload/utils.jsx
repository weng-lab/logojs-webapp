import { textToClipboard, downloadBlob } from '../../common/utils';

/* extract SVG data from DOM node, remove formatting from source code */
export const _svgdata = _svgnode => {
    if (!_svgnode) { return ''; }
    let _svg = _svgnode.getElementsByTagName('svg').item(0);
    if (!_svg) return '';
    let svg = _svg.cloneNode(true);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let preface = '<?xml version="1.0" standalone="no"?>';
    const p = svg.outerHTML.split('viewBox="0 0 ')[1].split('"')[0].split(' ');
    return preface + svg.outerHTML.replace(/\n/g, "").replace(/[ ]{8}/g, "").replace(/<svg/g, "<svg width='" + p[0] + "' height='" + p[1] + "' style='background-color:white'");
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
