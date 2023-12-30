import "./SideMenu.scss";

export default function SideMenu({ tasksList, activeTask, switchActiveTask }) {
	return (
		<div className="side-menu">
			<div className="side-menu__header">Список заданий</div>
			<div className="side-menu__options-list">
				{tasksList.map(({ name, number }, index) => (
					<button
						key={index}
						className={`side-menu__options-list__item ${
							activeTask === index ? "active" : ""
						}`}
						onClick={() => {
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
		</div>
	);
}
