import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

/* ===== Styled Components ===== */

const CardWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    #00447c 0%,
    #0f5d8a 45%,
    #2d8fb0 75%,
    #51caca 100%
  );
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 20px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 960px) {
    min-height: 130px;
    padding: 14px 18px;
  }

  @media (max-width: 600px) {
    min-height: 120px;
    padding: 12px 16px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  transition: transform 0.7s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-family: 'Assistant', sans-serif;
  font-size: 28px;
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

const DateButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: -2px;
`;

const DateText = styled.div`
  font-family: 'Assistant', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
`;

const Description = styled.p`
  font-size: 14px;
  color: #b2dfdb;
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 600px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

const RegisterButton = styled.button`
  font-family: 'Assistant', sans-serif;
  background: linear-gradient(135deg, #FFA07A 0%, #FF4500 100%);
  color: white;
  padding: 10px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(255, 131, 62, 0.3);
  width: fit-content;
  height: fit-content;

  &:hover {
    background: linear-gradient(135deg, #FF8C00 0%, #E94E1B 100%);
    box-shadow: 0 4px 12px rgba(255, 131, 62, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 960px) {
    padding: 9px 28px;
    font-size: 13px;
  }

  @media (max-width: 600px) {
    padding: 8px 24px;
    font-size: 12px;
  }
`;

/* ===== Component ===== */

const ConventionCard = () => {
  const { t, i18n } = useTranslation();

  const handleClick = () => {
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
      description: "הצטרפו לאלפי חברים מכל העולם ליומיים של חיבור והתעלות בלב המדבר."
    },
    en: {
      title: "Global ''Kabbalah Laam'' Convention",
      date: "19-21.02.2026",
      description: "Join thousands of friends from around the world for two days of connection and elevation in the heart of the desert."
    },
    ru: {
      title: "Всемирный конгресс ''Каббала народу''",
      date: "19-21.02.2026",
      description: "Присоединяйтесь к тысячам друзей со всего мира на два дня связи и возвышения в сердце пустыни."
    },
    es: {
      title: "Convención Global ''Kabbalah Laam''",
      date: "19-21.02.2026",
      description: "Únete a miles de amigos de todo el mundo para dos días de conexión y elevación en el corazón del desierto."
    }
  };

  const currentContent = conventionContent[i18n.language] || conventionContent.he;
  const eventTitle = currentContent.title;
  const eventDate = currentContent.date;

  return (
    <CardWrapper onClick={handleClick}>
      <GradientOverlay />
      <ContentWrapper>
        <TitleDateWrapper>
          <Title>{eventTitle}</Title>
        </TitleDateWrapper>
        <DateButtonRow>
          <DateText>{eventDate}</DateText>
          <RegisterButton onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}>
            {t("Home.conventionSite") || "לפרטים והרשמה"}
          </RegisterButton>
        </DateButtonRow>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default ConventionCard;

