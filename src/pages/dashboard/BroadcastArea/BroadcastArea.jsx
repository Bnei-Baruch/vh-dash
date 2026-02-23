import React from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import styled from "styled-components";

import Broadcast from "./Broadcast";
import MembershipRequired from "./MembershipRequired";
import { membershipDataV2 } from "../../../redux/selectors/user";

const BroadcastAreaContainer = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BroadcastArea = () => {
  const { t } = useTranslation();

  const membershipData = useSelector(membershipDataV2);

  if (!membershipData?.active) {
    return <MembershipRequired />;
  }

  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />
      <BroadcastAreaContainer>
        <Grid container spacing={0} style={{ height: "100%", margin: 0 }}>
          <Grid item xs={12} sm={12} md={12} style={{ height: "100%", padding: 0 }}>
            <Broadcast />
          </Grid>
        </Grid>
      </BroadcastAreaContainer>
    </>
  );
};

export default BroadcastArea;

