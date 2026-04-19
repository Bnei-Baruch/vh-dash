import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles";
import { MessageSquare, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPosts } from "../../../services/messages.service";

/* ===== Styled Components ===== */

const Wrapper = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(6)}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${grey[200]};
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 440px;
  box-sizing: border-box;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding-inline-end: 10px;
  scrollbar-width: thin;
  scrollbar-color: ${grey[300]} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${grey[300]};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${grey[400]};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)}px;
  margin-bottom: ${(p) => p.theme.spacing(2.5)}px;
`;

const HeaderIcon = styled.div`
  color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  margin: 0;
  flex: 1;
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(0.5)}px;
  margin-inline-start: auto;
`;

const Counter = styled.span`
  font-size: 13px;
  color: ${(p) => p.theme.palette.text.secondary};
  min-width: 36px;
  text-align: center;
`;

const NavButton = styled(IconButton)`
  && {
    padding: ${(p) => p.theme.spacing(0.5)}px;
    color: ${grey[500]};

    &:hover:not(:disabled) {
      color: ${(p) => p.theme.palette.primary.main};
      background-color: ${(p) => fade(p.theme.palette.primary.main, 0.1)};
    }

    &:disabled {
      color: ${grey[300]};
    }
  }
`;

const Spinner = styled.div`
  text-align: center;
  padding: ${(p) => p.theme.spacing(5)}px 0;
`;

const EmptyText = styled(Typography)`
  && {
    text-align: center;
    padding: ${(p) => p.theme.spacing(4)}px 0;
    color: ${(p) => p.theme.palette.text.secondary};
  }
`;

const ErrorText = styled(Typography)`
  && {
    text-align: center;
    padding: ${(p) => p.theme.spacing(2)}px 0;
    color: ${(p) => p.theme.palette.error.main};
  }
`;

const LanguageNotice = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(1)}px;
  background: ${(p) => fade(p.theme.palette.primary.main, 0.08)};
  color: ${(p) => p.theme.palette.text.primary};
  padding: ${(p) => p.theme.spacing(1)}px ${(p) => p.theme.spacing(1.5)}px;
  border-radius: ${(p) => p.theme.spacing(1)}px;
  font-size: 13px;
  margin-bottom: ${(p) => p.theme.spacing(2)}px;
`;

const PostContent = styled.div`
  direction: ${(p) => (p.$rtl ? "rtl" : "ltr")};
`;

const PostDate = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme.palette.text.secondary};
  margin-bottom: ${(p) => p.theme.spacing(1)}px;
`;

const PostText = styled.div`
  font-size: 15px;
  color: ${(p) => p.theme.palette.text.primary};
  line-height: 1.6;
  font-weight: 400;
  white-space: pre-line;
`;

const PostLink = styled.a`
  color: ${(p) => p.theme.palette.primary.main};
  text-decoration: underline;
  word-break: break-all;
  font-size:14px;
    &:hover {
    color: ${(p) => p.theme.palette.primary.dark};
    }
`;

const PostMedia = styled.img`
  margin-top: ${(p) => p.theme.spacing(1.5)}px;
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: ${(p) => p.theme.spacing(1)}px;
  border: 1px solid ${grey[200]};
`;

/* ===== Helpers ===== */

const formatDate = (dateStr, locale) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const HEBREW_REGEX = /[\u0590-\u05FF]/;
const isHebrewText = (text) => !!text && HEBREW_REGEX.test(text);

const LEADING_SYMBOLS_REGEX = /^[\p{Emoji}\p{S}\p{P}\s]+/u;

const stripLeadingSymbols = (text) =>
  text ? text.replace(LEADING_SYMBOLS_REGEX, "") : text;

const URL_REGEX = /(https:\/\/[^\s]+)/g;

const renderTextWithLinks = (text) => {
  if (!text) return null;
  return text.split(URL_REGEX).map((part, i) =>
    part.startsWith("https://") ? (
      <PostLink key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </PostLink>
    ) : (
      part
    )
  );
};

/* ===== Component ===== */

const Messages = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir(i18n.language) === "rtl";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getPosts()
      .then((data) => {
        const list = Array.isArray(data) ? data : [] ;
        setPosts(list);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(t("Dashboard.Messages.error"));
        setLoading(false);
      });
  }, [t]);

  const post = posts[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < posts.length - 1;

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <Wrapper>
      <Header>
        <HeaderIcon>
          <MessageSquare size={24} />
        </HeaderIcon>
        <HeaderTitle>{t("Dashboard.Messages.title")}</HeaderTitle>

        {!loading && !errorMessage && posts.length > 0 && (
          <NavControls>
            <NavButton
              size="small"
              disabled={!hasPrev}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              <PrevIcon size={18} />
            </NavButton>
            <Counter>{currentIndex + 1} / {posts.length}</Counter>
            <NavButton
              size="small"
              disabled={!hasNext}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              <NextIcon size={18} />
            </NavButton>
          </NavControls>
        )}
      </Header>

      {i18n.language !== "he" && (
        <LanguageNotice>
          <Info size={14} />
          {t("Dashboard.Messages.hebrewOnly")}
        </LanguageNotice>
      )}

      <ContentArea>
        {loading && (
          <Spinner>
            <CircularProgress size={32} />
          </Spinner>
        )}

        {!loading && errorMessage && (
          <ErrorText>{errorMessage}</ErrorText>
        )}

        {!loading && !errorMessage && posts.length === 0 && (
          <EmptyText>{t("Dashboard.Messages.empty")}</EmptyText>
        )}

        {!loading && !errorMessage && post && (
          <>
          <PostDate>{formatDate(post.date, i18n.language)}</PostDate>
          <PostContent $rtl={isHebrewText(post.text)}>
            <PostText>{renderTextWithLinks(stripLeadingSymbols(post.text))}</PostText>
            {post.mediaUrl && (
              <PostMedia src={post.mediaUrl} alt="" loading="lazy" />
            )}
          </PostContent>
          </>
        )}
      </ContentArea>
    </Wrapper>
  );
};

export default Messages;
