const Card = (props) => {
	return (
		<div
			className={`overflow-x-auto border-solid border-gray-200 border rounded p-4 ${props.className}`}
		>
			{props.children}
		</div>
	);
};

export default Card;
