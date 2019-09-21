import React from 'react';
import { FastaEditor } from '../../../editor/index';
import { fastaToPWM } from '../parsers/fasta';

const tryParseFasta = (text, onFastaChange, alphabet = null) => {
    try {
        const result = fastaToPWM(text, true, true, alphabet);
        onFastaChange(result.ppm, result.fasta);
    } catch (e) {}
};

const WorkspaceFastaEditor = ({ id, onFastaChange, logo }) => (
    <FastaEditor
      height="100%" width="100%"
      text={logo.fasta}
      onChange={text => tryParseFasta(text, onFastaChange, logo.alphabet)}
      id={id} alphabet={logo.alphabet} />
);
export default WorkspaceFastaEditor;
