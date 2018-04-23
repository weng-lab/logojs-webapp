import React from 'react';

const defaultoptions = {
    method: 'GET',
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer'
};

const AJAXGETButton = ({ url, success, error, children, options }) => (
    <a onClick={ () => fetch(url, {...defaultoptions, ...options}).then(success, error) }>
      {children}
    </a>
);
export default AJAXGETButton;
