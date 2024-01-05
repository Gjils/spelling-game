import { Component } from "react";

import "./Settings.scss";

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}
	render() {
		const { collapsed } = this.state;
		const { isDark, toggleTheme, switchColor } = this.props;
		return (
			<>
				<i
					className="fa-solid fa-gear open-settings"
					onClick={() => {
						this.setState(({ collapsed }) => ({
							collapsed: !collapsed,
						}));
					}}
				></i>
				<div className={`settings ${collapsed ? "collapsed" : ""}`}>
					<i
						className="fa-solid fa-xmark settings__close"
						onClick={() => {
							this.setState({ collapsed: true });
						}}
					></i>
					<div className="settings__appearance">
						<div className="settings__appearance__label">Внешний вид:</div>
						<button
							className="settings__appearance__item change-color"
							onClick={switchColor}
						>
							<i className="fa-solid fa-palette"></i>
						</button>
						<button
							className="settings__appearance__item"
							onClick={toggleTheme}
						>
							<i className={`fa-solid fa-${isDark ? "moon" : "sun"}`}></i>
						</button>
					</div>
					<button
						className="settings__clear-data"
						onClick={() => {
							localStorage.clear();
							location.reload();
						}}
					>
						Очистить данные
					</button>
				</div>
			</>
		);
	}
}
