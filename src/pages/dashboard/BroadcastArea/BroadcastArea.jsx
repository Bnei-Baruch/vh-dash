import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";

import Broadcast from "./Broadcast";
import BroadcastQuestions from "./BroadcastQuestions";
import MembershipRequired from "./MembershipRequired";
import { membershipDataV2 } from "../../../redux/selectors/user";

const useStyles = makeStyles((theme) => ({
  rightButton: {
    marginTop: "10px",
  },
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const membershipData = useSelector(membershipDataV2);

  if (!membershipData?.active) {
    return <MembershipRequired />;
  }

  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={12} className={classes.rightButton}>
          <Broadcast />
          <BroadcastQuestions />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <Annoucements /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default BroadcastArea;

