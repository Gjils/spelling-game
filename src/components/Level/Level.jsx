import { Component } from "react";

import "./Level.scss";

export default class Level extends Component {
	countLevel = () => {
		const { points, streak } = this.props.stats;
		let currentPoints = points,
			currentCap = 100,
			currentLevel = 1,
			increased = false;
		while (currentCap <= currentPoints) {
			currentLevel += 1;
			currentPoints -= currentCap;
			currentCap += 10;
		}
		if (currentPoints - 10 * Math.ceil(this.props.stats.streak / 10) < 0) {
			increased = true;
		}
		return {
			progress: Math.floor((currentPoints / currentCap) * 100),
			level: currentLevel,
			xp: currentPoints,
			cap: currentCap,
			multiplier: Math.ceil(streak / 10),
			increased: increased,
		};
	};
	render() {
		const { handled, correct } = this.props.answerStatus;
		const { progress, level, xp, cap, multiplier, increased } =
			this.countLevel();
		return (
			<div className="level">
				<div className="level__bar ">
					<div
						key={level}
						className={`level__bar__progress ${
							correct === false ? "bar-shaking" : ""
						}`}
						style={{
							width: progress + "%",
						}}
					></div>
				</div>
				<div className="level__label">
					{multiplier > 1 ? (
						<>
							<span className="multiplier">{`x${multiplier}`}</span> |{" "}
						</>
					) : (
						""
					)}
					<span
						className={handled && this.props.stats.streak ? "increased" : ""}
					>
						{xp}
					</span>
					/{cap} | Уровень{" "}
					<span className={handled && increased ? "increased" : ""}>
						{level}
					</span>
				</div>
			</div>
		);
	}
}
