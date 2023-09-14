import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Card, Grid, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useSelector } from "react-redux";
import _ from "lodash";
import { keycloakData } from "../../../redux/selectors/user";
import Status from "./Status";
import Notification from "./Notification";
import PaymentAction from "./PaymentAction";
import { getMembershipStatusv2 } from "../../../services/membership.service";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

export const PaymentMethod = styled.div`
  line-height: 1.875rem;
`;
export const SucessfulPayment = styled.div`
  font-size: 1rem;       
  text-align: center;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
  line-height: 1.875rem; 
`;
export const PendingPayment = styled.div`
  font-size: 1rem;
  text-align: center;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
  line-height: 1.875rem; 

`;
export const FailedPayment = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 1.875rem;
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
  margin-left: 12px !important;
  padding-left: 16px !important;
`;

const PaymentContainer = styled(Grid)`
  margin: 0px 10px 10px 12px !important;
  padding-left : 0 !important;
  @media (max-width: 767px) {
    margin: 0px !important;
  }
`;

const DataTablesWithoutBorder = styled(MUIDataTable)`
  * {
    border: none !important;
    max-width:95%;
  }
  .MuiToolbar-root {
    padding-left:16px;
  } 
  .MuiTypography-h6 { /* Target the title element */
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-style: normal;
  font-weight: 400;
}

.MuiTableCell-head { /* Target the table cells (content) */
  font-size: 1rem;
  padding: 5px 0 5px 16px;
  color: #5A5A5A;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; 
}

.MUIDataTableBodyCell-root-117 {
  padding-block: 5px ;
  font-size: 0.875rem;
  color: #000;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; 
}
`;

const CancelIcon = styled(CancelOutlinedIcon)`
  color: red;
  margin-right:4px;
`;

const CheckIcon = styled(CheckCircleOutlineOutlinedIcon)`
  color: green;
  margin-right:4px;
`;

function MembershipStatus() {
  const { t } = useTranslation();
  const [membershipData, setMembershipData] = React.useState(undefined);
  const keycloak = useSelector(keycloakData);

  const columns = [
    {
      name: "created_at",
      label: membershipData?.details?.payment?.status === "success" ? t("common.lastPayment") : t("common.lastAttemptedPayment"),
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
                    "DD-MM-YYYY"
                  )}{" "}
                </FlexContainer>
              )}
              {data.rowData[4] === "success" && (
                <FlexContainer>
                  {" "}
                  <CheckIcon /> {moment(value).format(
                    "DD-MM-YYYY"
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
        customBodyRender: (value, data) => {
          return (
            <>
              {data.rowData[2] === "2" && (
                t("Global.Currency.usd")
              )}
              {data.rowData[2] === "978" && (
                t("Global.Currency.eur")
              )}
            </>
          )
        }
      },
    },
    {
      name: "payment_method",
      label: t("common.paymentMethod"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => <PaymentMethod>{`Card  ${value.slice(-4)}`}</PaymentMethod>
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
                <FailedPayment >
                  <CancelIcon /> {t("common.paymentRefused")}{" "}
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
      label: t("common.approvalStatus"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data) => {
          return (
            <FlexContainer>
              {" "}
              <CheckIcon /> {moment(value).format("DD-MM-YYYY")}{" "}
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

  React.useEffect(() => {
    if (keycloak) {
      const { profile } = keycloak;
      getMembershipStatusv2(profile.email).then(setMembershipData);
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
              {/* expiry message */}
              {membershipData &&
                membershipData.active &&
                membershipData.expiry &&
                membershipData.details.payment.status === "success" &&
                moment(membershipData.expiry).isValid() && (
                  <NotificationGrid item xs={12} md={8} lg={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "20px",
                        margin: "10px 16px",
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
              {/* notification section */}
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
                {!_.isEmpty(membershipData?.details?.payment) && (
                  <DataTablesWithoutBorder
                    title={t("common.details")}
                    data={[membershipData.details.payment]}
                    columns={columns}
                    options={options}
                  />
                )}
                {!_.isEmpty(membershipData?.details?.special) && (
                  <DataTablesWithoutBorder
                    title={t("common.details")}
                    data={[membershipData.details.special]}
                    columns={col_sepcial}
                    options={options}
                  />
                )}
                {!_.isEmpty(membershipData?.details?.help_haver) && (
                  <DataTablesWithoutBorder
                    title={t("common.details")}
                    data={[membershipData.details.help_haver]}
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
