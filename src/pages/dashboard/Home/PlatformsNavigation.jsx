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
    color: "#2563eb",
  },
  {
    id: "media",
    href: "https://kabbalahmedia.info/",
    icon: Film,
    color: "#0d9488",
  },
  {
    id: "study",
    href: "https://study.kli.one/",
    icon: BookOpen,
    color: "#4f46e5",
  },
  {
    id: "events",
    href: "https://events.kli.one/",
    icon: Calendar,
    color: "#16a34a",
  },
  {
    id: "payments",
    href: "https://pay.kli.one/",
    icon: CreditCard,
    color: "#ea580c",
  },
  {
    id: "donations",
    href: "https://give.kli.one/",
    icon: Gift,
    color: "#e11d48",
  },
  {
    id: "convention",
    href: "https://convention.kli.one/he",
    icon: Radio,
    color: "#9333ea",
  },
];

/* ===== Styled Components ===== */

const NavBar = styled.nav`
  background: ${(p) => p.theme.palette.background.paper};
  border-bottom: 1px solid ${grey[200]};
  display: flex;
  align-items: center;
  padding: 0 16px;
  overflow-x: auto;
  scrollbar-width: none;

  ${(p) => p.theme.breakpoints.up("md")} {
    justify-content: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  text-decoration: none;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  direction: ltr;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ color }) => color};
    border-bottom-color: ${({ color }) => color};
    background: ${(p) => p.theme.palette.action.hover};
  }
`;

const NavIcon = styled.div`
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

/* ===== Component ===== */

const PlatformsNavigation = () => {
  const { t, i18n } = useTranslation();

  return (
    <NavBar>
      {PLATFORMS.map(({ id, href, icon: Icon, color }) => (
        <NavItem
          key={id}
          href={id === "payments" ? `https://pay.kli.one/${i18n.language}` : href}
          target="_blank"
          rel="noopener noreferrer"
          color={color}
        >
          <NavIcon color={color}>
            <Icon size={18} />
          </NavIcon>
          {t(`Dashboard.PlatformsNavigation.${id}`)}
        </NavItem>
      ))}
    </NavBar>
  );
};

export default PlatformsNavigation;
