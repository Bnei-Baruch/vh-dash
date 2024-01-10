import {makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";
import {useTranslation} from "react-i18next";
import {isEmpty} from "lodash";
import moment from "moment/moment";

const useStyles = makeStyles({
    default: {
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
    },
    error: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    mb_expiration_notice: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    mb_has_expired_notice: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    hh_request_refused: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    mb_new: {
        backgroundColor: "#FFF",
        margin: "10px 20px",
        padding: "20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#3376D6",
        },
    },
    mb_cancelled: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    mb_problem_previous_payment: {
        backgroundColor: "#FEF2EF",
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#FF0000",
        },
    },
    success: {
        backgroundColor: "#F3FFE9",
        margin: "10px 20px",
        padding: "20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#003728",
        },
    },
    hh_request_received: {
        backgroundColor: "#FFFAE9",
        margin: "10px 20px",
        padding: "20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#836109",
        },
    },
    hh_request_approved: {
        backgroundColor: "#F3FFE9",
        margin: "10px 20px",
        padding: "20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: "#003728",
        },
    },
});
export default function Notification({membershipData}) {
    const classes = useStyles();
    const {t} = useTranslation();

    const isManual = membershipData.type === "manual";

    if (isEmpty(membershipData.notifications) && !isManual) {
        return null;
    }

    const aboutToExpire = membershipData.notifications.some(x => x.slug === 'mb_expiration_notice');
    const hasExpired = membershipData.notifications.some(x => x.slug === 'mb_has_expired_notice');

    return (
        <>
            {(isManual || aboutToExpire || hasExpired) &&
                <Paper
                    elevation={3}
                    style={{
                        padding: "20px",
                        margin: "10px 16px",
                        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%)",
                    }}
                >
                    <Typography variant="p">
                        {hasExpired ? t("Membership.membership_was_active_until") : t("Membership.membership_active_until")}
                        {" "}
                        {moment(membershipData.expiry).format("DD/MM/YYYY")}
                    </Typography>
                </Paper>
            }

            {membershipData.notifications.map((item) => {
                return (
                    <Paper elevation={3} style={{margin: "10px 16px",}} className={classes[item.slug]}>
                        <Typography variant="h6">
                            {t(`Membership.${item.slug}_title`)}
                        </Typography>
                        <Typography variant="p">
                            {t(`Membership.${item.slug}_desc`)}
                        </Typography>
                    </Paper>
                );
            })}
        </>
    );
}
