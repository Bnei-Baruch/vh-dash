import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Divider as MuiDivider, Grid } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useTranslation } from "react-i18next";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { getUserPreviousPayments2 } from "../../../services/payments.service";
import { useSelector } from "react-redux";
import { keycloakData } from "../../../redux/selectors/user";
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
const Divider = styled(MuiDivider)(spacing);

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
      name: "type",
      label: t("common.type"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "product_type",
      label: t("common.product"),
      options: {
        filter: true,
        sort: false,
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
      name: "payment_id",
      label: t("common.paymentId"),
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
  };

  const [payments, setPayments] = React.useState([]);
  const keycloak = useSelector(keycloakData);
  React.useEffect(() => {
    if (keycloak) {
      const { profile } = keycloak;
      getUserPreviousPayments2(profile.email).then((res) => {
        if (res && res.length > 0) {
          setPayments(res.filter((item) => item.payment_status === "success"));
        }
      });
    }
  }, [keycloak]);
  return (
    <React.Fragment>
      <Helmet title={t("Membership.paymentHistory")} />
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MUIDataTable
            title={t("Dashboard.PreviousPayment.paymentHistory")}
            data={payments}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PreviousPayments;
