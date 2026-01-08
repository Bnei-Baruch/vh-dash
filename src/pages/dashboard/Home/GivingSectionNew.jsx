import React from "react";
import styled from "styled-components";
import { Gift, Users, Hand } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 32px;
  position: relative;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const HeaderLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e5e7eb;
  margin-right: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
  font-style: italic;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${({ hoverColor }) => hoverColor || "#e5e7eb"};
    background-color: ${({ hoverBgColor }) => hoverBgColor || "#ffffff"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  background: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  padding: 14px;
  border-radius: 12px;
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
  color: #1f2937;
  font-size: 18px;
  margin-bottom: 6px;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

const ArrowIcon = styled.div`
  color: #9ca3af;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

/* ===== Component ===== */

const GivingSectionNew = () => {
  // Using the same data structure and content from the original component
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
      <HeaderSection>
        <HeaderTitle>נתינה וערבות הדדית</HeaderTitle>
        <HeaderLine />
      </HeaderSection>

      <Subtitle>
       הנתינה היא הכלי דרכו אנו בונים את הכלי הרוחני המשותף שלנו. כל תרומה מחזקת את הקשר בינינו.
      </Subtitle>

      <CardsContainer>
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
      </CardsContainer>
    </Wrapper>
  );
};

export default GivingSectionNew;

