import "./Undercover.scss";

export default function Undercover({ collapsed, setCollapsed }) {
	return (
		<div
			className={`undercover ${collapsed ? "" : "active"}`}
			onClick={() => {
				setCollapsed();
			}}
		></div>
	);
}
