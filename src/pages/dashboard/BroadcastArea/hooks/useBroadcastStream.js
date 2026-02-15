import React from "react";
import { getLanguageNameFromAppCode } from "../../../../utils";
import { getStreams, getDefaultQuality } from "../../../../services/broadcast-hls.service";

/**
 * Custom hook to manage broadcast stream state and behavior
 * Handles stream data fetching, language/quality selection, and video playback
 */
export function useBroadcastStream() {
  const [streamsData, setStreamsData] = React.useState(null);
  const [selectedLangName, setSelectedLangName] = React.useState("");
  const [selectedQuality, setSelectedQuality] = React.useState(null);
  const [hlsUrl, setHlsUrl] = React.useState("");
  const [hasUserStartedPlayback, setHasUserStartedPlayback] = React.useState(false);
  const playerRef = React.useRef(null);
  const previousHlsUrlRef = React.useRef("");

  const extractLanguagesData = (data) => {
    const languagesData = data?.languages;

    if (!languagesData || Object.keys(languagesData).length === 0)
      return null;

    return languagesData;
  };

  const resolveInitialLanguage = (languagesData) => {
    // 1. Check saved broadcast language (full language name format)
    const savedBroadcastLang = localStorage.getItem("VH_BROADCAST_LANG");
    if (savedBroadcastLang && languagesData[savedBroadcastLang]) {
      return savedBroadcastLang;
    }

    // 2. Fallback: use app language (i18nextLng) - convert from 2-letter code to full name
    const appLang = localStorage.getItem("i18nextLng");
    if (appLang) {
      const resolvedLang = getLanguageNameFromAppCode(appLang);
      if (resolvedLang && languagesData[resolvedLang]) {
        return resolvedLang;
      }
    }

    // 3. Default: English if available, otherwise first available language
    if (languagesData["English"]) {
      return "English";
    } else {
      const firstLang = Object.keys(languagesData)[0];
      return firstLang || null;
    }
  };

  const initStreams = async () => {
    try {
      const data = await getStreams();
      const languagesData = extractLanguagesData(data);

      if (!languagesData) {
        console.error("No languages found in streams data");
        return;
      }

      setStreamsData(data);

      const initialLanguage = resolveInitialLanguage(languagesData);
      if (initialLanguage) {
        setSelectedLangName(initialLanguage);
      }
    } catch (error) {
      console.error("Error loading streams:", error);
    }
  };

  // Load streams data on mount
  React.useEffect(() => {
    initStreams();
  }, []);

  // Update quality and HLS URL when language changes
  React.useEffect(() => {
    if (!streamsData?.languages || !selectedLangName) return;

    const languageStreams = streamsData.languages[selectedLangName];
    if (!Array.isArray(languageStreams) || languageStreams.length === 0) return;
  
    const defaultQuality = getDefaultQuality(languageStreams);
    if (!defaultQuality) return;
  
    setSelectedQuality(defaultQuality.quality);
    setHlsUrl(defaultQuality.hlsUrl);
  }, [selectedLangName, streamsData]);

  // Update HLS URL when quality changes
  React.useEffect(() => {
    if (!streamsData?.languages?.[selectedLangName] || !selectedQuality) return;

    const languageStreams = streamsData.languages[selectedLangName];

    const qualityData = languageStreams.find(
      (q) => q.quality === selectedQuality
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

    // Cleanup: remove event listener if component unmounts or effect re-runs
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [hlsUrl, hasUserStartedPlayback]);

  // Handler to update selected language
  const setLanguage = (langName) => {
    setSelectedLangName(langName);
    // Save full language name directly to localStorage
    localStorage.setItem("VH_BROADCAST_LANG", langName);
  };

  // Handler to update selected quality
  const setQuality = (quality) => {
    setSelectedQuality(quality);
  };

  // Handler for video play event
  const handlePlay = () => {
    if (!hasUserStartedPlayback) {
      setHasUserStartedPlayback(true);
    }
  };

  // Computed values
  const languagesData = streamsData?.languages;
  const currentLanguageData = languagesData?.[selectedLangName];
  const availableQualities = Array.isArray(currentLanguageData) ? currentLanguageData : [];
  const availableLanguages = languagesData ? Object.keys(languagesData) : [];

  return {
    // Stream data
    hlsUrl,
    selectedLanguage: selectedLangName,
    selectedQuality,
    availableLanguages,
    availableQualities,

    // Actions
    setLanguage,
    setQuality,

    // Video player
    playerRef,
    hasUserStartedPlayback,
    handlePlay,
  };
}
