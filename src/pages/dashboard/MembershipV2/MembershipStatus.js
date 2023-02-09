import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Card, Grid, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useSelector } from "react-redux";
import { keycloakData } from "../../../redux/selectors/user";
import Status from "./Status";
import Notification from "./Notification";
import PaymentAction from "./PaymentAction";
import { getMembershipStatusv2 } from "../../../services/membership.service";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
export const SucessfulPayment = styled.div`
  text-align: center;
  border-radius: 5px;
  font-weight: 800;
  padding: 2px;
  display: flex;
  align-items: center;
`;
export const PendingPayment = styled.div`
  font-weight: 800;
  text-align: center;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
`;
export const FailedPayment = styled.div`
  font-weight: 800;
  text-align: center;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NotificationGrid = styled(Grid)``;
const ActionContainer = styled(Grid)`
  margin: 0px 20px !important;
`;

const PaymentContainer = styled(Grid)`
  margin: 0px 10px 10px 10px !important;

  @media (max-width: 767px) {
    margin: 0px !important;
  }
`;

const DataTablesWithoutBorder = styled(MUIDataTable)`
  * {
    border: none !important;
  }
`;

const CancelIcon = styled(CancelOutlinedIcon)`
  color: red;
`;

const CheckIcon = styled(CheckCircleOutlineOutlinedIcon)`
  color: green;
`;
function MembershipStatus() {
  const { t } = useTranslation();
  const columns = [
    {
      name: "created_at",
      label: t("common.date"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data) => {
          return (
            <>
              {data.rowData[4] === "failed" && (
                <FlexContainer>
                  {" "}
                  <CancelIcon /> {moment(value).format(
                    "DD-MM-YYYY HH:MM:SS"
                  )}{" "}
                </FlexContainer>
              )}
              {data.rowData[4] === "success" && (
                <FlexContainer>
                  {" "}
                  <CheckIcon /> {moment(value).format(
                    "DD-MM-YYYY HH:MM:SS"
                  )}{" "}
                </FlexContainer>
              )}
            </>
          );
        },
      },
    },
    {
      name: "amount",
      label: t("common.amount"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "currency",
      label: t("common.currency"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => <>{value?.toUpperCase()}</>,
      },
    },
    {
      name: "payment_method",
      label: t("common.paymentMethod"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: t("common.status"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, row) => {
          return (
            <>
              {value === "success" && (
                <SucessfulPayment>
                  <CheckIcon /> {t("common.successful")}
                </SucessfulPayment>
              )}
              {value === "pending" && (
                <PendingPayment>{t("common.pending")} </PendingPayment>
              )}
              {value === "failed" && (
                <FailedPayment>
                  <CancelIcon /> {t("common.failed")}{" "}
                </FailedPayment>
              )}
            </>
          );
        },
      },
    },
  ];

  const col_sepcial = [
    {
      name: "approved_by",
      label: t("Membership.approval_by"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type",
      label: t("common.type"),
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const col_helphaver = [
    {
      name: "created_at",
      label: t("common.date"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data) => {
          return (
            <FlexContainer>
              {" "}
              <CheckIcon /> {moment(value).format("DD-MM-YYYY HH:MM:SS")}{" "}
            </FlexContainer>
          );
        },
      },
    },
    {
      name: "nb_month",
      label: t("common.month"),
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const options = {
    selectableRows: false,
    download: false,
    print: false,
    pagination: false,
    responsive: "scroll",
    filter: false,
    search: false,
    viewColumns: false,
  };
  const [membershipData, setMembershipData] = React.useState(undefined);
  const keycloak = useSelector(keycloakData);
  console.log(membershipData);
  React.useEffect(() => {
    if (keycloak) {
      const { profile } = keycloak;
      getMembershipStatusv2(profile.email).then((res) =>
        setMembershipData(res)
      );
    }
  }, [keycloak]);
  return (
    <React.Fragment>
      <Helmet title={t("Membership.paymentHistory")} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Status membershipDetails={membershipData} />
              </Grid>
              {membershipData &&
                membershipData.active &&
                membershipData.expiry &&
                moment(membershipData.expiry).isValid() && (
                  <NotificationGrid item xs={12} md={8} lg={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "20px",
                        margin: "10px 20px",
                        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%)",
                      }}
                    >
                      <Typography variant="p">
                        {t("Membership.membership_active_until")}{" "}
                        {moment(membershipData.expiry).format("DD/MM/YYYY")}
                      </Typography>
                    </Paper>
                  </NotificationGrid>
                )}
              {membershipData &&
                membershipData.notifications &&
                membershipData.notifications.length > 0 && (
                  <NotificationGrid item xs={12} md={10}>
                    <Notification
                      membershipData={membershipData}
                      status={"pending"}
                    />
                  </NotificationGrid>
                )}
              <ActionContainer item xs={12}>
                <PaymentAction membershipData={membershipData} />
              </ActionContainer>
              <PaymentContainer item xs={12}>
                {membershipData &&
                  membershipData.details &&
                  membershipData.details.payment && (
                    <DataTablesWithoutBorder
                      title={t("common.details")}
                      data={[membershipData.details.payment]}
                      columns={columns}
                      options={options}
                    />
                  )}
                {membershipData &&
                  membershipData.details &&
                  membershipData.details.special && (
                    <DataTablesWithoutBorder
                      title={t("common.details")}
                      data={[membershipData.details.special]}
                      columns={col_sepcial}
                      options={options}
                    />
                  )}

                {membershipData &&
                  membershipData.details &&
                  membershipData.details.helphaver && (
                    <DataTablesWithoutBorder
                      title={t("common.details")}
                      data={[membershipData.details.helphaver]}
                      columns={col_helphaver}
                      options={options}
                    />
                  )}
              </PaymentContainer>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MembershipStatus;
