import ace from 'brace';
import './fastatheme.css';

export const XHTML_NS = "http://www.w3.org/1999/xhtml";

export const CUSTOMIZABLE_CLASS_NAMES = [
    ".ace_comment.ace_line.ace_double-slash",
    ".ace_comment.ace_line.ace_double-dash",
    ".ace_comment.ace_line.ace_number-sign",
    ".ace_comment.ace_line.ace_percentage",
    ".ace_comment.ace_line.ace_character",
    ".ace_comment.ace_block.ace_documentation",
    ".ace_constant.ace_numeric",
    ".ace_constant.ace_character",
    ".ace_constant.ace_character.ace_escape",
    ".ace_constant.ace_language",
    ".ace_constant.ace_other",
    ".ace_entity.ace_name.ace_function",
    ".ace_entity.ace_name.ace_type",
    ".ace_entity.ace_name.ace_tag",
    ".ace_entity.ace_name.ace_section",
    ".ace_invalid.ace_illegal",
    ".ace_invalid.ace_deprecated",
    ".ace_keyword.ace_control",
    ".ace_keyword.ace_operator",
    ".ace_keyword.ace_other",
    ".ace_string.ace_quoted",
    ".ace_string.ace_single",
    ".ace_string.ace_double",
    ".ace_string.ace_triple",
    ".ace_string.ace_other",
    ".ace_string.ace_unquoted",
    ".ace_string.ace_interpolated",
    ".ace_string.ace_regexp",
    ".ace_variable.ace_parameter",
    ".ace_variable.ace_language"
];

export const classToRule = className => (
    className.substring(1).replace(/ace_/g, "")
);

export const generateFastaTheme = (key, glyphmap) => (
    glyphmap.map( (glyph, i) => (
	i >= CUSTOMIZABLE_CLASS_NAMES.length ? null : (
	    ".ace_fasta-" + key + CUSTOMIZABLE_CLASS_NAMES[i] + " { color: " + glyph.color + "; }"
	)
    ))
);

/**
 * Applies a custom Fasta theme for the editor by dynamically generating CSS text and appending it to the document.
 * This method will replace an existing Fasta theme previously appended to the document with the same key.
 * @param glyphmap: List of glyphs to color within the editor, in the format { regex, color }
 */
export const applyFastaTheme = (key, glyphmap) => {
    
    let doc = document.ownerDocument || document;
    let head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    let celem = _truncateExistingCssString(key, doc, head);
    let cssText = '';
    generateFastaTheme(key, glyphmap).map(t => (cssText += t + '\n'));
    celem.appendChild(doc.createTextNode(cssText));

    ace.define("ace/theme/fasta-" + key, (acequire, exports, module) => {
	exports.isDark = false;
	exports.cssClass = "fasta-" + key;
	exports.cssText = cssText;
    });
    
};
export default applyFastaTheme;

const _stylekey = key => "fasta-" + key;

const _truncateExistingCssString = (key, doc, head) => {
    let index = -1;
    let sheets = null;
    let skey = _stylekey(key);
    if ((sheets = doc.querySelectorAll("style"))) {
        while (++index < sheets.length) {
            if (sheets[index].id === skey) {
		sheets[index].innerHTML = '';
                return sheets[index];
	    }
	}
    }
    return _appendElementToContainer("style", skey, head);
};

const _appendElementToContainer = (tag, id, container, ns) => {
    let elem = document.createElementNS ?
        document.createElementNS(ns || XHTML_NS, tag) :
        document.createElement(tag);
    elem.id = id;
    container.appendChild(elem);
    return elem;
};
