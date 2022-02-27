import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Divider as MuiDivider, Grid } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useTranslation } from "react-i18next";
import MUIDataTable from "mui-datatables";
import moment from "moment";
export const SucessfulPayment = styled.div`
  color: green;
  font-weight: 800;
`;
export const PendingPayment = styled.div`
  color: orange;
  font-weight: 800;
`;
export const FailedPayment = styled.div`
  color: red;
  font-weight: 800;
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
        // display: false,
      },
    },
    {
      name: "product",
      label: t("common.product"),
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "productType",
      label: t("common.type"),
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
      name: "paymentId",
      label: t("common.paymentId"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "paymentMethod",
      label: t("common.paymentMethod"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "PaymentStatus",
      label: t("common.status"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <>
              {value === "success" && (
                <SucessfulPayment>{t("common.success")} </SucessfulPayment>
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
  return (
    <React.Fragment>
      <Helmet title={t("Membership.paymentHistory")} />
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MUIDataTable
            title={t("Dashboard.PreviousPayment.paymentHistory")}
            data={[]}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PreviousPayments;
