import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactHlsPlayer from "react-hls-player";
import axios from "axios";
import { getCountryCode, getCustomCodeFromCoutryCode } from "../../../utils";
import HomerLimud from "./HomerLimud";
import { School as SchoolIcon } from "@material-ui/icons";
import WebRTCPlayer from "./WebRTCPlayer";
import { changeStreamingMode } from "../../../redux/actions/streamActions";
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
const LangugaeContainer = styled(Grid)`
  padding: 0px 20px !important;
`;
const StudyMaterialsButton = styled(Button)`
  white-space: nowrap;
  min-width: fit-content;
`;

const getBroadCast = (lang) => {
  return axios
    .post(`https://kab.tv/live/api/heartbeat`, {
      lang: lang,
      bitrate: 500,
    })
    .then((res) => res.data);
};

// Initialize selectedLang from localStorage before component mounts
const getInitialLanguage = () => {
  const broadCastLag = localStorage.getItem("VH_BROADCAST_LANG");
  const vhLang = localStorage.getItem("VH_LANG");
  if (broadCastLag || vhLang) {
    return getCustomCodeFromCoutryCode(
      broadCastLag || vhLang.toLowerCase()
    );
  }
  return "eng";
};

export default function Broadcast() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [languages, setLanguages] = React.useState([]);
  const [selectedLang, setSelectedLang] = React.useState(getInitialLanguage);
  const [webrtcError, setWebrtcError] = React.useState(null);
  const { t } = useTranslation();
  
  const streamingMode = useSelector((state) => state.streamReducer.streamingMode);
  const [homerLimudOpen, setHomerLimudOpen] = React.useState(false);

  const handleHomerLimudToggle = () => {
    setHomerLimudOpen(!homerLimudOpen);
  };
  const handleHomerLimudClose = () => {
    setHomerLimudOpen(false);
  };

  const getSourceURL = (lang) => {
    return `https://edge3.uk.kab.tv/live/${lang}-medium/playlist.m3u8`;
  };
  
  React.useEffect(() => {
    getBroadCast(selectedLang).then((res) => {
      if (res.Languages) {
        setLanguages(res.Languages);
      }
    });
  }, [selectedLang]);

  const updateBroadcastLang = (code) => {
    setSelectedLang(code);
    localStorage.setItem("VH_BROADCAST_LANG", getCountryCode(code));
  };

  const handleStreamingModeChange = (event) => {
    const isWebRTC = event.target.checked;
    const mode = isWebRTC ? "webrtc" : "hls";
    dispatch(changeStreamingMode(mode));
    setWebrtcError(null); // Clear any previous errors when switching modes
  };

  const handleWebRTCError = (error) => {
    setWebrtcError(error);
    // Auto-fallback to HLS if WebRTC fails
    if (streamingMode === "webrtc") {
      console.warn("[Broadcast] WebRTC failed, falling back to HLS");
      dispatch(changeStreamingMode("hls"));
    }
  };
  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12}>
          <PlayerContainer>
            <Grid container spacing={10} alignItems="center">
              <LangugaeContainer
                item
                xs={12}
                sm={12}
                style={{
                  marginTop: 32,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}
              >
                <span>
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
                          <MenuItem value={keys} key={keys}>
                            <img
                              src={`${process.env.PUBLIC_URL}/static/img/flags/${getCountryCode(keys)}.png`}
                              width="15"
                              alt={"map"}
                            />
                            &nbsp; {languages[keys].Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </span>
                <StudyMaterialsButton
                  variant="contained"
                  color="primary"
                  startIcon={<SchoolIcon />}
                  onClick={handleHomerLimudToggle}
                >
                  {t("Dashboard.BroadcastArea.studyMaterialsButton")}
                </StudyMaterialsButton>
                <FormControlLabel
                  control={
                    <Switch
                      checked={streamingMode === "webrtc"}
                      onChange={handleStreamingModeChange}
                      color="primary"
                    />
                  }
                  label={
                    streamingMode === "webrtc"
                      ? t("Dashboard.BroadcastArea.streamingWithoutDelay")
                      : t("Dashboard.BroadcastArea.streamingWithDelay")
                  }
                />
              </LangugaeContainer>
              <Grid item xs={12} sm={12}>
                {streamingMode === "webrtc" ? (
                  <WebRTCPlayer
                    language={selectedLang}
                    onError={handleWebRTCError}
                  />
                ) : (
                  <ReactHlsPlayer
                    src={getSourceURL(selectedLang)}
                    autoPlay={false}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                )}
                {webrtcError && streamingMode === "hls" && (
                  <div style={{ padding: "10px", backgroundColor: "#fff3cd", color: "#856404", marginTop: "10px" }}>
                    {t("Dashboard.BroadcastArea.webrtcFallback") || "WebRTC connection failed. Using HLS (delayed) stream."}
                  </div>
                )}
              </Grid>
            </Grid>
          </PlayerContainer>
        </Grid>
      </Grid>
      <HomerLimud open={homerLimudOpen} onClose={handleHomerLimudClose} />
    </>
  );
}
