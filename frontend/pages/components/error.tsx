interface ErrorComponentProps {
	onTryAgain: () => void;
}

export const ErrorComponent = ({ onTryAgain }: ErrorComponentProps) => {
	return (
		<>
			Something went wrong... Please{' '}
			<button onClick={onTryAgain}>try again</button>
		</>
	);
};
