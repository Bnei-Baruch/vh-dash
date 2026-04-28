import React from "react";
import styled from "styled-components";
import { grey } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Coffee, ChevronLeft, Calendar, CreditCard, Plus } from "lucide-react";
import { membershipDataV2 } from "../../../redux/selectors/user";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: transparent;
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(6)}px;
`;

const Header = styled.div`
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(p) => p.theme.spacing(6)}px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border: 1px solid ${grey[200]};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(5)}px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardIconWrapper = styled.div`
  position: absolute;
  top: ${(p) => p.theme.spacing(4)}px;
  inset-inline-start: ${(p) => p.theme.spacing(5)}px;
  background: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  padding: ${(p) => p.theme.spacing(3)}px;
  border-radius: ${(p) => p.theme.spacing(3)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  margin-top: 60px;
  flex: 1;
`;

const CardTitle = styled.div`
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme.palette.text.secondary};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const RegisterLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${(p) => p.theme.palette.primary.main};
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  margin-top: auto;
  transition: color 0.2s ease;

  &:hover {
    color: ${(p) => p.theme.palette.primary.dark};
    text-decoration: underline;
  }
`;

const WideCard = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border: 1px solid ${grey[200]};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(4)}px ${(p) => p.theme.spacing(6)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing(4)}px;
  transition: all 0.2s ease;
  margin-top: ${(p) => p.theme.spacing(6)}px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WideCardLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${(p) => p.theme.spacing(4)}px;
  flex: 1;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const WideCardIconWrapper = styled.div`
  background: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  padding: ${(p) => p.theme.spacing(3)}px;
  border-radius: ${(p) => p.theme.spacing(3)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const WideCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const WideCardTitle = styled.div`
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 18px;
  margin-bottom: 4px;
`;

const WideCardDescription = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme.palette.text.secondary};
  line-height: 1.5;
`;

const WideCardButton = styled.button`
  background: ${grey[100]};
  color: ${(p) => p.theme.palette.text.primary};
  border: 1px solid ${grey[200]};
  border-radius: ${(p) => p.theme.spacing(2)}px;
  padding: ${(p) => p.theme.spacing(2.5)}px ${(p) => p.theme.spacing(5)}px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)}px;
  flex-shrink: 0;

  &:hover {
    background: ${grey[200]};
    border-color: ${grey[300]};
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ===== Component ===== */

const PaymentsArea = () => {
  const { t } = useTranslation();
  const membership = useSelector((state) => membershipDataV2(state));
  const isActive = membership?.active || false;

  const cards = [
    {
      id: 1,
      title: t("Home.payments.meals.title"),
      description: t("Home.payments.meals.description"),
      icon: Coffee,
      bgColor: "#f0fdfa",
      iconColor: "#0d9488",
      href: "https://pay.kli.one/he/Calendar-Meals",
    },
    {
      id: 2,
      title: t("Home.payments.events.title"),
      description: t("Home.payments.events.description"),
      icon: Calendar,
      bgColor: "#eff6ff",
      iconColor: "#2563eb",
      href: "https://pay.kli.one/he/Events",
    },
  ];

  const membershipCard = isActive
    ? {
        title: t("Home.payments.tuition.title"),
        description: t("Home.payments.tuition.description"),
        buttonText: t("Home.payments.tuition.button"),
        icon: CreditCard,
        bgColor: "#f3e8ff",
        iconColor: "#9333ea",
        href: "https://kli.one/dash/membership",
      }
    : {
        title: t("Home.payments.membership.title"),
        description: t("Home.payments.membership.description"),
        buttonText: t("Home.payments.membership.button"),
        icon: Plus,
        bgColor: "#fef2f2",
        iconColor: "#dc2626",
        href: "https://kli.one/pay/membership?lang=he",
      };

  const handleCardClick = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>{t("Home.payments.title")}</HeaderTitle>
        <HeaderLine />
      </Header>

      <CardsGrid>
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.id}>
              <CardIconWrapper bgColor={card.bgColor} iconColor={card.iconColor}>
                <IconComponent size={24} strokeWidth={2} />
              </CardIconWrapper>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <RegisterLink
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Home.payments.register")}
                  <ChevronLeft size={16} />
                </RegisterLink>
              </CardContent>
            </Card>
          );
        })}
      </CardsGrid>

      <WideCard>
        <WideCardLeft>
          <WideCardIconWrapper bgColor={membershipCard.bgColor} iconColor={membershipCard.iconColor}>
            {React.createElement(membershipCard.icon, { size: 24, strokeWidth: 2 })}
          </WideCardIconWrapper>
          <WideCardContent>
            <WideCardTitle>{membershipCard.title}</WideCardTitle>
            <WideCardDescription>{membershipCard.description}</WideCardDescription>
          </WideCardContent>
        </WideCardLeft>
        <WideCardButton
          onClick={(e) => {
            e.preventDefault();
            handleCardClick(membershipCard.href);
          }}
        >
          {membershipCard.buttonText}
        </WideCardButton>
      </WideCard>
    </Wrapper>
  );
};

export default PaymentsArea;

