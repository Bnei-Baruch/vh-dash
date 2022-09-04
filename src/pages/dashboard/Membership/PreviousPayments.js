import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Card, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { getUserPreviousPayments } from "../../../services/payments.service";
import { useSelector } from "react-redux";
import { keycloakData } from "../../../redux/selectors/user";
import Status from "./Status";
import Notification from "./Notification";
import PaymentAction from "./PaymentAction";
export const SucessfulPayment = styled.div`
  background-color: green;
  text-align: center;
  border-radius: 5px;
  font-weight: 800;
  color: #fff;
  padding: 2px;
`;
export const PendingPayment = styled.div`
  background-color: orange;
  font-weight: 800;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  padding: 2px;
`;
export const FailedPayment = styled.div`
  background-color: red;
  font-weight: 800;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  padding: 2px;
`;
const NotificationGrid = styled(Grid)``;
const ActionContainer = styled(Grid)`
  margin: 0px 30px !important;
`;

const PaymentContainer = styled(Grid)`
  margin: 0px 30px !important;

  @media (max-width: 767px) {
    margin: 0px !important;
  }
`;
function PreviousPayments() {
  const { t } = useTranslation();
  const columns = [
    {
      name: "created_at",
      label: t("common.date"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <>{moment(value).format("DD-MM-YYYY HH:MM:SS")} </>
        ),
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
      },
    },
    {
      name: "cc_number",
      label: t("common.paymentMethod"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "payment_status",
      label: t("common.status"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, row) => {
          return (
            <>
              {value === "success" && (
                <SucessfulPayment>{t("common.paid")} </SucessfulPayment>
              )}
              {value === "pending" && (
                <PendingPayment>{t("common.pending")} </PendingPayment>
              )}
              {value === "failed" && (
                <FailedPayment>{t("common.failed")} </FailedPayment>
              )}
            </>
          );
        },
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

  const [payments, setPayments] = React.useState([]);
  const keycloak = useSelector(keycloakData);
  React.useEffect(() => {
    if (keycloak) {
      const { profile } = keycloak;
      getUserPreviousPayments(profile.email).then((res) => {
        if (res && res.length > 0) {
          setPayments(res.filter((item) => item.payment_status === "success"));
        }
      });
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
                <Status />
              </Grid>
              <NotificationGrid item xs={12}>
                <Notification status={"pending"} />
              </NotificationGrid>
              <ActionContainer item xs={12}>
                <PaymentAction />
              </ActionContainer>
              <PaymentContainer item xs={12}>
                <MUIDataTable
                  title={t("common.details")}
                  data={payments}
                  columns={columns}
                  options={options}
                />
              </PaymentContainer>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PreviousPayments;
