import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Play, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
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

const FooterLink = styled.a`
  margin-top: auto;
  padding-top: 16px;
  color: #6366f1;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  align-self: flex-start;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
`;

/* ===== Component ===== */

const StudyArea = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "he" || i18n.language === "ar";
  
  const studyLinks = [
    {
      id: 1,
      text: "שידור חי – לצפות לבד",
      icon: Play,
      href: "/dash/broadcast",
    },
    {
      id: 2,
      text: "שידור חי – עם העשירייה",
      icon: Users,
      href: "https://arvut.kli.one/user/",
    },
    {
      id: 3,
      text: "קבלה מדיה",
      icon: BookOpen,
      href: "https://kabbalahmedia.info",
    },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderIcon>
          <BookOpen size={24} />
        </HeaderIcon>
        <HeaderTitle>אזור לימוד</HeaderTitle>
      </Header>

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

      <FooterLink href="https://kabbalahmedia.info">
        לכל תכני הלימוד
      </FooterLink>
    </Wrapper>
  );
};

export default StudyArea;

