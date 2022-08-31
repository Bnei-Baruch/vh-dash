import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PaymentAction() {
  const { i18n } = useTranslation();
  const redirectToPayment = () => {
    window
      .open(
        `${window.location.origin}/pay/order/1?lang=${i18n.language}`,
        "_blank"
      )
      .focus();
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={redirectToPayment}>
        Primary Button
      </Button>{" "}
      &nbsp;
      <Button variant="outlined" color="primary">
        Secondary Button
      </Button>
    </div>
  );
}
