import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import {useTranslation} from "react-i18next";
import {isEmpty} from "lodash";


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


export default function PaymentAction({membershipData}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const redirectToPayment = () => {
        window
            .open(
                `${window.location.origin}/pay/membership?lang=${i18n.language}`,
                "_blank"
            )
            .focus();
    };

    const updatePaymentDetail = () => {
        const orderId = membershipData?.details?.automatic?.order_id
        window.location.href = `${window.location.origin}/pay/membership/payment/update/${orderId}?lang=${i18n.language}`;
    };

    const switchMembershipType = () => {
        window.location.href = `${window.location.origin}/pay/membership?lang=${i18n.language}`;
    };

    const cancelMembership = () => {
        window.location.href = `${window.location.origin}/pay/membership/cancellation?lang=${i18n.language}`;
    };

    const showActivate = !membershipData?.active && isEmpty(membershipData?.details?.payment);

    const showUpdatePayment = (membershipData?.active && membershipData?.type === "automatic") ||
        (!membershipData?.active &&
            membershipData?.type !== "helphaver" &&
            isEmpty(membershipData?.details?.special) &&
            membershipData?.details?.payment?.status === "failed");

    const showNewPayment = membershipData?.active && membershipData.type === "manual";

    const showSwitchCancel = membershipData?.active || membershipData?.details?.payment?.status === "failed";

    return (
        <div>
            {showActivate && (
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.primaryButton}
                    onClick={redirectToPayment}>
                    {t("Membership.activate_membership")}
                </Button>
            )}
            &nbsp;
            {showUpdatePayment && (
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.updateButton}
                    onClick={updatePaymentDetail}>
                    {t("Membership.update_payment_details")}
                </Button>
            )}
            &nbsp;
            {showNewPayment && (
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.primaryButton}
                    onClick={redirectToPayment}>
                    {t("Membership.make_new_payment")}
                </Button>
            )}
            &nbsp;
            {showSwitchCancel && (
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.switchMembershipButton}
                    onClick={switchMembershipType}>
                    {t("Membership.switch_membership_type")}
                </Button>
            )}
            &nbsp;
            {showSwitchCancel && (
                <Button
                    className={classes.cancelMembershipButton}
                    onClick={cancelMembership}>
                    {t("Membership.cancel_membership")}
                </Button>
            )}
        </div>
    );
}
