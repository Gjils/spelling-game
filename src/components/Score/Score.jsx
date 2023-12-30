import "./Score.scss";

export default function Score({ stats }) {
	const { correct, common } = stats;
	return (
		<div className="score">
			<div className="score__label">Счет:</div>
			<div className="score__common">
				{correct}/{common}
			</div>
			<div className="score__accuracy">
				{Math.floor((correct / (common ? common : 1)) * 100)}%
			</div>
		</div>
	);
}
