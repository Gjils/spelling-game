import { Component } from "react";

import Word from "../Word/Word";

import "./MainWindow.scss";

export default class MainWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			words: {
				loaded: false,
			},
			filters: {
				loaded: false,
			},
			answerStatus: {
				answered: false,
				choosen: "",
			},
		};
	}

	chageFiltersActivity = (changedIndex) => {
		this.setState(({ filters }) => {
			let newFilters = filters.data.map((item, index) =>
				index === changedIndex ? { ...item, active: !item.active } : item,
			);
			const activeFiltersCount = newFilters.filter(
				(item) => item.active,
			).length;
			if (activeFiltersCount === 0) {
				newFilters = filters.data.map((item) => ({ ...item, active: true }));
			}
			return {
				filters: {
					loaded: true,
					data: newFilters,
				},
			};
		});
	};

	showNextWord = (isCorrect) => {
		this.props.updateStats(isCorrect);
		this.setState(({ words, answersCount }) => {
			const currentWord = words.data[0];
			const newWords = [...words.data];
			newWords.splice(0, 1);
			if (isCorrect || newWords.length < 15) {
				newWords.push(currentWord);
			} else {
				newWords.splice(15, 0, currentWord);
			}
			return {
				words: {
					loaded: true,
					data: newWords,
				},
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

	componentDidMount() {
		fetch(`/data/task-${this.props.activeTask.number}/words.json`)
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					words: {
						loaded: true,
						data: data,
					},
				});
			})
			.catch((error) => {
				this.setState({
					words: {
						loaded: true,
						error,
					},
				});
			});
		fetch(`/data/task-${this.props.activeTask.number}/filters.json`)
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					filters: {
						loaded: true,
						data: data.map((item) => ({ ...item, active: true })),
					},
				});
			})
			.catch((error) => {
				this.setState({
					filters: {
						loaded: true,
						error,
					},
				});
			});
	}

	render() {
		const { name: taskName, number: taskNumber } = this.props.activeTask;
		const { answersCount } = this.props;
		const { words, filters, answerStatus } = this.state;
		let wordContainer;
		if (words.loaded && !words.error && filters.loaded && !filters.error) {
			let visibleWords = [...words.data];
			filters.data.forEach((filter) => {
				if (!filter.active) {
					visibleWords = visibleWords.filter(
						(word) => !word.type.includes(filter.name),
					);
				}
			});
			if (visibleWords.length === 0) {
				wordContainer = <div>Извините, слов по таким фильтрам нет</div>;
			} else {
				wordContainer = (
					<Word
						word={visibleWords[0]}
						showNextWord={this.showNextWord}
						answerStatus={answerStatus}
						setAnswer={this.setAnswer}
						key={answersCount}
					/>
				);
			}
		} else if (words.loaded && words.error) {
			console.log(words.error);
			wordContainer = <div>Извините, произошла ошибка</div>;
		} else {
			wordContainer = <div>Загрузка</div>;
		}

		let filtersContainer = <></>;
		if (filters.loaded && !filters.error) {
			filtersContainer = (
				<div className="main-window__filters-list">
					{filters.data.map(({ name, active }, index) => (
						<button
							key={index}
							className={`main-window__filters-list__button ${
								active ? "active" : ""
							}`}
							onClick={() => {
								this.chageFiltersActivity(index);
							}}
						>
							{name}
						</button>
					))}
				</div>
			);
		}
		return (
			<div className="main-window">
				{filtersContainer}
				<div className="main-window__task-info">
					<div className="main-window__task-info__number">
						Задание {taskNumber}
					</div>
					<div className="main-window__task-info__name ">{taskName}</div>
				</div>
				{wordContainer}
			</div>
		);
	}
}
