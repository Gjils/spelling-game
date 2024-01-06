import { Component } from "react";

import Word from "../Word/Word";
import Loading from "../Loading/Loading";
import FiltersList from "../FiltersList/FiltersList";
import Level from "../Level/Level";

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
				chosen: "",
				handled: false,
			},
		};
	}
	shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex > 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};

	changeFiltersActivity = (changedIndex) => {
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
		this.setState((state) => ({
			answerStatus: { ...state.answerStatus, handled: true },
		}));
		setTimeout(() => {
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
					answerStatus: {
						answered: false,
						chosen: "",
						handled: false,
						correct: null,
					},
				};
			});
		}, 400);
	};

	setAnswer = (item, isCorrect) => {
		this.props.updateStats(isCorrect);
		this.setState({
			answerStatus: {
				answered: true,
				chosen: item,
				correct: isCorrect,
			},
		});
	};

	componentDidMount() {
		fetch(`data/task-${this.props.activeTask.number}/words.json`)
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					words: {
						loaded: true,
						data: this.shuffle(data),
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
		fetch(`data/task-${this.props.activeTask.number}/filters.json`)
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
		const { answersCount, stats } = this.props;
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
				wordContainer = (
					<>
						<div className="main-window__error-message">
							Слов по таким фильтрам нет
						</div>
					</>
				);
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
			wordContainer = (
				<>
					<div className="main-window__error-message">
						Извините, произошла ошибка
					</div>
				</>
			);
		} else {
			wordContainer = (
				<>
					<Loading />
				</>
			);
		}

		return (
			<div className="main-window">
				<Level stats={stats} answerStatus={answerStatus} />
				<FiltersList
					filters={filters}
					changeFiltersActivity={this.changeFiltersActivity}
				></FiltersList>
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
