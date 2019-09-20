import React from 'react';
import { FastaEditor } from '../../../editor/index';
import { fastaToPWM } from '../parsers/fasta';

const tryParseFasta = (text, onFastaChange) => {
    try {
        const result = fastaToPWM(text);
        onFastaChange(result.ppm, result.fasta);
    } catch (e) {}
};

const WorkspaceFastaEditor = ({ id, onFastaChange, logo }) => (
    <FastaEditor
        height="100%" width="100%"
        text={logo.fasta}
        onChange={text => tryParseFasta(text, onFastaChange)}
        id={id} alphabet={logo.alphabet} />
);
export default WorkspaceFastaEditor;
