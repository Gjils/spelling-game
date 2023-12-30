import "./LetterOptions.scss";

export default function LetterOptions({
	options,
	setAnswer,
	showNextWord,
	missedLetter,
}) {
	return options.map((item, index) => (
		<button
			key={index}
			className="option"
			onClick={() => {
				setAnswer(item);
				if (item === missedLetter) {
					showNextWord(true);
				}
			}}
		>
			{item}
		</button>
	));
}
