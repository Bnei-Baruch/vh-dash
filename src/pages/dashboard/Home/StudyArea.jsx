import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { grey } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles";
import { Play, Users, BookOpen, LibraryBig, ChevronLeft, ChevronRight } from "lucide-react";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${grey[200]};
  display: flex;
  flex-direction: row;
  overflow: hidden;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const LinksPanel = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  margin: 0;
`;

const HeaderIcon = styled.div`
  color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  align-items: center;
`;

const StudyLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid ${grey[100]};
  flex-direction: row;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${grey[50]};
    padding-left: 4px;
    padding-right: 4px;
    margin-left: -4px;
    margin-right: -4px;
    border-radius: 8px;
  }
`;

const LinkIcon = styled.div`
  background: ${(p) => fade(p.theme.palette.primary.main, 0.1)};
  color: ${(p) => p.theme.palette.primary.main};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  ${StudyLinkRow}:hover & {
    background: ${(p) => fade(p.theme.palette.primary.main, 0.2)};
  }
`;

const LinkText = styled.div`
  flex: 1;
  font-weight: 600;
  color: ${(p) => p.theme.palette.text.secondary};
  font-size: 15px;

  ${StudyLinkRow}:hover & {
    color: ${(p) => p.theme.palette.primary.main};
  }
`;

const ChevronIcon = styled.div`
  color: ${grey[300]};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  ${StudyLinkRow}:hover & {
    color: ${(p) => p.theme.palette.primary.main};
  }
`;

/* ===== Component ===== */

const StudyArea = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir(i18n.language) === "rtl";

  const studyLinks = [
    { id: 1, text: t("Dashboard.StudyArea.liveBroadcastAlone"), icon: Play, href: "/dash/broadcast" },
    { id: 2, text: t("Dashboard.StudyArea.liveBroadcastWithTen"), icon: Users, href: "https://arvut.kli.one/user/" },
    { id: 3, text: t("Dashboard.StudyArea.kabbalaMedia"), icon: BookOpen, href: "https://kabbalahmedia.info" },
    { id: 4, text: t("Dashboard.StudyArea.studyMaterials"), icon: LibraryBig, href: "https://study.kli.one/" },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  };

  return (
    <Wrapper>
      <LinksPanel>
        <SectionHeader>
          <HeaderIcon>
            <BookOpen size={24} />
          </HeaderIcon>
          <HeaderTitle>{t("Dashboard.StudyArea.title")}</HeaderTitle>
        </SectionHeader>

        {studyLinks.map((link) => {
          const IconComponent = link.icon;
          const ChevronComponent = isRTL ? ChevronLeft : ChevronRight;
          return (
            <StudyLinkRow
              key={link.id}
              onClick={(e) => handleLinkClick(link.href, e)}
            >
              <LinkIcon>
                <IconComponent size={20} strokeWidth={2} />
              </LinkIcon>
              <LinkText>{link.text}</LinkText>
              <ChevronIcon>
                <ChevronComponent size={16} />
              </ChevronIcon>
            </StudyLinkRow>
          );
        })}
      </LinksPanel>
    </Wrapper>
  );
};

export default StudyArea;
