import JSZip from 'jszip';
import sanitize from 'sanitize-filename';

import { downloadBlob } from '../common/utils';

class SVGZip {

    constructor(jszip) {
        this.jszip = jszip || new JSZip();
    }
    
    folder(name) {
        return this.jszip.folder(sanitize(name.replace(/\//g, "_")));
    }

    file(name, content) {
        return this.jszip.file(sanitize(name), content);
    }

    async download(filename) {
        const blob = await this.jszip.generateAsync({ type: "blob" });
        downloadBlob(blob, filename);
    }
    
}
export default SVGZip;
