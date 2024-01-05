import { Component } from "react";

import Undercover from "../Undercover/Undercover";

import "./FiltersList.scss";

export default class FiltersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}
	render() {
		const { collapsed } = this.state;
		const { filters, changeFiltersActivity } = this.props;
		let filtersContainer = <></>;
		if (filters.loaded && !filters.error) {
			filtersContainer = (
				<>
					<Undercover
						collapsed={collapsed}
						setCollapsed={() => {
							this.setState({ collapsed: true });
						}}
					/>
					<button
						className={`open-button ${collapsed ? "" : "active"}`}
						onClick={() => {
							this.setState({ collapsed: false });
						}}
					>
						Фильтры
					</button>
					<div className={`filters-list ${collapsed ? "collapsed" : ""}`}>
						{filters.data.map(({ name, active }, index) => (
							<button
								key={index}
								className={`filters-list__button ${active ? "active" : ""}`}
								onClick={() => {
									changeFiltersActivity(index);
								}}
							>
								{name}
							</button>
						))}
					</div>
				</>
			);
		}
		return filtersContainer;
	}
}
