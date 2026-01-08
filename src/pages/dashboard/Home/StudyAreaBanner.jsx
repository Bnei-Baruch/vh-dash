import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Play, Users, BookOpen, LibraryBig, ChevronLeft, ChevronRight } from "lucide-react";

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

const BannerSection = styled.div`
  flex: 0 0 60%;
  min-height: 300px;
  background: linear-gradient(
    to bottom,
    #00447c 0%,
    #0f5d8a 45%,
    #2d8fb0 75%,
    #51caca 100%
  );
  border-radius: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 20px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 960px) {
    flex: 0 0 200px;
    width: 100%;
    border-radius: 16px 16px 0 0;
  }
`;

const BannerContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BannerTitleDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 8px;
`;

const BannerTitle = styled.h3`
  font-family: 'Assistant', sans-serif;
  font-size: 26px;
  opacity: 0.9;
  font-weight: 700;
  margin-bottom: 0px;
  line-height: 1.1;
  color: white;
  margin: 0;
  position: relative;
  display: inline-block;

  @media (max-width: 960px) {
    font-size: 24px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const BannerDateText = styled.div`
  font-family: 'Assistant', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  margin-bottom: 12px;
`;

const BannerButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10px;
`;

const BannerRegisterButton = styled.button`
  font-family: 'Assistant', sans-serif;

  background: #ff8a3d; /* כתום חם, לא צועק */
  color: #ffffff;

  padding: 10px 28px;
  border-radius: 999px;

  font-weight: 700;
  font-size: 14px;
  border: none;

  cursor: pointer;

  box-shadow: 
    0 4px 12px rgba(255, 138, 61, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);

  transition: 
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: #ff7a1f;
    box-shadow: 
      0 6px 16px rgba(255, 138, 61, 0.45),
      inset 0 0 0 1px rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 3px 8px rgba(255, 138, 61, 0.3);
  }

  @media (max-width: 960px) {
    font-size: 13px;
    padding: 9px 24px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 8px 20px;
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

const StudyAreaBanner = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he" || i18n.language === "ar";

  const handleConventionClick = () => {
    const conventionUrl = i18n.language !== "en"
      ? "https://convention.kli.one/" + i18n.language
      : "https://convention.kli.one";

    window.open(conventionUrl, "_blank").focus();
  };

  // מידע קבוע של הכנס
  const conventionContent = {
    he: {
      title: "כנס ''קבלה לעם'' העולמי",
      date: "19-21.02.2026",
    },
    en: {
      title: "Global ''Kabbalah Laam'' Convention",
      date: "19-21.02.2026",
    },
    ru: {
      title: "Всемирный конгресс ''Каббала народу''",
      date: "19-21.02.2026",
    },
    es: {
      title: "Convención Global ''Kabbalah Laam''",
      date: "19-21.02.2026",
    }
  };

  const currentContent = conventionContent[i18n.language] || conventionContent.he;
  const eventTitle = currentContent.title;
  const eventDate = currentContent.date;
  
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
      <BannerSection onClick={handleConventionClick}>
        <BannerContentWrapper>
          <BannerTitleDateWrapper>
            <BannerTitle>{eventTitle}</BannerTitle>
          </BannerTitleDateWrapper>
          <BannerDateText>{eventDate}</BannerDateText>
          <BannerButtonWrapper>
            <BannerRegisterButton onClick={(e) => {
              e.stopPropagation();
              handleConventionClick();
            }}>
              {t("Home.conventionSite") || "לפרטים והרשמה"}
            </BannerRegisterButton>
          </BannerButtonWrapper>
        </BannerContentWrapper>
      </BannerSection>
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

export default StudyAreaBanner;

