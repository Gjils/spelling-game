import "./NextButton.scss";

export default function NextButton({ showNextWord }) {
	return (
		<button
			className="next-button"
			onClick={() => {
				showNextWord();
			}}
		>
			Продолжить
		</button>
	);
}
