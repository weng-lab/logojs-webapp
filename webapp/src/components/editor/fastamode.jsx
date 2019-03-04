import ace from 'brace';
import { CUSTOMIZABLE_CLASS_NAMES, classToRule } from './fastatheme';

export const generateFastaRules = (key, glyphmap) => (
    glyphmap.map( (glyph, i) => ({
	regex: glyph.regex,
	token: _getRule(i, key)
    }))
);

const _getRule = (i, key) => (
    "fasta-" + key + "." + (i < CUSTOMIZABLE_CLASS_NAMES.length
				? classToRule(CUSTOMIZABLE_CLASS_NAMES[i])
				: "variable.other")
);

class FastaHighlightRules extends ace.acequire('ace/mode/text_highlight_rules').TextHighlightRules {

    constructor(key, glyphmap) {
	super();
	this.$rules = { start: generateFastaRules(key, glyphmap) };
	this.$rules.start.push({ defaultToken: "text" });
	this.$rules.start.push({ regex: ">", next: "sequence_name", token: "text" });
        this.$rules.start.push({ regex: "[\#]", next: "comment", token: "comment.line.double-slash" });
	this.$rules.sequence_name = [{ regex: "$|^", next: "start", token: "text" },
				     { defaultToken: "text" }];
        this.$rules.comment = [{ regex: "$|^", next: "start", token: "comment.line.double-slash" },
                               { defaultToken: "comment.line.double-slash" }];
    }
    
}

class FastaMode extends ace.acequire('ace/mode/text').Mode {
    
    constructor(key, glyphmap) {
	super();
	this.$highlightRules = new FastaHighlightRules(key, glyphmap);
	this.$id = "ace/theme/fasta-mode-" + key;
    }
    
}

const defineFastaMode = (key, glyphmap) => {
    ace.define("ace/theme/fasta-mode-" + key, (acequire, exports, module) => {
	exports.Mode = FastaMode;
    });
    return new FastaMode(key, glyphmap);
};
export default defineFastaMode;
