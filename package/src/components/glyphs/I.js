import React from 'react';

const _path = `M 40 0 L 60 0 L 60 100 L 40 100 L 40 0`;

export const I = ({ fill }) => (
    <path fill={fill} d={_path} />
);
