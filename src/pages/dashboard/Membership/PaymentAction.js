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

  const updatePaymentDetail = () => {
    //TODO : Update Payment Detail
  };

  const switchMembershipType = () => {
    //TODO : Switch Membership Type
  };

  const cancelMembership = () => {
    window.location.href = `${window.location.origin}/pay/membership/cancellation`;
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
          membershipData?.details?.payment?.status === "failed")) &&
        membershipData?.type !== "helphaver" && (
          <Button
            variant="contained"
            color="primary"
            onClick={updatePaymentDetail}
          >
            {t("Membership.update_payment_details")}
          </Button>
        )}
      &nbsp;
      {membershipData?.active && membershipData.type === "manual" && (
        <Button variant="contained" color="primary" onClick={redirectToPayment}>
          {t("Membership.make_new_payment")}
        </Button>
      )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) && (
        <Button
          variant="outlined"
          color="primary"
          onClick={switchMembershipType}
        >
          {t("Membership.switch_membership_type")}
        </Button>
      )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) && (
        <Button onClick={cancelMembership}>
          {t("Membership.cancel_membership")}
        </Button>
      )}
    </div>
  );
}
