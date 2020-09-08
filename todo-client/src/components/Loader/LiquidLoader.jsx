import React from "react";
import "./index.scss";

const LiquidLoader = () => {
	return (
		<div className="loader-wrapper">
			<div className="loader" style={{ "--t": "2s" }}>
				<div className="particle" style={{ "--dt": "-1.53s" }}></div>
				<div className="particle"></div>
				<div className="particle" style={{ "--dt": "-1.27s" }}></div>
				<div className="particle"></div>
				<div className="particle" style={{ "--dt": "-1.63s" }}></div>
				<div className="particle"></div>
				<div className="particle" style={{ "--dt": "-1.56s" }}></div>
				<div className="particle"></div>
				<div className="particle" style={{ "--dt": "-0.92s" }}></div>
			</div>
		</div>
	);
};

export default LiquidLoader;
