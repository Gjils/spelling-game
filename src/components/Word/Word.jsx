import { Component } from "react";

import LetterOptions from "../LetterOptions/LetterOptions";
import NextButton from "../NextButton/NextButton";

import "./Word.scss";

export default class Word extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { word, missedLetter, missedIndex, options } = this.props.word;
		const { setAnswer, showNextWord } = this.props;
		const { answered, choosen, handled } = this.props.answerStatus;

		let optionsContent = "";
		if (!answered) {
			optionsContent = (
				<LetterOptions
					setAnswer={setAnswer}
					options={options}
					missedLetter={missedLetter}
					showNextWord={showNextWord}
				/>
			);
		}
		if (answered && missedLetter !== choosen) {
			optionsContent = <NextButton showNextWord={showNextWord} handled={handled} />;
		}
		console.log(handled)
		return (
			<>
				<div className={`word ${handled ? "fadeout" : ""}`}>
					{word.split("").map((item, index) => (
						<div
							key={index}
							className={`word__letter ${
								missedIndex === index && answered ? "missed" : ""
							}`}
						>
							{index === missedIndex && !answered ? "_" : item}
						</div>
					))}
				</div>
				<div className="options">{optionsContent}</div>
			</>
		);
	}
}
