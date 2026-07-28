import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import banerTestImage from "../../../asset/baner_test.png";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 24px;
  margin-bottom: 24px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* Physical (non-mirrored) positioning layer, so the content column
   stays anchored to the clear left-hand area regardless of the RTL
   text direction used inside it. */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  direction: ltr;
  padding: 13px 100px 13px 40px;

  @media (max-width: 600px) {
    padding: 12px 20px 12px 24px;
  }
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 540px;
  color: #ffffff;
  text-align: right;


  @media (max-width: 600px) {
    max-width: 80%;
    gap: 8px;
  }
`;

const EventLine = styled.p`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.4;
  opacity: 1;
  white-space: normal;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Headline = styled.h2`
  margin: 0;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.15;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const BaseButton = styled.button`
  border-radius: 999px;
  padding: 15px 36px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding: 10px 22px;
    font-size: 13px;
  }
`;

const RegisterButton = styled(BaseButton)`
  background: #f05a28;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 14px rgba(240, 90, 40, 0.35);
`;

const MaterialsButton = styled(BaseButton)`
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.75);
`;

const HomeBanner = () => {
  const { i18n } = useTranslation();

  if (i18n.language !== "he") {
    return null;
  }

  return (
    <BannerContainer>
      <BannerImage src={banerTestImage} alt="" />
      <Overlay>
        <ContentBlock dir="rtl">
          <EventLine>{"כנס ״קבלה לעם״ העולמי | שישי–ראשון, 29–31.5.2026"}</EventLine>
          <Headline>{"״מתכנסים בעשירייה״"}</Headline>
          <ButtonsRow>
            <RegisterButton type="button">{"הרשמה"}</RegisterButton>
            <MaterialsButton type="button">{"חומרי הכנס"}</MaterialsButton>
          </ButtonsRow>
        </ContentBlock>
      </Overlay>
    </BannerContainer>
  );
};

export default HomeBanner;
