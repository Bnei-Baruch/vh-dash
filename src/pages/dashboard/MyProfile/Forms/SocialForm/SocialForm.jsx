import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import MuiPhoneInput from "material-ui-phone-number";
import { commonFormStyles } from "../../../../../constants/formData";
import Phone from "../../../../../img/icons/phone.png";
import Telegram from "../../../../../img/icons/telegram.png";
import Whatsapp from "../../../../../img/icons/whatsapp.png";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 22,
    height: 22,
  },
  input: {
    "& input": {
      padding: 0,
      height: 35,
      direction: "initial",
      textAlign: ({ textAlignProps }) => textAlignProps,
    },
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: 0,
    },
    "& .MuiPhoneNumber-flagButton": {
      height: 35,
      background: "#F4F4F4",
    },
  },
}));

const SocialForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t, i18n } = useTranslation();
  const textAlignProps = i18n.dir() === "rtl" ? "right" : "left";
  const styles = useStyles({ textAlignProps });
  const { mobile_number, telegram_number, whats_app_number } = inputFields;

  const onPhoneChange = (value) => handleChange("mobile_number", value);
  const onTelegramPhoneChange = (value) =>
    handleChange("telegram_number", value);
  const onWhatsappPhoneChange = (value) =>
    handleChange("whats_app_number", value);

  return (
    <div className={`${classes.root} ${classes.socialForm}`}>
      <Typography variant="h4" gutterBottom>
        {t("Dashboard.Profile.socialFormName")}
      </Typography>
      <Grid container spacing={10} alignContent="center">
        <Grid item xs={2} md={1}>
          <img src={Phone} alt="phone" className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            InputProps={{ disableUnderline: !isModified ? true : false }}
            defaultCountry="us"
            disabled={!isModified}
            onChange={onPhoneChange}
            variant="outlined"
            value={mobile_number}
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={10} alignContent="center">
        <Grid item xs={2} md={1}>
          <img src={Whatsapp} alt="whatsapp" className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            InputProps={{ disableUnderline: !isModified ? true : false }}
            defaultCountry="us"
            value={whats_app_number}
            disabled={!isModified}
            onChange={onWhatsappPhoneChange}
            variant="outlined"
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={10} alignContent="center">
        <Grid item xs={2} md={1}>
          <img src={Telegram} alt="telegram" className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            InputProps={{ disableUnderline: !isModified ? true : false }}
            defaultCountry="us"
            value={telegram_number}
            disabled={!isModified}
            onChange={onTelegramPhoneChange}
            variant="outlined"
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SocialForm;
