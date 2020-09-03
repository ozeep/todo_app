import React from "react";
import { connect, useDispatch } from "react-redux";
import { Icon } from "@material-ui/core";
import { AlertsState, Alert } from "../redux/types";
import { deleteAlert } from "../redux/actions/alerts";

interface AlertContainer {
  alerts: Alert[];
}

const AlertContainer = ({ alerts }: AlertContainer) => {
  const dispatch = useDispatch();

  return (
    <div className="alert_container">
      {alerts.map((alert) => (
        <div className="alert">
          <div className="alert__header">
            <p className="alert__header__title">Ошибка</p>
            <Icon onClick={() => dispatch(deleteAlert(alert.alertId))}>
              close
            </Icon>
          </div>
          <div className="alert__content">
            <Icon>highlight_off</Icon>
            <p className="alert__content__message">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(({ alerts }: AlertsState) => ({
  alerts,
}))(AlertContainer);
