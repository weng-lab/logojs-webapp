import React from 'react';

const _path = `M 0 0 L 20 0 L 50 40 L 80 0 L 100 0 L 70 50
               L 100 100 L 80 100 L 50 60 L 20 100 L 0 100
               L 30 50 L 0 0`;

export const X = ({ fill }) => (
    <path fill={fill} d={_path} />
);
