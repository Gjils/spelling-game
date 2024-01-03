import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import "normalize.css";
import "./index.scss";
import "./animations.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
