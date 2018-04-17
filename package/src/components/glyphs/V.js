import React from 'react';

const _path = `M 0 0 L 20 0 L 50 80 L 80 0
               L 100 0 L 60 100 L 40 100 L 0 0`;

export const V = ({ fill }) => (
    <path fill={fill} d={_path} />
);
