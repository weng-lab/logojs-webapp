import React from 'react';

const _path = `M 100 28 C 100 -13 0 -13 0 50
         C 0 113 100 113 100 72 L 75 72
         C 75 90 30 90 30 50 C 30 10 75 10 75 28
         L 100 28`;

export const C = ({ fill }) => (
    <path fill={fill} d={_path} />
);
