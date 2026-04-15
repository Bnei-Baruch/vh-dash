import React from "react";
import styled from "styled-components";
import {
  Play,
  Coffee,
  Users,
  BookOpen,
  Heart,
} from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    gap: 16px;
  }
`;

const ActionButton = styled.a`
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
  transition: transform 0.2s ease, background 0.2s ease;
  background: ${({ variant }) => {
    switch (variant) {
      case "blue":
        return "#eff6ff";
      case "teal":
        return "#f0fdfa";
      case "rose":
        return "#fff1f2";
      case "indigo":
        return "#eef2ff";
      case "orange":
        return "#fff7ed";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "blue":
        return "#2563eb";
      case "teal":
        return "#0d9488";
      case "rose":
        return "#e11d48";
      case "indigo":
        return "#4f46e5";
      case "orange":
        return "#ea580c";
      default:
        return "#374151";
    }
  }};

  ${ActionButton}:hover & {
    transform: scale(1.05);
    background: ${({ variant }) => {
      switch (variant) {
        case "blue":
          return "#dbeafe";
        case "teal":
          return "#ccfbf1";
        case "rose":
          return "#ffe4e6";
        case "indigo":
          return "#e0e7ff";
        case "orange":
          return "#ffedd5";
        default:
          return "#e5e7eb";
      }
    }};
  }
`;
const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

/* ===== Component ===== */

const QuickActions = () => {
  return (
    <Wrapper>
      <ActionsRow>
        <ActionButton href="https://kli.one/dash/broadcast">
          <IconBox variant="blue">
            <Play size={22} />
          </IconBox>
          <Label>שידור</Label>
        </ActionButton>

        <ActionButton href="https://pay.kli.one/he/Calendar-Meals">
          <IconBox variant="teal">
            <Coffee size={22} />
          </IconBox>
          <Label>סעודות</Label>
        </ActionButton>

        <ActionButton href="https://pay.kli.one/he/form/help-haver?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back">
          <IconBox variant="rose">
            <Users size={22} />
          </IconBox>
          <Label>Help Haver</Label>
        </ActionButton>

        <ActionButton href="https://drive.google.com/drive/u/0/folders/1iZ1-GHlR03enXJqoUu-8QASk1EwoE5ND">
          <IconBox variant="indigo">
            <BookOpen size={22} />
          </IconBox>
          <Label>חומר לימוד</Label>
        </ActionButton>

        <ActionButton href="https://pay.kli.one/he/form/donation?utm_source=payment_system_civicrm_login&utm_medium=button&utm_campaign=donations&utm_id=donations&utm_term=heb&utm_content=homepage_button_donate#no-back">
          <IconBox variant="orange">
            <Heart size={22} />
          </IconBox>
          <Label>תרומות</Label>
        </ActionButton>
      </ActionsRow>
    </Wrapper>
  );
};

export default QuickActions;
