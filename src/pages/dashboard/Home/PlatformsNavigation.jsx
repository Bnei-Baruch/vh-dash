import React from "react";
import styled from "styled-components";
import { Users, Film, BookOpen, Calendar, CreditCard, Gift, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";
import { grey } from "@material-ui/core/colors";

/* ===== Data ===== */

const PLATFORMS = [
  {
    id: "arvut",
    href: "https://arvut.kli.one/",
    icon: Users,
    bgColor: "#eff6ff",
    color: "#2563eb",
    hoverBg: "#dbeafe",
  },
  {
    id: "media",
    href: "https://kabbalahmedia.info/",
    icon: Film,
    bgColor: "#f0fdfa",
    color: "#0d9488",
    hoverBg: "#ccfbf1",
  },
  {
    id: "study",
    href: "https://study.kli.one/",
    icon: BookOpen,
    bgColor: "#eef2ff",
    color: "#4f46e5",
    hoverBg: "#e0e7ff",
  },
  {
    id: "events",
    href: "https://events.kli.one/",
    icon: Calendar,
    bgColor: "#f0fdf4",
    color: "#16a34a",
    hoverBg: "#dcfce7",
  },
  {
    id: "payments",
    href: "https://pay.kli.one/",
    icon: CreditCard,
    bgColor: "#fff7ed",
    color: "#ea580c",
    hoverBg: "#ffedd5",
  },
  {
    id: "donations",
    href: "https://give.kli.one/",
    icon: Gift,
    bgColor: "#fff1f2",
    color: "#e11d48",
    hoverBg: "#ffe4e6",
  },
  {
    id: "convention",
    href: "https://convention.kli.one/he",
    icon: Radio,
    bgColor: "#faf5ff",
    color: "#9333ea",
    hoverBg: "#f3e8ff",
  },
];

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(p) => p.theme.breakpoints.only("md")} {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid ${grey[200]};
  }
`;

const PlatformsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    gap: 16px;
  }
`;

const PlatformButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  text-decoration: none;
  color: ${(p) => p.theme.palette.text.primary};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const IconBox = styled.div`
  padding: 14px;
  border-radius: 18px;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  transition: transform 0.2s ease, background 0.2s ease;

  ${PlatformButton}:hover & {
    transform: scale(1.05);
    background: ${({ hoverBg }) => hoverBg};
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

/* ===== Component ===== */

const PlatformsNavigation = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <PlatformsRow>
        {PLATFORMS.map(({ id, href, icon: Icon, bgColor, color, hoverBg }) => (
          <PlatformButton key={id} href={href} target="_blank" rel="noopener noreferrer">
            <IconBox bgColor={bgColor} color={color} hoverBg={hoverBg}>
              <Icon size={22} />
            </IconBox>
            <Label>{t(`Dashboard.PlatformsNavigation.${id}`)}</Label>
          </PlatformButton>
        ))}
      </PlatformsRow>
    </Wrapper>
  );
};

export default PlatformsNavigation;
