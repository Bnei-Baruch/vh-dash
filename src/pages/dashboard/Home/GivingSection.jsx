import React from "react";
import styled from "styled-components";
import { Heart, Gift, Users, Hand } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const HeaderIcon = styled.div`
  color: #e11d48;
  display: flex;
  align-items: center;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ hoverColor }) => hoverColor || "#e5e7eb"};
    background-color: ${({ hoverBgColor }) => hoverBgColor || "transparent"};
  }
`;

const IconWrapper = styled.div`
  background: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.div`
  font-weight: 700;
  color: #1f2937;
  font-size: 15px;
  margin-bottom: 4px;
`;

const CardDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

/* ===== Component ===== */

const GivingSection = () => {
  const givingCards = [
    {
      id: 1,
      title: "לתרום להפצה",
      description: "תמיכה בהפצת החכמה",
      icon: Gift,
      bgColor: "#fff7ed",
      iconColor: "#ea580c",
      hoverColor: "#fed7aa",
      hoverBgColor: "rgba(254, 215, 170, 0.3)",
      href: "https://pay.kli.one/he/form/donation?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back",
    },
    {
      id: 2,
      title: "Help Haver",
      description: "קרן עזרה הדדית",
      icon: Users,
      bgColor: "#fff1f2",
      iconColor: "#e11d48",
      hoverColor: "#fecdd3",
      hoverBgColor: "rgba(254, 205, 211, 0.3)",
      href: "https://pay.kli.one/he/form/help-haver?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back",
    },
    {
      id: 3,
      title: "תשלום מעשר",
      description: "הוראת קבע או חד פעמי",
      icon: Hand,
      bgColor: "#eff6ff",
      iconColor: "#2563eb",
      hoverColor: "#bfdbfe",
      hoverBgColor: "rgba(191, 219, 254, 0.3)",
      href: "https://pay.kli.one/he/form/tithe",
    },
  ];

  const handleCardClick = (href) => {
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
          <Heart size={24} />
        </HeaderIcon>
        <HeaderTitle>נתינה וערבות הדדית</HeaderTitle>
      </Header>

      <CardsGrid>
        {givingCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.id}
              hoverColor={card.hoverColor}
              hoverBgColor={card.hoverBgColor}
              onClick={() => handleCardClick(card.href)}
            >
              <IconWrapper bgColor={card.bgColor} iconColor={card.iconColor}>
                <IconComponent size={24} strokeWidth={2} />
              </IconWrapper>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </CardsGrid>
    </Wrapper>
  );
};

export default GivingSection;

