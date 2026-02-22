import {
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ReactHlsPlayer from "react-hls-player";
import PublicIcon from "@material-ui/icons/Public";
import SchoolIcon from "@material-ui/icons/School";
import { useBroadcastStream } from "./hooks/useBroadcastStream";
import StudyMaterialsWidget from "./StudyMaterialsWidget";

/* ---------- layout ---------- */

const BroadcastLayout = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
`;

/* ---- Study materials button (below player) ---- */

const StudyButtonContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  padding: 18px 0;
  
  @media (max-width: 600px) {
    padding: 12px 0;
  }
`;

const StudyButton = styled(Button)`
  padding: 10px 16px;
  font-size: 14px;
  
  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 12px;
    min-width: auto;
    
    .MuiButton-startIcon {
      margin-right: 4px;
      margin-left: 0;
      
      svg {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 360px) {
    padding: 4px 8px;
    font-size: 12px;

    .MuiButton-startIcon {
      margin-right: 3px;

      svg {
        font-size: 14px;
      }
    }
  }
`;

// justify-content: ${(props) => (props.theme.direction === "rtl" ? "flex-end" : "flex-start")};
/* ---- Player container (Controls + Video) ---- */

const PlayerContainer = styled.div`
  width: 100%;
  max-width: 1280px;  
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  
  min-height: 0;
  background: #0f0f10;

  
`;

/* ---- Controls bar (above video) ---- */

const ControlsBar = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: #0f0f10;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Action = styled.span`
  cursor: pointer;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #fff;
  }
`;

/* ---- Video section ---- */

const VideoSection = styled.div`
  
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const PlayerWrapper = styled.div`
  width: 100%;
  background: black;
  overflow: hidden;

  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

/* ---------- component ---------- */

export default function Broadcast() {
  const { t } = useTranslation();

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

  const [studyMaterialOpen, setStudyMaterialOpen] = React.useState(false);
  const [langAnchor, setLangAnchor] = React.useState(null);
  const [qualityAnchor, setQualityAnchor] = React.useState(null);

  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />

      <BroadcastLayout>

        {/* Player Container (Controls + Video) */}
        <PlayerContainer>
          {/* Controls (above video) */}
          <ControlsBar>
            <LeftGroup>
              <PublicIcon style={{ color: "#ccc" }} fontSize="small" />

              <Action onClick={(e) => setLangAnchor(e.currentTarget)}>
                {selectedLanguage} ▾
              </Action>

              {availableQualities.length > 0 && (
                <Action onClick={(e) => setQualityAnchor(e.currentTarget)}>
                  {selectedQuality} ▾
                </Action>
              )}
            </LeftGroup>
          </ControlsBar>

          {/* Video */}
          <VideoSection>
            {hlsUrl && (
              <PlayerWrapper>
                <ReactHlsPlayer
                  playerRef={playerRef}
                  src={hlsUrl}
                  autoPlay={hasUserStartedPlayback}
                  controls
                  onPlay={handlePlay}
                />
              </PlayerWrapper>
            )}
          </VideoSection>
        </PlayerContainer>

        {/* Study Materials Button (below player) */}
        <StudyButtonContainer>
          <StudyButton
            variant="contained"
            color="primary"
            startIcon={<SchoolIcon />}
            onClick={() => setStudyMaterialOpen(true)}
          >
            {t("Dashboard.BroadcastArea.studyMaterialsButton")}
          </StudyButton>
        </StudyButtonContainer>

      </BroadcastLayout>

      {/* Language Menu */}
      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
      >
        {availableLanguages.map((langName) => (
          <MenuItem
            key={langName}
            onClick={() => {
              setLanguage(langName);
              setLangAnchor(null);
            }}
          >
            {langName}
          </MenuItem>
        ))}
      </Menu>

      {/* Quality Menu */}
      <Menu
        anchorEl={qualityAnchor}
        open={Boolean(qualityAnchor)}
        onClose={() => setQualityAnchor(null)}
      >
        {availableQualities.map((quality) => {
          const qualityValue =
            quality.quiality || quality.quality || quality;

          return (
            <MenuItem
              key={qualityValue}
              onClick={() => {
                setQuality(qualityValue);
                setQualityAnchor(null);
              }}
            >
              {qualityValue}
            </MenuItem>
          );
        })}
      </Menu>

      <StudyMaterialsWidget
        open={studyMaterialOpen}
        onClose={() => setStudyMaterialOpen(false)}
      />
    </>
  );
}
