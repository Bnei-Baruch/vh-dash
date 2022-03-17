import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const TabPanel = ({ children, value, index, ...props }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
    aria-labelledby={`scrollable-auto-tab-${index}`}
    {...props}
  >
    {value === index && (
      <Box p={3}>
        <div>{children}</div>
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
