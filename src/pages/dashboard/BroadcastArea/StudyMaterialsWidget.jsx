import React, { useEffect, useRef } from "react";
import {
  Drawer as MuiDrawer,
  Box as MuiBox,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Drawer = styled(MuiDrawer)`
  width: 400px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
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
`;

const CloseButton = styled(MuiIconButton)`
  color: ${(props) => props.theme.sidebar.header.color};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled(MuiBox)`
  height: 100%;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const StudyMaterialsWidget = ({ open, onClose }) => {
  const { i18n } = useTranslation();

  const containerRef = useRef(null);
  const widgetInstanceRef = useRef(null);

  useEffect(() => {
    if (!open) {
      // Cleanup widget when drawer closes
      if (widgetInstanceRef.current?.destroy) {
        widgetInstanceRef.current.destroy();
        widgetInstanceRef.current = null;
      }
      return;
    }

    const loadScript = () => {
      return new Promise((resolve) => {
        const existing = document.querySelector(
          'script[src*="widget.js"]'
        );
        if (existing) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src =
          window.APP_CONFIG?.REACT_APP_STUDY_MATERIALS_WIDGET_URL ||
          'https://study.kli.one/widget/widget.js';
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
      });
    };

    const initWidget = async () => {
      await loadScript();

      // Small delay to ensure script is fully executed
      setTimeout(() => {
        if (
          containerRef.current &&
          window.StudyMaterialsWidget &&
          window.StudyMaterialsWidget.load
        ) {
          containerRef.current.innerHTML = "";

          const apiUrl = window.APP_CONFIG?.REACT_APP_STUDY_MATERIALS_API_URL;
          
          if (!apiUrl) {
            console.error('Study Materials API URL is not configured');
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
        }
      }, 100);
    };

    initWidget();

    return () => {
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
        <div
          ref={containerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </Content>
    </Drawer>
  );
};

export default StudyMaterialsWidget;
