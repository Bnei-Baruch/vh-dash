import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import Snackbar from "../../../components/SnackBar";
const PlayerContainer = styled.div`
  max-width: 800px;
  width: 100%;
`;
const postBroadcastQuestion = (body) => {
  return axios
    .post(`https://qst.kli.one/api/ask`, body)
    .then((res) => res.data);
};

export default function BroadcastQuestions() {
  const { t } = useTranslation();
  const [type, setType] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("eng");
  const [showSnackbar, setshowSnackbar] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [posting, setPosting] = React.useState(false);
  const user = useSelector((state) => state.userReducer.info);
  const [qText, setQText] = React.useState("");

  const postQuestion = () => {
    setDisabled(true);
    setPosting(true);
    if (qText.trim() === "") {
      setSnackbarMessage(t("Dashboard.BroadcastArea.noText"));
      setType("error");
      setshowSnackbar(true);
      return;
    }
    let body = {
      askForMe: true,
      serialUserId: user?.keycloak?.subject,
      question: { content: qText },
      user: {
        gender: user?.profile?.gender,
        name: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
        galaxyRoom: "Dashboard Area",
      },
    };
    postBroadcastQuestion(body).then(() => {
      setQText("");
      setSnackbarMessage(t("Dashboard.BroadcastArea.successPosted"));
      setType("success");
      setshowSnackbar(true);
      setPosting(false);
    });
  };
  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12}>
          <PlayerContainer>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={12}>
                <div>{t("Dashboard.BroadcastArea.questions")}</div>
                <br />
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label={t("Dashboard.BroadcastArea.yourQuestion")}
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={4}
                    value={qText}
                    onChange={(e) => {
                      if (e.target.value.trim() !== "") {
                        setDisabled(false);
                      } else {
                        setDisabled(true);
                      }
                      setQText(e.target.value);
                    }}
                  />
                </div>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={disabled}
                  onClick={postQuestion}
                >
                  {posting
                    ? t("Dashboard.BroadcastArea.posting")
                    : t("Dashboard.BroadcastArea.postYourQuestion")}
                </Button>
              </Grid>
            </Grid>
          </PlayerContainer>
          <Snackbar show={showSnackbar} type={type} message={snackbarMessage} />
        </Grid>
      </Grid>
    </>
  );
}
