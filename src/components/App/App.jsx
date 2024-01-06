import { Component } from "react";

import SideMenu from "../SideMenu/SideMenu";
import MainWindow from "../MainWindow/MainWindow";
import Score from "../Score/Score";
import Loading from "../Loading/Loading";
import OrientationCheck from "../OrientationCheck/OrientationCheck";
import Settings from "../Settings/Settings";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: {
				loaded: false,
			},
			colors: {
				list: ["pink", "green", "beige"],
			},
		};
		if (localStorage.getItem("isDark") !== null) {
			this.state.isDark = localStorage.getItem("isDark") === "true";
		} else {
			if (
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			) {
				this.state.isDark = true;
			} else {
				this.state.isDark = false;
			}
		}
		if (localStorage.getItem("activeColor")) {
			this.state.colors.active = +localStorage.getItem("activeColor");
		} else {
			this.state.colors.active = 0;
		}
		if (localStorage.getItem("activeTask")) {
			this.state.activeTask = +localStorage.getItem("activeTask");
		} else {
			this.state.activeTask = 0;
		}
		if (JSON.parse(localStorage.getItem("stats")) !== null && this.state.activeTask in JSON.parse(localStorage.getItem("stats"))) {
			this.state.stats = JSON.parse(localStorage.getItem("stats"))[
				this.state.activeTask
			];
		} else {
			this.state.stats = {
				correct: 0,
				common: 0,
				streak: 0,
				points: 0,
			};
		}
	}

	updateStats = (isCorrect) => {
		this.setState(({ stats }) => {
			const newStats = { ...stats };
			if (isCorrect) {
				newStats.correct += 1;
				newStats.streak += 1;
			} else {
				newStats.streak = 0;
			}
			newStats.common += 1;
			newStats.points += 10 * Math.ceil(newStats.streak / 10);
			localStorage.setItem(
				"stats",
				JSON.stringify({
					[this.state.activeTask]: newStats,
				}),
			);
			return { stats: newStats };
		});
	};

	switchActiveTask = (index) => {
		localStorage.setItem("activeTask", index);
		let newStats;
		if (JSON.parse(localStorage.getItem("stats"))[index]) {
			newStats = JSON.parse(localStorage.getItem("stats"))[index];
		} else {
			newStats = {
				correct: 0,
				common: 0,
				streak: 0,
				points: 0,
			};
		}
		this.setState({
			activeTask: index,
			stats: newStats,
		});
	};

	setTheme = () => {
		if (this.state.isDark) {
			document.body.classList.remove("light");
			document.body.classList.add("dark");
			localStorage.setItem("isDark", true);
		} else {
			document.body.classList.remove("dark");
			document.body.classList.add("light");
			localStorage.setItem("isDark", false);
		}
	};
	setColor = () => {
		this.state.colors.list.forEach((item, index) => {
			if (index !== this.state.colors.active) {
				document.body.classList.remove(item);
			} else {
				document.body.classList.add(item);
				localStorage.setItem("activeColor", index);
			}
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
		this.setTheme();
		this.setColor();
		const { activeTask, tasks, stats, isDark } = this.state;
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
						stats={stats}
					/>
					<Score stats={stats} />
				</>
			);
		} else if (tasks.loaded && tasks.error) {
			appContainer = <div>Извините, произошла ошибка</div>;
		} else {
			appContainer = <Loading />;
		}
		return (
			<>
				<OrientationCheck />
				{appContainer}
				<Settings
					isDark={isDark}
					toggleTheme={() => {
						this.setState(({ isDark }) => ({ isDark: !isDark }));
					}}
					switchColor={() => {
						this.setState(({ colors }) => ({
							colors: {
								list: colors.list,
								active: (colors.active + 1) % colors.list.length,
							},
						}));
					}}
				/>
			</>
		);
	}
}
