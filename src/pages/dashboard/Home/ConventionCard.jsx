import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

/* ===== Styled Components ===== */

const CardWrapper = styled.div`
  background: #004d40;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 960px) {
    min-height: 180px;
    padding: 20px;
  }

  @media (max-width: 600px) {
    min-height: 160px;
    padding: 16px;
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
  background: linear-gradient(
    to top,
    #004d40 0%,
    rgba(0, 77, 64, 0.8) 50%,
    transparent 100%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;


const Title = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;

  @media (max-width: 960px) {
    font-size: 24px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
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
  background: #f97316;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #ea580c;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    padding: 8px 20px;
    font-size: 13px;
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
        <Title>{eventTitle}</Title>
        <Title style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '500' }}>{eventDate}</Title>
        <RegisterButton onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}>
          {t("Home.conventionSite") || "לפרטים והרשמה"}
        </RegisterButton>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default ConventionCard;

