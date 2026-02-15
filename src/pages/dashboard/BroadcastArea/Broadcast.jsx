import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ReactHlsPlayer from "react-hls-player";
import PublicIcon from "@material-ui/icons/Public";
import { getFlagUrl, handleFlagError } from "../../../utils/flags";
import { useBroadcastStream } from "./hooks/useBroadcastStream";
import HomerLimud from "./HomerLimud";
import { School as SchoolIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  rootFirstSelect: {
    padding: "10px 8px",
  },
  rootSecondSelect: {
    padding: "10px 8px",
  },
  menuItem: {
    padding: "6px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    whiteSpace: "nowrap",
  },
}));

const PlayerContainer = styled.div`
  max-width: 800px;
  width: 100%;
`;
const WorldIcon = styled(PublicIcon)``;
const LangugaeContainer = styled(Grid)`
  padding: 0px 20px !important;
`;
const LiveLang = styled.span`
  position: relative;
  top: -2px;
`;

export default function Broadcast() {
  const classes = useStyles();
  const { t } = useTranslation();

  // Use custom hook for all broadcast stream logic
  const {
    hlsUrl,
    selectedLanguage,
    selectedQuality,
    availableLanguages,
    availableQualities,
    setLanguage,
    setQuality,
    playerRef,
    hasUserStartedPlayback,
    handlePlay,
  } = useBroadcastStream();

  // UI-only state for Homer Limud dialog
  const [homerLimudOpen, setHomerLimudOpen] = React.useState(false);

  const handleHomerLimudToggle = () => {
    setHomerLimudOpen(!homerLimudOpen);
  };
  const handleHomerLimudClose = () => {
    setHomerLimudOpen(false);
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <WorldIcon />
                  <LiveLang>
                    {t("Dashboard.BroadcastArea.liveLanguage")}
                  </LiveLang>
                </div>
                <span>
                  <FormControl variant="outlined" style={{ width: "auto", minWidth: "140px" }}>
                    <Select
                      classes={{ root: classes.rootFirstSelect }}
                      labelId="language-select-label"
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(e) => setLanguage(e.target.value)}
                      renderValue={() => {
                        const flagUrl = getFlagUrl(selectedLanguage);
                        return (
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {flagUrl && (
                              <img
                                src={flagUrl}
                                width="20"
                                height="15"
                                alt={selectedLanguage}
                                style={{ display: "block", flexShrink: 0 }}
                                onError={handleFlagError}
                              />
                            )}
                            <span>{selectedLanguage}</span>
                          </div>
                        );
                      }}
                    >
                      {availableLanguages.map((langName) => {
                        const flagUrl = getFlagUrl(langName);
                        return (
                          <MenuItem 
                            value={langName} 
                            key={langName} 
                            classes={{ root: classes.menuItem }}
                          >
                            {flagUrl && (
                              <img
                                src={flagUrl}
                                width="20"
                                height="15"
                                alt={langName}
                                style={{ display: "block", flexShrink: 0 }}
                                onError={handleFlagError}
                              />
                            )}
                            <span>{langName}</span>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </span>
                {availableQualities.length > 0 && (
                  <span>
                    <FormControl variant="outlined" style={{ width: "auto", minWidth: "140px" }}>
                      <Select
                        classes={{ root: classes.rootSecondSelect }}
                        labelId="quality-select-label"
                        id="quality-select"
                        value={selectedQuality || ""}
                        onChange={(e) => setQuality(e.target.value)}
                      >
                        {availableQualities.map((quality) => {
                          const qualityValue = quality.quiality || quality.quality || quality;
                          return (
                            <MenuItem value={qualityValue} key={qualityValue}>
                              {qualityValue}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </span>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SchoolIcon />}
                  onClick={handleHomerLimudToggle}
                >
                  {t("Dashboard.BroadcastArea.studyMaterialsButton")}
                </Button>
              </LangugaeContainer>
              <Grid item xs={12} sm={12}>
                {hlsUrl && (
                  <ReactHlsPlayer
                    playerRef={playerRef}
                    src={hlsUrl}
                    autoPlay={hasUserStartedPlayback}
                    controls={true}
                    width="100%"
                    height="100%"
                    onPlay={handlePlay}
                  />
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
