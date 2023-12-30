import { Component } from "react";

import SideMenu from "../SideMenu/SideMenu";
import MainWindow from "../MainWindow/MainWindow";
import Score from "../Score/Score";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTask: 0,
			stats: {
				correct: 0,
				common: 0,
			},
		};
	}

	updateStats = (isCorrect) => {
		this.setState(({ stats }) => {
			const newStats = { ...stats };
			if (isCorrect) {
				newStats.correct += 1;
			}
			newStats.common += 1;
			console.log(newStats);
			return {stats: newStats};
		});
	};

	switchActiveTask = (index) => {
		this.setState({
			activeTask: index,
		});
	};
	render() {
		const { activeTask, stats } = this.state;
		const tasksList = [
			{
				name: "Правописание корней",
				number: 9,
			},
			{
				name: "Правописание приставок",
				number: 10,
			},
			{
				name: "Правописание суффикосов",
				number: 11,
			},
			{
				name: "Правописание глаголов",
				number: 12,
			},
		];
		return (
			<>
				<SideMenu
					tasksList={tasksList}
					activeTask={activeTask}
					switchActiveTask={this.switchActiveTask}
				/>
				<MainWindow
					activeTask={tasksList[activeTask]}
					updateStats={this.updateStats}
					answersCount={stats.common}
				/>
				<Score stats={stats} />
			</>
		);
	}
}
