import React from 'react';

const defaultoptions = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    referrer: 'no-referrer'
};

const AJAXPOSTButton = ({ url, success, error, children, options }) => (
    <a onClick={ () => fetch(url, {...defaultoptions, ...options}).then(success).catch(error) }>
      {children}
    </a>
);
export default AJAXPOSTButton;
