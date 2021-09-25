import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ReactHlsPlayer from "react-hls-player";
import PublicIcon from "@material-ui/icons/Public";
import axios from "axios";
import { getCountryCode, getCustomCodeFromCoutryCode } from "../../../utils";
import { useSelector } from "react-redux";
import Snackbar from "../../../components/SnackBar";
const useStyles = makeStyles((theme) => ({
  rootFirstSelect: {
    padding: "10px",
  },
  rootSecondSelect: {
    padding: "10px 80px",
  },
}));
const PlayerContainer = styled.div`
  max-width: 800px;
  width: 100%;
`;
const WorldIcon = styled(PublicIcon)`
  position: relative;
  top: 5px;
`;
const LangugaeContainer = styled(Grid)`
  padding: 0px 20px !important;
`;
const LiveLang = styled.span`
  position: relative;
  top: -2px;
`;

const getBroadCast = (lang) => {
  return axios
    .post(`https://kab.tv/live/api/heartbeat`, {
      lang: lang,
      bitrate: 500,
    })
    .then((res) => res.data);
};

const postBroadcastQuestion = (body) => {
  return axios
    .post(`https://qst.kli.one/api/ask`, body)
    .then((res) => res.data);
};

export default function Broadcast() {
  const classes = useStyles();
  const [languages, setLanguages] = React.useState([]);
  const [selectedLang, setSelectedLang] = React.useState("eng");
  const [type, setType] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("eng");
  const [showSnackbar, setshowSnackbar] = React.useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.userReducer.info);
  const [qText, setQText] = React.useState("");
  const getSourceURL = (lang) => {
    return `https://edge3.uk.kab.tv/live/${lang}-medium/playlist.m3u8`;
  };
  React.useEffect(() => {
    const broadCastLag = localStorage.getItem("VH_BROADCAST_LANG");
    if (broadCastLag || localStorage.getItem("VH_LANG")) {
      setSelectedLang(
        getCustomCodeFromCoutryCode(
          broadCastLag || localStorage.getItem("VH_LANG").toLowerCase()
        )
      );
    }
    getBroadCast(selectedLang).then((res) => {
      if (res.Languages) {
        setLanguages(res.Languages);
      }
    });
  }, []);

  const postQuestion = () => {
    console.log(user);
    if (qText.trim() === "") {
      console.log("error");
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
    });
  };

  const updateBroadcastLang = (code) => {
    setSelectedLang(code);
    localStorage.setItem("VH_BROADCAST_LANG", getCountryCode(code));
  };
  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12}>
          <PlayerContainer>
            <Grid container spacing={10}>
              <LangugaeContainer item xs={12} sm={12}>
                <WorldIcon />
                <LiveLang>
                  &nbsp; {t("Dashboard.BroadcastArea.liveLanguage")}
                </LiveLang>
                <span>
                  {" "}
                  &nbsp;
                  <FormControl variant="outlined">
                    <Select
                      classes={{ root: classes.rootFirstSelect }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedLang}
                      onChange={(e) => updateBroadcastLang(e.target.value)}
                    >
                      {Object.keys(languages).map((keys) => {
                        return (
                          <MenuItem value={keys}>
                            <img
                              src={`/static/img/flags/${getCountryCode(
                                keys
                              )}.png`}
                              width="15"
                              alt={"map"}
                            />{" "}
                            &nbsp; {languages[keys].Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </span>
              </LangugaeContainer>
              <Grid item xs={12} sm={12}>
                <ReactHlsPlayer
                  src={getSourceURL(selectedLang)}
                  autoPlay={false}
                  controls={true}
                  width="100%"
                  height="100%"
                />
              </Grid>
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
                    onChange={(e) => setQText(e.target.value)}
                  />
                </div>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={qText.trim() === ""}
                  onClick={postQuestion}
                >
                  {t("Dashboard.BroadcastArea.postYourQuestion")}
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
