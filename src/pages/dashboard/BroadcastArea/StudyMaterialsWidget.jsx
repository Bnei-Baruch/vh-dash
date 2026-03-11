import React, { useEffect, useRef, useState } from "react";
import {
  Drawer as MuiDrawer,
  Box as MuiBox,
  IconButton as MuiIconButton,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Drawer = styled(MuiDrawer)`
  width: 400px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 400px;
    max-width: 100vw;
    box-sizing: border-box;
    background-color: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 400px) {
    width: 100vw;

    .MuiDrawer-paper {
      width: 100vw;
    }
  }
`;

const DrawerHeader = styled(MuiBox)`
  height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: ${(props) => props.theme.sidebar.header.background};
  color: ${(props) => props.theme.sidebar.header.color};

  @media (max-width: 400px) {
    padding: ${(props) => props.theme.spacing(1.5)}px;
  }
`;

const CloseButton = styled(MuiIconButton)`
   && {
    color: ${(props) => props.theme.sidebar.header.color};
  }

  &&:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Content = styled(MuiBox)`
  height: 100%;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const ErrorText = styled(Typography)`
  text-align: center;
  padding: ${(props) => props.theme.spacing(4)}px;
  color: ${(props) => props.theme.palette.error.main};
`;

const StudyMaterialsWidget = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState(false);

  const containerRef = useRef(null);
  const widgetInstanceRef = useRef(null);

  useEffect(() => {
    if (!open) {
      // Cleanup widget when drawer closes
      if (widgetInstanceRef.current?.destroy) {
        widgetInstanceRef.current.destroy();
        widgetInstanceRef.current = null;
      }
      setError(false);
      return;
    }

    let pollId;
    let cancelled = false;

    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const scriptUrl = window.APP_CONFIG?.STUDY_MATERIALS_WIDGET_URL;
        if (!scriptUrl) {
          reject(new Error("STUDY_MATERIALS_WIDGET_URL is not configured"));
          return;
        }

        const existing = document.querySelector(
          `script[src="${scriptUrl}"]`
        );
        if (existing) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.onload = resolve;
        script.onerror = () => {
          script.remove();
          reject(new Error("Failed to load study materials widget script"));
        };
        document.head.appendChild(script);
      });
    };

    const initWidget = async () => {
      try {
        await loadScript();
      } catch {
        if (!cancelled) {
          setError(true);
        }
        return;
      }

      if (cancelled) return;

      // Poll for widget availability (script may need time to execute after load)
      const MAX_POLL_ATTEMPTS = 20;
      let attempts = 0;
      pollId = setInterval(() => {
        attempts++;
        if (cancelled) {
          clearInterval(pollId);
          return;
        }

        if (!window.StudyMaterialsWidget?.load) {
          if (attempts >= MAX_POLL_ATTEMPTS) {
            clearInterval(pollId);
            setError(true);
          }
          return;
        }

        clearInterval(pollId);

        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";

        const apiUrl = window.APP_CONFIG?.STUDY_MATERIALS_API_URL;

        if (!apiUrl) {
          console.error("Study Materials API URL is not configured");
          setError(true);
          return;
        }

        const instance = window.StudyMaterialsWidget.load(
          null,
          i18n.language,
          {
            apiUrl: apiUrl,
            limit: 5,
            target: containerRef.current,
          }
        );

        widgetInstanceRef.current = instance;
      }, 50);
    };

    initWidget();

    return () => {
      cancelled = true;
      clearInterval(pollId);
      if (widgetInstanceRef.current?.destroy) {
        widgetInstanceRef.current.destroy();
        widgetInstanceRef.current = null;
      }
    };
  }, [open, i18n.language]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <DrawerHeader>
        <CloseButton
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </CloseButton>
      </DrawerHeader>

      <Content>
        {error ? (
          <ErrorText>
            {t("Dashboard.BroadcastArea.studyMaterialsError")}
          </ErrorText>
        ) : (
          <div
            ref={containerRef}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Content>
    </Drawer>
  );
};

export default StudyMaterialsWidget;
