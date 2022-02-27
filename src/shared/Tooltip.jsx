import React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  helpIcon: {
    position: "absolute",
    top: -5,
    right: 0,
    color: "#1565C0",
  },
  tooltip: {
    width: 270,
  },
  placement: {
    background: "#fff",
    color: theme.palette.text.primary,
    boxShadow: "0 0 1px 1px #c4c4c4",
    padding: 10,
  },
}));

export const CustomTooltip = ({ tooltipText }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={tooltipText}
      classes={{
        tooltipPlacementBottom: classes.placement,
        tooltip: classes.tooltip,
      }}
    >
      <HelpIcon className={classes.helpIcon} />
    </Tooltip>
  );
};
