import {
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ReactHlsPlayer from "react-hls-player";
import PublicIcon from "@material-ui/icons/Public";
import SchoolIcon from "@material-ui/icons/School";
import { useBroadcastStream } from "./hooks/useBroadcastStream";
import StudyMaterialsWidget from "./StudyMaterialsWidget";
import LanguageSelector from "./LanguageSelector";

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
  padding: ${(props) => props.theme.spacing(4.5)}px 0;

  @media (max-width: 600px) {
    padding: ${(props) => props.theme.spacing(3)}px 0;
  }
`;

const StudyButton = styled(Button)`
  padding: ${(props) => props.theme.spacing(1.25)}px ${(props) => props.theme.spacing(2)}px;
  font-size: ${(props) => props.theme.typography.body2.fontSize}px;

  @media (max-width: 600px) {
    padding: ${(props) => props.theme.spacing(0.75)}px ${(props) => props.theme.spacing(1.25)}px;
    font-size: 12px;
    min-width: auto;

    .MuiButton-startIcon {
      margin-right: ${(props) => props.theme.spacing(0.5)}px;
      margin-left: 0;

      svg {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 360px) {
    padding: ${(props) => props.theme.spacing(0.5)}px ${(props) => props.theme.spacing(1)}px;
    font-size: 12px;

    .MuiButton-startIcon {
      margin-right: ${(props) => props.theme.spacing(0.375)}px;

      svg {
        font-size: 14px;
      }
    }
  }
`;

/* ---- Player container (Controls + Video) ---- */

const PlayerContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.spacing(1)}px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows[4]};
  display: flex;
  flex-direction: column;

  min-height: 0;
  background: ${grey[900]};
`;

/* ---- Controls bar (above video) ---- */

const ControlsBar = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${(props) => props.theme.spacing(3)}px;
  background: ${grey[900]};
`;

const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(3)}px;
`;

const Action = styled.span`
  cursor: pointer;
  color: ${grey[400]};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)}px;

  &:hover {
    color: ${(props) => props.theme.palette.common.white};
  }
`;

/* ---- Video section ---- */

const VideoSection = styled.div`
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)}px;
`;

const PlayerWrapper = styled.div`
  width: 100%;
  background: ${grey[900]};
  overflow: hidden;

  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

/* ---------- component ---------- */

export default function Broadcast() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

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
            <ControlsGroup>
              <PublicIcon style={{ color: grey[400] }} fontSize="small" />

              <Action onClick={(e) => setLangAnchor(e.currentTarget)}>
                {selectedLanguage} ▾
              </Action>

              {availableQualities.length > 0 && (
                <Action onClick={(e) => setQualityAnchor(e.currentTarget)}>
                  {selectedQuality} ▾
                </Action>
              )}
            </ControlsGroup>
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

      {/* Language Selector */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        availableLanguages={availableLanguages}
        onLanguageChange={setLanguage}
        anchorEl={langAnchor}
        onClose={() => setLangAnchor(null)}
      />

      {/* Quality Menu */}
      <Menu
        anchorEl={qualityAnchor}
        open={Boolean(qualityAnchor)}
        onClose={() => setQualityAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'right' : 'left',
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            marginTop: '4px',
          },
        }}
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

      {/* Study Materials Widget */}
      <StudyMaterialsWidget
        open={studyMaterialOpen}
        onClose={() => setStudyMaterialOpen(false)}
      />
    </>
  );
}
