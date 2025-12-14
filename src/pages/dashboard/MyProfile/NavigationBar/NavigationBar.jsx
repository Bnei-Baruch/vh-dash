import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel.jsx";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ModalWindow from "../ui/ModalWindow.jsx";
import { updateModifyEnabled } from "../../../../redux/actions/profileActions.js";

const a11yProps = (index, classes) => ({
  id: `scrollable-auto-tab-${index}`,
  "aria-controls": `scrollable-auto-tabpanel-${index}`,
  classes: { selected: `${classes}` },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f9fafc",
    "& .MuiTab-root": {
      "@media (min-width: 600px) and (max-width: 1100px)": {
        minWidth: "100px",
      },
    },
  },
  selectedTab: {
    backgroundColor: theme.palette.background.paper,
    "&.Mui-selected": {
      color: "#000000",
    },
  },
  tabElement: {
    fontSize: "17px",
  },
  tabPanel: {
    margin: theme.spacing(0, -2.5),
  },
  mainTab: {
    backgroundColor: "#fff",
  },
}));

const NavigationBar = ({ tabs }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { href, search } = window.location;
  const isEdit = useSelector((state) => state.profileReducer.modify);
  const handleChange = (event, newValue) => {
    if (isEdit) {
      setSelectedOption(newValue);
      setShowEditModal(true);
      return;
    }
    setValue(newValue);
  };

  useEffect(() => {
    const myPlan = search.includes("my-plan");

    if (myPlan) {
      const url = new URL(href);

      setValue(1);

      // Delete the my-plan parameter.
      url.searchParams.delete("my-plan");
      history.push(url);
    }
  }, [search, href, history]);

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((item) => (
          <Tab
            key={item.id}
            label={item.tab}
            className={classes.tabElement}
            {...a11yProps(item.id, classes.selectedTab)}
          />
        ))}
      </Tabs>
      {tabs.map((item) => (
        <TabPanel
          key={item.id}
          value={value}
          index={item.id}
          className={classes.tabPanel}
        >
          {item.component}
        </TabPanel>
      ))}
      <ModalWindow
        open={showEditModal}
        contentText={t("UserMenu.unsaved_changes")}
        confirmBtnText={t("UserMenu.okbtn")}
        closeBtnText={t("UserMenu.okbtn")}
        handleClose={() => {
          setSelectedOption(null);
          setShowEditModal(false);
        }}
        onConfirmation={() => {
          setValue(selectedOption);
          setShowEditModal(false);
          dispatch(updateModifyEnabled(false));
        }}
      />
    </div>
  );
};

NavigationBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tab: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default NavigationBar;
