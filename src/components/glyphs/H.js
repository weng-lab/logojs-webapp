import React from 'react';

const _path = `M 0 0 L 20 0 L 20 40 L 80 40 L 80 0
               L 100 0 L 100 100 L 80 100 L 80 60
               L 20 60 L 20 100 L 0 100 L 0 0`;

export const H = ({ fill }) => (
    <path fill={fill} d={_path} />
);
