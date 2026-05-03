import React from "react";
import styled from "styled-components";
import { grey } from "@material-ui/core/colors";
import { useTranslation } from "react-i18next";
import { Gift, Users, Hand, HeartHandshake } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: transparent;
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(6)}px;
  position: relative;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(3)}px;
  margin-bottom: ${(p) => p.theme.spacing(6)}px;
  position: relative;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  margin: 0;
`;

const HeaderLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${grey[200]};
  margin-right: ${(p) => p.theme.spacing(3)}px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(4)}px;
`;

const SubSectionHeader = styled.div`
  margin-bottom: ${(p) => p.theme.spacing(3)}px;
`;

const SubSectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(3)}px;
  margin-bottom: ${(p) => p.theme.spacing(1)}px;
`;

const SubSectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${grey[200]};
`;

const SubSectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  white-space: nowrap;
`;

const SubSectionSubtitle = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.palette.text.secondary};
  text-align: center;
`;

const HelpHaverCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(3)}px;
  width: 100%;
`;

const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.spacing(4)}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border: 1px solid ${grey[200]};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(5)}px;
  cursor: pointer;
  display: flex;
  align-items: ${({ $vertical }) => ($vertical ? "flex-start" : "center")};
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  gap: ${(p) => p.theme.spacing(p.$vertical ? 3 : 5)}px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ hoverColor }) => hoverColor || grey[200]};
    background-color: ${({ hoverBgColor }) => hoverBgColor || "transparent"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IconWrapper = styled.div`
  background: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  padding: ${(p) => p.theme.spacing(3.5)}px;
  border-radius: ${(p) => p.theme.spacing(3)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.div`
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 18px;
  margin-bottom: 6px;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme.palette.text.secondary};
  line-height: 1.5;
`;

const ArrowIcon = styled.div`
  color: ${grey[400]};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const SubRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowDivider = styled.div`
  height: 1px;
  background: ${grey[200]};
`;

const RequestRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing(3)}px 0;
  padding-top: ${(p) => p.$first ? 0 : p.theme.spacing(3)}px;
  padding-bottom: ${(p) => p.$last ? 0 : p.theme.spacing(3)}px;
  cursor: pointer;
  color: ${(p) => p.theme.palette.text.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${(p) => p.theme.palette.primary.main};
  }
`;

const RequestRowText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: inherit;
`;

const RowArrow = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: inherit;
`;

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing(3)}px;
  width: 100%;
  color: ${(p) => p.theme.palette.text.secondary};
`;

/* ===== Component ===== */

const GivingSection = () => {
  const { t } = useTranslation();

  const mainCards = [
    {
      id: 3,
      title: t("Home.giving.donation.title"),
      description: t("Home.giving.donation.description"),
      icon: Gift,
      bgColor: "#fff7ed",
      iconColor: "#ea580c",
      hoverColor: "#fed7aa",
      hoverBgColor: "rgba(254, 215, 170, 0.3)",
      href: "https://pay.kli.one/he/form/donation?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back",
    },
    {
      id: 4,
      title: t("Home.giving.tithe.title"),
      description: t("Home.giving.tithe.description"),
      icon: Hand,
      bgColor: "#eff6ff",
      iconColor: "#2563eb",
      hoverColor: "#bfdbfe",
      hoverBgColor: "rgba(191, 219, 254, 0.3)",
      href: "https://pay.kli.one/he/Donation",
    },
  ];

  const helpHaverCards = [
    {
      id: 1,
      title: t("Home.giving.request.title"),
      icon: HeartHandshake,
      bgColor: "#f5f3ff",
      iconColor: "#7c3aed",
      hoverColor: "#ddd6fe",
      hoverBgColor: "rgba(221, 214, 254, 0.3)",
      subRows: [
        {
          id: "tuition",
          label: t("Home.giving.helpTuition.title"),
          href: "https://kli.one/pay/membership?lang=he",
        },
        {
          id: "events",
          label: t("Home.giving.helpEvents.title"),
          href: "https://docs.google.com/forms/d/e/1FAIpQLScU0xjKtV4XVJwz2nbv4vTB3p_inw6nhJPNw1-kHG3GzoB6qA/viewform",
        },
      ],
    },
    {
      id: 2,
      title: t("Home.giving.help.title"),
      description: t("Home.giving.help.description"),
      icon: Users,
      bgColor: "#fff1f2",
      iconColor: "#e11d48",
      hoverColor: "#fecdd3",
      hoverBgColor: "rgba(254, 205, 211, 0.3)",
      href: "https://pay.kli.one/he/form/help-haver?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back",
    },
  ];

  const handleCardClick = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <Wrapper>
      <HeaderSection>
        <HeaderTitle>{t("Home.giving.title")}</HeaderTitle>
        <HeaderLine />
      </HeaderSection>

      <CardsContainer>
        {mainCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.id}
              hoverColor={card.hoverColor}
              hoverBgColor={card.hoverBgColor}
              onClick={() => handleCardClick(card.href)}
            >
              <IconWrapper bgColor={card.bgColor} iconColor={card.iconColor}>
                <IconComponent size={28} strokeWidth={2} />
              </IconWrapper>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <ArrowIcon>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </ArrowIcon>
            </Card>
          );
        })}
        <SubSectionHeader>
          <SubSectionTitleRow>
            <SubSectionLine />
            <SubSectionTitle>{t("Home.giving.helpHaverTitle")}</SubSectionTitle>
            <SubSectionLine />
          </SubSectionTitleRow>
          <SubSectionSubtitle>{t("Home.giving.helpHaverSubtitle")}</SubSectionSubtitle>
        </SubSectionHeader>
        <TwoColumnRow>
          {helpHaverCards.map((card) => {
            const IconComponent = card.icon;
            if (card.subRows) {
              return (
                <Card key={card.id} $vertical hoverColor={card.hoverColor} hoverBgColor={card.hoverBgColor}>
                  <HelpHaverCardHeader>
                    <IconWrapper bgColor={card.bgColor} iconColor={card.iconColor}>
                      <IconComponent size={28} strokeWidth={2} />
                    </IconWrapper>
                    <CardTitle>{card.title}</CardTitle>
                  </HelpHaverCardHeader>
                  <SubRowsContainer>
                    {card.subRows.map((row, index) => (
                      <React.Fragment key={row.id}>
                        <RequestRow $first={index === 0} $last={index === card.subRows.length - 1} onClick={() => handleCardClick(row.href)}>
                          <RequestRowText>{row.label}</RequestRowText>
                          <RowArrow>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </RowArrow>
                        </RequestRow>
                        {index < card.subRows.length - 1 && <RowDivider />}
                      </React.Fragment>
                    ))}
                  </SubRowsContainer>
                </Card>
              );
            }
            return (
              <Card
                key={card.id}
                $vertical
                hoverColor={card.hoverColor}
                hoverBgColor={card.hoverBgColor}
                onClick={() => handleCardClick(card.href)}
              >
                <HelpHaverCardHeader>
                  <IconWrapper bgColor={card.bgColor} iconColor={card.iconColor}>
                    <IconComponent size={28} strokeWidth={2} />
                  </IconWrapper>
                  <CardTitle>{card.title}</CardTitle>
                </HelpHaverCardHeader>
                <DescriptionRow>
                  <CardDescription>{card.description}</CardDescription>
                  <RowArrow>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </RowArrow>
                </DescriptionRow>
              </Card>
            );
          })}
        </TwoColumnRow>
      </CardsContainer>
    </Wrapper>
  );
};

export default GivingSection;

