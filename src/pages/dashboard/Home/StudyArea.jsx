import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import { Play, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const WidgetPanel = styled.div`
  flex: 0 0 60%;
  position: relative;
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  min-height: 300px;

  &::after {
    content: "";
    position: absolute;
    top: 20px;                                                                                                                               
    bottom: 32px; 
    width: 1px;
    background: #e5e7eb;
    ${({ $isRTL }) => ($isRTL ? "right: 0;" : "left: 0;")}
  }

  @media (max-width: 960px) {
    flex: unset;
    &::after {
      display: none;
    }
    border-bottom: 1px solid #e5e7eb;
  }
`;

const LinksPanel = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const HeaderIcon = styled.div`
  color: #6366f1;
  display: flex;
  align-items: center;
`;

const StudyLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
  flex-direction: ${({ isRTL }) => (isRTL ? "row" : "row-reverse")};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
    padding-left: 4px;
    padding-right: 4px;
    margin-left: -4px;
    margin-right: -4px;
    border-radius: 8px;
  }
`;

const LinkIcon = styled.div`
  background: #eef2ff;
  color: #6366f1;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  ${StudyLinkRow}:hover & {
    background: #e0e7ff;
  }
`;

const LinkText = styled.div`
  flex: 1;
  font-weight: 600;
  color: #374151;
  font-size: 15px;

  ${StudyLinkRow}:hover & {
    color: #6366f1;
  }
`;

const ChevronIcon = styled.div`
  color: #d1d5db;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  ${StudyLinkRow}:hover & {
    color: #6366f1;
  }
`;


const WidgetContainer = styled.div`
  flex: 1;
  }
`;

const ErrorText = styled(Typography)`
  && {
    text-align: center;
    padding: 16px;
    color: #d32f2f;
  }
`;

/* ===== Component ===== */

const StudyArea = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir(i18n.language) === "rtl";
  const containerRef = useRef(null);
  const widgetInstanceRef = useRef(null);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    let pollId;
    let cancelled = false;

    const loadScript = () =>
      new Promise((resolve, reject) => {
        const scriptUrl = window.APP_CONFIG?.STUDY_MATERIALS_WIDGET_URL;
        if (!scriptUrl) {
          reject(new Error("STUDY_MATERIALS_WIDGET_URL is not configured"));
          return;
        }
        if (document.querySelector(`script[src="${scriptUrl}"]`)) {
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

    const initWidget = async () => {
      try {
        await loadScript();
      } catch {
        if (!cancelled) setWidgetError(true);
        return;
      }

      if (cancelled) return;

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
            setWidgetError(true);
          }
          return;
        }
        clearInterval(pollId);
        if (!containerRef.current) return;
        containerRef.current.innerHTML = "";
        const apiUrl = window.APP_CONFIG?.STUDY_MATERIALS_API_URL;
        if (!apiUrl) {
          setWidgetError(true);
          return;
        }
        const instance = window.StudyMaterialsWidget.load(null, i18n.language, {
          apiUrl,
          limit: 5,
          target: containerRef.current,
        });
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
  }, [i18n.language]);

  const studyLinks = [
    { id: 1, text: "שידור חי – לצפות לבד", icon: Play, href: "/dash/broadcast" },
    { id: 2, text: "שידור חי – עם העשירייה", icon: Users, href: "https://arvut.kli.one/user/" },
    { id: 3, text: "קבלה מדיה", icon: BookOpen, href: "https://kabbalahmedia.info" },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  };

  const widgetPanel = (
    <WidgetPanel $isRTL={isRTL}>
      {widgetError ? (
        <ErrorText>
          {t("Dashboard.BroadcastArea.studyMaterialsError")}
        </ErrorText>
      ) : (
        <WidgetContainer ref={containerRef} />
      )}
    </WidgetPanel>
  );

  const linksPanel = (
    <LinksPanel>
      <SectionHeader>
        <HeaderIcon>
          <BookOpen size={24} />
        </HeaderIcon>
        <HeaderTitle>אזור לימוד</HeaderTitle>
      </SectionHeader>

      {studyLinks.map((link) => {
        const IconComponent = link.icon;
        const ChevronComponent = isRTL ? ChevronLeft : ChevronRight;
        return (
          <StudyLinkRow
            key={link.id}
            isRTL={isRTL}
            onClick={(e) => handleLinkClick(link.href, e)}
          >
            <LinkIcon>
              <IconComponent size={20} strokeWidth={2} />
            </LinkIcon>
            <LinkText>{link.text}</LinkText>
            <ChevronIcon>
              <ChevronComponent size={16} />
            </ChevronIcon>
          </StudyLinkRow>
        );
      })}
    </LinksPanel>
  );

  return (
    <Wrapper>
      {/* dir="rtl" on body makes flex row flow right→left, so linksPanel (first) lands on the
          right and widgetPanel (second) lands on the left — correct for both RTL and LTR */}
      {linksPanel}
      {widgetPanel}
    </Wrapper>
  );
};

export default StudyArea;
