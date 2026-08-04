import {makeStyles, Paper, Typography} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
import React from "react";
import {useTranslation} from "react-i18next";
import {isEmpty} from "lodash";
import moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
    default: {
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
    },
    error: {
        backgroundColor: fade(theme.palette.error.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.error.dark,
        },
    },
    mb_expiration_notice: {
        backgroundColor: fade(theme.palette.warning.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.warning.dark,
        },
    },
    mb_has_expired_notice: {
        backgroundColor: fade(theme.palette.error.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.error.dark,
        },
    },
    hh_request_refused: {
        backgroundColor: fade(theme.palette.error.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.error.dark,
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
        backgroundColor: fade(theme.palette.error.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.error.dark,
        },
    },
    mb_problem_previous_payment: {
        backgroundColor: fade(theme.palette.error.main, 0.12),
        padding: "20px",
        margin: "10px 20px",
        boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
        "& >h6": {
            color: theme.palette.error.dark,
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
}));
export default function Notification({membershipData}) {
    const classes = useStyles();
    const {t} = useTranslation();

    const isManual = membershipData.type === "manual";
    const notifications = membershipData.notifications || [];

    if (isEmpty(notifications) && !isManual) {
        return null;
    }

    const aboutToExpire = notifications.some(x => x.slug === 'mb_expiration_notice');
    const hasExpired = notifications.some(x => x.slug === 'mb_has_expired_notice');

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

            {notifications.map((item) => {
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
