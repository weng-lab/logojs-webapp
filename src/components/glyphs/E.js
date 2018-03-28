import React from 'react';

const _path = `M 0 0 L 100 0 L 100 20 L 20 20 L 20 40
               L 90 40 L 90 60 L 20 60 L 20 80 L 100 80
               L 100 100 L 0 100 L 0 0`;

export const E = ({ fill }) => (
    <path fill={fill} d={_path} />
);
