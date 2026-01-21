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
import axios from "axios";
import { getCountryCode, getCustomCodeFromCoutryCode } from "../../../utils";
import { getFlag, handleFlagError, getLanguageCode, findLanguageNameByCode } from "../../../utils/flag";
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
    gap: "8px",
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

const STREAMS_CACHE_KEY = "VH_STREAMS_CACHE";
const STREAMS_CACHE_TIMESTAMP_KEY = "VH_STREAMS_CACHE_TIMESTAMP";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const publicAxios = axios.create();

const fetchStreamsJSON = async () => {
  // Check cache
  const cachedData = localStorage.getItem(STREAMS_CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(STREAMS_CACHE_TIMESTAMP_KEY);
  
  if (cachedData && cachedTimestamp) {
    const cacheAge = Date.now() - parseInt(cachedTimestamp, 10);
    if (cacheAge < CACHE_DURATION_MS) {
      try {
        return JSON.parse(cachedData);
      } catch {
        localStorage.removeItem(STREAMS_CACHE_KEY);
        localStorage.removeItem(STREAMS_CACHE_TIMESTAMP_KEY);
      }
    }
  }
  
  // Fetch fresh data
  try {
    const response = await publicAxios.get("https://streams.kab.tv/live1.json", {
      responseType: "text",
    });
    
    let data = response.data;
    
    // Parse JSON or JavaScript object literal
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        // Try parsing as JavaScript object literal
        if (data.trim().startsWith('{') && data.includes('languages')) {
          data = new Function('return ' + data)();
        } else {
          throw new Error("Invalid data format");
        }
      }
    }
    
    // Cache the result
    localStorage.setItem(STREAMS_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(STREAMS_CACHE_TIMESTAMP_KEY, Date.now().toString());
    
    return data;
  } catch (error) {
    console.error("Failed to fetch streams JSON:", error);
    // Fallback to expired cache if available
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch {
        throw error;
      }
    }
    throw error;
  }
};

// Find default quality (360p if available, otherwise first)
const getDefaultQuality = (qualities) => {
  if (!qualities || qualities.length === 0) return null;
  const quality360p = qualities.find((q) => q.quiality === "360p" || q.quality === "360p");
  return quality360p || qualities[0];
};

export default function Broadcast() {
  const classes = useStyles();
  const [streamsData, setStreamsData] = React.useState(null);
  const [selectedLangName, setSelectedLangName] = React.useState("");
  const [selectedQuality, setSelectedQuality] = React.useState(null);
  const [hlsUrl, setHlsUrl] = React.useState("");
  const [hasUserStartedPlayback, setHasUserStartedPlayback] = React.useState(false);
  const playerRef = React.useRef(null);
  const previousHlsUrlRef = React.useRef("");
  const { t } = useTranslation();
  const [homerLimudOpen, setHomerLimudOpen] = React.useState(false);

  const handleHomerLimudToggle = () => {
    setHomerLimudOpen(!homerLimudOpen);
  };
  const handleHomerLimudClose = () => {
    setHomerLimudOpen(false);
  };

  // Load streams data on mount
  React.useEffect(() => {
    const loadStreams = async () => {
      try {
        const data = await fetchStreamsJSON();
        const languagesData = data?.languages || data;
        
        if (!languagesData || typeof languagesData !== 'object' || Object.keys(languagesData).length === 0) {
          console.error("No languages found in data");
          return;
        }
        
        setStreamsData(data);
  
        // Restore language from localStorage or use default
        const broadCastLang = localStorage.getItem("VH_BROADCAST_LANG");
        const savedLang = localStorage.getItem("VH_LANG");
        const langCode = broadCastLang || (savedLang ? savedLang.toLowerCase() : null);
  
        let resolvedLang = null;
        if (langCode) {
          const customCode = getCustomCodeFromCoutryCode(langCode);
          resolvedLang = findLanguageNameByCode(customCode);
        }
  
        // Set selected language: resolved from localStorage, or English, or first available
        if (resolvedLang && languagesData[resolvedLang]) {
          setSelectedLangName(resolvedLang);
        } else if (languagesData["English"]) {
          setSelectedLangName("English");
        } else {
          const firstLang = Object.keys(languagesData)[0];
          if (firstLang) {
            setSelectedLangName(firstLang);
          }
        }
      } catch (error) {
        console.error("Error loading streams:", error);
      }
    };
  
    loadStreams();
  }, []);
  

  // Update quality and HLS URL when language changes
  React.useEffect(() => {
    if (!streamsData?.languages || !selectedLangName) return;
    
    const languageData = streamsData.languages[selectedLangName];
    if (Array.isArray(languageData) && languageData.length > 0) {
      const defaultQuality = getDefaultQuality(languageData);
      if (defaultQuality) {
        setSelectedQuality(defaultQuality.quiality || defaultQuality.quality);
        setHlsUrl(defaultQuality.hlsUrl);
      }
    }
  }, [selectedLangName, streamsData]);

  // Update HLS URL when quality changes
  React.useEffect(() => {
    if (!streamsData?.languages?.[selectedLangName] || !selectedQuality) return;
    
    const languageData = streamsData.languages[selectedLangName];
    const qualityData = languageData.find(
      (q) => (q.quiality === selectedQuality || q.quality === selectedQuality)
    );
    if (qualityData) {
      setHlsUrl(qualityData.hlsUrl);
    }
  }, [selectedQuality, selectedLangName, streamsData]);

  // Continue playback when URL changes if user has already started playback
  React.useEffect(() => {
    if (!hasUserStartedPlayback || !hlsUrl || hlsUrl === previousHlsUrlRef.current) {
      previousHlsUrlRef.current = hlsUrl;
      return;
    }

    const videoElement = playerRef.current;
    if (!videoElement?.play) {
      previousHlsUrlRef.current = hlsUrl;
      return;
    }

    const handleCanPlay = () => {
      if (videoElement && !videoElement.paused) {
        videoElement.play().catch(() => {});
      }
      videoElement.removeEventListener('canplay', handleCanPlay);
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    
    setTimeout(() => {
      if (videoElement && !videoElement.paused && videoElement.readyState >= 2) {
        videoElement.play().catch(() => {});
      }
    }, 300);

    previousHlsUrlRef.current = hlsUrl;
  }, [hlsUrl, hasUserStartedPlayback]);


  const updateBroadcastLang = (langName) => {
    setSelectedLangName(langName);
    const langCode = getLanguageCode(langName);
    if (langCode) {
      localStorage.setItem("VH_BROADCAST_LANG", getCountryCode(langCode));
    }
  };

  const updateQuality = (quality) => {
    setSelectedQuality(quality);
  };

  // Computed values
  const languagesData = streamsData?.languages;
  const currentLanguageData = languagesData?.[selectedLangName];
  const availableQualities = Array.isArray(currentLanguageData) ? currentLanguageData : [];
  const availableLanguages = languagesData ? Object.keys(languagesData) : [];

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
                      value={selectedLangName}
                      onChange={(e) => updateBroadcastLang(e.target.value)}
                      renderValue={(value) => {
                        const flagUrl = getFlag(value);
                        return (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {flagUrl && (
                              <img
                                src={flagUrl}
                                width="20"
                                height="15"
                                alt={value}
                                style={{ display: "block", flexShrink: 0 }}
                                onError={handleFlagError}
                              />
                            )}
                            <span>{value}</span>
                          </div>
                        );
                      }}
                    >
                      {availableLanguages.map((langName) => {
                        const flagUrl = getFlag(langName);
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
                        onChange={(e) => updateQuality(e.target.value)}
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
                    onPlay={() => {
                      if (!hasUserStartedPlayback) {
                        setHasUserStartedPlayback(true);
                      }
                    }}
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
