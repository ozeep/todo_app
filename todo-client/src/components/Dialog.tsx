import React from "react";
import ReactDOM from "react-dom";

interface Dialog {
	header: string;
	children: React.ReactNode;
	onSubmit?(args?: any): void;
	onDecline?(args?: any): void;
}

const Dialog = ({ onSubmit, onDecline, header, children }: Dialog) => {
	const modalRoot: any = document.getElementById("modal");

	return ReactDOM.createPortal(
		<div className="popup">
			<div className="popup__dialog">
				<div className="popup__dialog__header">
					<p>{header}</p>
				</div>
				<div className="popup__dialog__text">{children}</div>
				<div className="popup__dialog__controls">
					<button className="button accept" onClick={onSubmit}>
						Подтвердить
					</button>
					<button className="button cancel" onClick={onDecline}>
						Отменить
					</button>
				</div>
			</div>
		</div>,
		modalRoot
	);
};

export default Dialog;
