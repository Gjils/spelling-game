import { Component } from "react";

import Word from "../Word/Word";

import "./MainWindow.scss";

export default class MainWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtersActivity: [true, true, false],
			words: [
				{
					word: "аккомпанировать",
					missedIndex: 3,
					missedLetter: "о",
					options: ["о", "а"],
				},
				{
					word: "абaжyp",
					missedIndex: 4,
					missedLetter: "у",
					options: ["у", "ю"],
				},
			],
			answerStatus: {
				answered: false,
				choosen: "",
			},
		};
	}

	chageFiltersActivity = (changedIndex) => {
		this.setState(({ filtersActivity }) => {
			let newFiltersActivity = filtersActivity.map((item, index) =>
				index === changedIndex ? !item : item,
			);
			const activeFiltersCount = newFiltersActivity.filter(
				(item) => item,
			).length;
			if (activeFiltersCount === 0) {
				newFiltersActivity = filtersActivity.map(() => true);
			}
			return {
				filtersActivity: newFiltersActivity,
			};
		});
	};

	showNextWord = (isCorrect) => {
		this.props.updateStats(isCorrect);
		this.setState(({ words, answersCount }) => {
			const currentWord = words[0];
			const newWords = [...words];
			newWords.splice(0, 1);
			if (isCorrect || newWords.length < 15) {
				newWords.push(currentWord);
			} else {
				newWords.splice(15, 0, currentWord);
			}
			return {
				words: newWords,
				answersCount: answersCount + 1,
				answerStatus: { answered: false, choosen: "" },
			};
		});
	};

	setAnswer = (item) => {
		this.setState({
			answerStatus: {
				answered: true,
				choosen: item,
			},
		});
	};

	render() {
		const { name: taskName, number: taskNumber } = this.props.activeTask;
		const { answersCount } = this.props;
		const { filtersActivity, words, answerStatus } = this.state;
		const filtersList = [
			{
				name: "Непроверяемые",
			},
			{
				name: "Проверяемые",
			},
			{
				name: "Чередующиеся",
			},
		];
		return (
			<div className="main-window">
				<div className="main-window__filters-list">
					{filtersList.map(({ name }, index) => (
						<button
							key={index}
							className={`main-window__filters-list__button ${
								filtersActivity[index] ? "active" : ""
							}`}
							onClick={() => {
								this.chageFiltersActivity(index);
							}}
						>
							{name}
						</button>
					))}
				</div>
				<div className="main-window__task-info">
					<div className="main-window__task-info__number">
						Задание {taskNumber}
					</div>
					<div className="main-window__task-info__name ">{taskName}</div>
				</div>
				<Word
					word={words[0]}
					showNextWord={this.showNextWord}
					answerStatus={answerStatus}
					setAnswer={this.setAnswer}
					key={answersCount}
				/>
			</div>
		);
	}
}
