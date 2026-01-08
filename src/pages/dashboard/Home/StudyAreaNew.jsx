import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Play, Users, BookOpen, LibraryBig, ChevronLeft, ChevronRight } from "lucide-react";
import bannerTestImage from "../../../asset/logo/banner-test.jpeg";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 0 0 60%;
  min-height: 300px;
   background-image: url('https://kabbalahmedia.info/imaginary/thumbnail?url=http%3A%2F%2Fnginx%2Fassets%2Fapi%2Fthumbnail%2FEwafKd5f&width=800&stripmeta=true');
  /* background-image: url(${bannerTestImage}); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 960px) {
    flex: 0 0 200px;
    width: 100%;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 24px;
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

/* ===== Component ===== */

const StudyAreaNew = () => {
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
    {
      id: 4,
      text: "חומר לימוד",
      icon: LibraryBig,
      href: "https://drive.google.com/drive/u/0/folders/1iZ1-GHlR03enXJqoUu-8QASk1EwoE5ND",
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
      <ImageSection />
      <ContentSection>
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
      </ContentSection>
    </Wrapper>
  );
};

export default StudyAreaNew;

