import { Component } from "react";

import Undercover from "../Undercover/Undercover";

import "./SideMenu.scss";

export default class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}
	render() {
		const { tasksList, activeTask, switchActiveTask } = this.props;
		const { collapsed } = this.state;
		return (
			<>
				<Undercover
					collapsed={collapsed}
					setCollapsed={() => {
						this.setState({ collapsed: true });
					}}
				/>
				<button
					className="open-side-menu"
					onClick={() => {
						this.setState({ collapsed: false });
					}}
				>
					<img src="bars.svg" alt="bars" />
				</button>
				<div className={`side-menu ${collapsed ? "collapsed" : ""}`}>
					<div className="side-menu__header">Список заданий</div>
					<div className="side-menu__options-list">
						{tasksList.map(({ name, number }, index) => (
							<button
								key={index}
								className={`side-menu__options-list__item ${
									activeTask === index ? "active" : ""
								}`}
								onClick={() => {
									this.setState({ collapsed: true });
									switchActiveTask(index);
								}}
							>
								<div className="side-menu__options-list__item__task-number task-number">
									Задание {number}
								</div>
								<div className="side-menu__options-list__item__task-name task-name">
									{name}
								</div>
							</button>
						))}
					</div>
					{/* <div className="side-menu__close-button">Закрыть</div> */}
				</div>
			</>
		);
	}
}
