import { Component } from "react";

import SideMenu from "../SideMenu/SideMenu";
import MainWindow from "../MainWindow/MainWindow";
import Score from "../Score/Score";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTask: 0,
			tasks: {
				loaded: false,
			},
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
			return { stats: newStats };
		});
	};

	switchActiveTask = (index) => {
		this.setState({
			activeTask: index,
		});
	};

	componentDidMount() {
		fetch("data/tasks-list.json")
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					tasks: {
						loaded: true,
						data: data,
					},
				});
			})
			.catch((error) => {
				this.setState({
					tasks: {
						loaded: true,
						error,
					},
				});
			});
	}

	render() {
		const { activeTask, tasks, stats } = this.state;
		let appContainer;
		if (tasks.loaded && !tasks.error) {
			appContainer = (
				<>
					<SideMenu
						tasksList={tasks.data}
						activeTask={activeTask}
						switchActiveTask={this.switchActiveTask}
					/>
					<MainWindow
						key={activeTask}
						activeTask={tasks.data[activeTask]}
						updateStats={this.updateStats}
						answersCount={stats.common}
					/>
					<Score stats={stats} />
				</>
			);
		} else if (tasks.loaded && tasks.error) {
			appContainer = <div>Извините, произошла ошибка</div>;
		} else {
			appContainer = <div>Загрузка</div>;
		}
		return <>{appContainer}</>;
	}
}
