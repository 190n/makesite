import React from 'react';

export default function Greeting({ name }) {
	return React.createElement('h1', { children: ['Hello, ', name, '!']});
}
