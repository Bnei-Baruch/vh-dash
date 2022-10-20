import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PaymentAction({ membershipData }) {
  const { t, i18n } = useTranslation();

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
      {!membershipData?.active && !membershipData?.details?.payment && (
        <Button variant="contained" color="primary" onClick={redirectToPayment}>
          {t("Membership.activate_membership")}
        </Button>
      )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) && (
        <Button variant="contained" color="primary" onClick={redirectToPayment}>
          {t("Membership.update_payment_details")}
        </Button>
      )}
      &nbsp;
      {membershipData?.active && membershipData.type === "manual" && (
        <Button variant="contained" color="primary">
          {t("Membership.make_new_payment")}
        </Button>
      )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) && (
        <Button variant="outlined" color="primary">
          {t("Membership.switch_membership_type")}
        </Button>
      )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) && (
        <Button>{t("Membership.cancel_membership")}</Button>
      )}
    </div>
  );
}
