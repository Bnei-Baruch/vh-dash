import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";

import LanguagesForm from "../Forms/LanguagesForms/LanguagesForm";
import LanguagePreferencesForm from "../Forms/LanguagesForms/LanguagePreferencesForm";
import { useDispatch } from "react-redux";
import { updateModifyEnabled } from "../../../../redux/actions/profileActions";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    textAlign: "right",
    background: "#fff",
    boxShadow: "none",
  },
  toolBar: {
    padding: 20,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgb(242, 242, 242) !important",
  },
});

const LanguagesTab = ({
  inputFields,
  setInputFields,
  handleChange,
  onSubmit,
  resetEdit
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [copiedFields, setCopiedFields] = useState({});

  useEffect(() => {
    if (copiedFields !== inputFields) {
      setCopiedFields(inputFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFields]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!isModified) {
      dispatch(updateModifyEnabled(true));
      setIsModified(true);
      return;
    }

    onSubmit();
    dispatch(updateModifyEnabled(false));
    setIsModified(false);
  };

  const onCancel = () => {
    setIsModified(false);
    dispatch(updateModifyEnabled(false));
    resetEdit();
  };

  const buttonText = isModified ? t("Global.saveBtn") : t("Global.modify");

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mg={12} lg={6}>
          <LanguagesForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} sm={12} mg={12} lg={6}>
          <LanguagePreferencesForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <AppBar position="fixed" className={classes.appBar}>
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

export default LanguagesTab;
