import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";

import PersonalForm from "../Forms/PersonalForm/PersonalForm";
import EmailsForm from "../Forms/EmailsForm";
import PhysicalLocationForm from "../Forms/PersonalForm/PhysicalLocationForm";
import SocialForm from "../Forms/SocialForm";
import { updateModifyEnabled } from "../../../../redux/actions/profileActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    textAlign: "right",
    boxShadow: "none",
  },
  toolBar: {
    padding: 20,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgb(242, 242, 242) !important",
  },
});

const MyProfileTab = ({
  errorFields,
  inputFields,
  setErrorFields,
  onErrorClear,
  onSubmit,
  setInputFields,
  handleChange,
  resetEdit
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [copiedFields, setCopiedFields] = useState({});

  useEffect(() => {
    if (copiedFields !== inputFields) {
      setCopiedFields(inputFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFields]);

  const onInputBlur = (field) => {
    const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputFields[field]);
    if (inputFields[field]) {
      if (!isValid) {
        setErrorFields((prevState) => ({
          ...prevState,
          [field]: t("Dashboard.Profile.Emails.emailError"),
        }));
        setIsValid(false);

        return;
      }

      onErrorClear();
      setIsValid(true);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!isModified) {
      setIsModified(true);
      dispatch(updateModifyEnabled(true));
      return;
    }

    isValid && onSubmit();
    setIsModified(false);
    dispatch(updateModifyEnabled(false));
  };

  const onCancel = () => {
    onErrorClear();
    setIsModified(false);
    dispatch(updateModifyEnabled(false));
    resetEdit();
  };

  const buttonText = isModified ? t("Global.saveBtn") : t("Global.modify");

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mg={12} lg={6}>
          <PersonalForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
          <PhysicalLocationForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} sm={12} mg={12} lg={6} style={{ display: "grid" }}>
          <EmailsForm
            inputFields={inputFields}
            errorFields={errorFields}
            handleChange={handleChange}
            isModified={isModified}
            onInputBlur={onInputBlur}
          />
          <SocialForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ background: `${isModified ? "#C9F9DA" : "#fff"}` }}
        >
          <Toolbar className={classes.toolBar}>
            <Button
              variant="contained"
              color={isModified ? "secondary" : "primary"}
              type="submit"
            >
              {buttonText}
            </Button>
            {isModified && (
              <Button
                style={{ marginLeft: 20 }}
                variant="contained"
                color="default"
                onClick={onCancel}
              >
                {t("Global.cancelBtn")}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Grid>
    </form>
  );
};

export default MyProfileTab;
