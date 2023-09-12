import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";


const useStyles = makeStyles({
  updateButton: {
    borderRadius: "0.3125rem",
    background: "#3376D6",
  },
  switchMembershipButton: {
    borderRadius: "0.3125rem",
    border: "1px solid #3376D6",
    color: "#3376D6",
  },
  cancelMembershipButton: {
    color: "#3376D6",
  },
});


export default function PaymentAction({ membershipData }) {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const redirectToPayment = () => {
    window
      .open(
        `${window.location.origin}/pay/membership?lang=${i18n.language}`,
        "_blank"
      )
      .focus();
  };

  const updatePaymentDetail = (orderid) => {
    window.location.href = `${window.location.origin}/pay/membership/payment/update/${orderid}?lang=${i18n.language}`;
  };

  const switchMembershipType = () => {
    window.location.href = `${window.location.origin}/pay/membership?lang=${i18n.language}`;
  };

  const cancelMembership = () => {
    window.location.href = `${window.location.origin}/pay/membership/cancellation?lang=${i18n.language}`;
  };

  return (

    <div>
      {!membershipData?.active &&
        _.isEmpty(membershipData?.details?.payment) && (
          // _.isempty(membershipData?.details?.payment) && (
          <Button
            variant="contained"
            color="primary"
            className={classes.primaryButton}
            onClick={redirectToPayment}>
            {t("Membership.activate_membership")}
          </Button>
        )}
      &nbsp;
      {(membershipData?.active ||
        (!membershipData?.active &&
          membershipData?.details?.payment &&
          membershipData?.details?.payment?.status === "failed")) &&
        membershipData?.type !== "helphaver" &&
        _.isEmpty(membershipData?.details?.special) && (
          <Button
            variant="contained"
            color="primary"
            className={classes.updateButton}
            onClick={() =>
              updatePaymentDetail(membershipData?.details?.automatic?.order_id)
            }
          >
            {t("Membership.update_payment_details")}
          </Button>
        )}
      &nbsp;
      {membershipData?.active && membershipData.type === "manual" && (
        <Button
          variant="contained"
          color="primary"
          className={classes.primaryButton}
          onClick={redirectToPayment}>
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
            className={classes.switchMembershipButton}
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
          <Button
            className={classes.cancelMembershipButton}
            onClick={cancelMembership}>
            {t("Membership.cancel_membership")}
          </Button>
        )}
    </div>
  );
}
