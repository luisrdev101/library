import React from 'react';

const Button = (props) => {
	return (
		<button
			className="bg-gray-50 hover:bg-gray-100 border border-solid font-bold py-1 px-2 text-gray-700 rounded uppercase text-xs"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
