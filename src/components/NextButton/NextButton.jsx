import "./NextButton.scss";

export default function NextButton({ showNextWord, handled }) {
	return (
		<button
			className={`next-button ${handled ? "fadeout" : "fadein"}`}
			onClick={() => {
				showNextWord();
			}}
		>
			Продолжить
		</button>
	);
}
