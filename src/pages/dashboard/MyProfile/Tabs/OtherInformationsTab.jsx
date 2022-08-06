import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import EducationForm from "../Forms/InformationForms/EducationForm";
import TenForm from "../Forms/InformationForms/TenForm";
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

const OtherInformationsTab = ({
  inputFields,
  setInputFields,
  resetEdit,
  onSubmit,
  handleChange,
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
      setIsModified(true);
      dispatch(updateModifyEnabled(true));
      return;
    }

    onSubmit();
    setIsModified(false);
    dispatch(updateModifyEnabled(false));
  };

  const onCancel = () => {
    setIsModified(false);
    resetEdit();
    dispatch(updateModifyEnabled(false));
  };

  const buttonText = isModified ? t("Global.saveBtn") : t("Global.modify");

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mg={12} lg={6}>
          <EducationForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} sm={12} mg={12} lg={6}>
          <TenForm
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

export default OtherInformationsTab;
