import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { getMyCoupons } from "../../../services/coupons.service";

const ENDING_SOON_DAYS = 14;

const useStyles = makeStyles({
  card: {
    padding: "20px",
    margin: "10px 20px",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
  },
  endingSoon: {
    backgroundColor: "#FEF2EF",
  },
  row: {
    marginTop: "8px",
  },
  code: {
    fontWeight: 600,
  },
  notice: {
    color: "#FF0000",
    marginTop: "8px",
  },
});

// Member-facing coupon list (design §3): client-derived per page load, renders
// nothing when the member has no coupons. Dates arrive as inclusive Jerusalem
// "YYYY-MM-DD" strings from the backend.
export default function Coupons() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    let active = true;
    getMyCoupons()
      .then((list) => active && setCoupons(list || []))
      .catch(() => active && setCoupons([]));
    return () => {
      active = false;
    };
  }, []);

  if (!coupons.length) return null;

  const today = moment().startOf("day");
  const fmt = (d) => moment(d, "YYYY-MM-DD").format("DD-MM-YYYY");
  // "Ending soon" is about a discount the member currently has that is about to
  // end — only consider already-started coupons, never upcoming ones.
  const activeEnds = coupons
    .filter((c) => !moment(c.benefit_start, "YYYY-MM-DD").isAfter(today))
    .map((c) => moment(c.benefit_end, "YYYY-MM-DD"));
  const endingSoon =
    activeEnds.length > 0 &&
    activeEnds.reduce((max, d) => (d.isAfter(max) ? d : max)).diff(today, "days") <= ENDING_SOON_DAYS;

  return (
    <Paper className={`${classes.card} ${endingSoon ? classes.endingSoon : ""}`}>
      <Typography variant="h6">{t("Coupons.title")}</Typography>
      {coupons.map((c, i) => {
        const upcoming = moment(c.benefit_start, "YYYY-MM-DD").isAfter(today);
        return (
          <Typography key={i} variant="body1" className={classes.row}>
            <span className={classes.code}>{c.code}</span>
            {c.description ? ` — ${c.description}` : ""}
            {" · "}
            {upcoming
              ? t("Coupons.starts", { date: fmt(c.benefit_start) })
              : t("Coupons.until", { date: fmt(c.benefit_end) })}
          </Typography>
        );
      })}
      {endingSoon && (
        <Typography variant="body2" className={classes.notice}>
          {t("Coupons.endingSoon")}
        </Typography>
      )}
    </Paper>
  );
}
