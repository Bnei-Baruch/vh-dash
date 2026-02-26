import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  Box as MuiBox,
  IconButton as MuiIconButton,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

/* ---------- Styled Components ---------- */

const Drawer = styled(MuiDrawer)`
  width: 400px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 400px;
    max-width: 100vw;
    box-sizing: border-box;
    background-color: #fff;
  }

  @media (max-width: 400px) {
    width: 100vw;

    .MuiDrawer-paper {
      width: 100vw;
    }
  }
`;

const DrawerHeader = styled(MuiBox)`
  height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  padding-inline-start: ${(props) => props.theme.spacing(3.5)}px;
  padding-inline-end: ${(props) => props.theme.spacing(1)}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: ${(props) => props.theme.sidebar.header.background};
  color: ${(props) => props.theme.sidebar.header.color};

  @media (max-width: 400px) {
    padding-inline-start: ${(props) => props.theme.spacing(2)}px;
    padding-inline-end: ${(props) => props.theme.spacing(0.5)}px;
  }
`;

const HeaderTitle = styled(Typography)`
  && {
    color: ${(props) => props.theme.sidebar.header.color};
    font-weight: 500;
    font-size: 18px;

    @media (max-width: 400px) {
      font-size: 16px;
    }
  }
`;

const CloseButton = styled(MuiIconButton)`
  && {
    color: ${(props) => props.theme.sidebar.header.color};
  }

  &&:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Content = styled(MuiBox)`
  height: 100%;
  padding: ${(props) => props.theme.spacing(3)}px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)}px;

  @media (max-width: 400px) {
    padding: ${(props) => props.theme.spacing(2)}px;
    gap: ${(props) => props.theme.spacing(2)}px;
  }
`;

const QuestionTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;

/* ---------- API ---------- */

const postBroadcastQuestion = (body) => {
  return axios
    .post(`https://qst.kli.one/api/ask`, body)
    .then((res) => res.data);
};

/* ---------- Component ---------- */

const QuestionDrawer = ({ open, onClose }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.userReducer.info);

  const [qText, setQText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [posting, setPosting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message: string } | null

  // Reset state when drawer closes
  React.useEffect(() => {
    if (!open) {
      setQText("");
      setDisabled(true);
      setPosting(false);
      setFeedback(null);
    }
  }, [open]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setQText(value);
    setDisabled(value.trim() === "");
    if (feedback) setFeedback(null);
  };

  const postQuestion = () => {
    if (qText.trim() === "") {
      setFeedback({ type: "error", message: t("Dashboard.BroadcastArea.noText") });
      return;
    }

    setDisabled(true);
    setPosting(true);
    setFeedback(null);

    const body = {
      askForMe: true,
      serialUserId: user?.keycloak?.subject,
      question: { content: qText },
      user: {
        gender: user?.profile?.gender,
        name: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
        galaxyRoom: "Dashboard Area",
      },
    };

    postBroadcastQuestion(body)
      .then(() => {
        setQText("");
        setFeedback({ type: "success", message: t("Dashboard.BroadcastArea.successPosted") });
        setPosting(false);
        setDisabled(true);
      })
      .catch(() => {
        setFeedback({ type: "error", message: t("Dashboard.BroadcastArea.errorPosting") || "Failed to post question" });
        setPosting(false);
        setDisabled(false);
      });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <DrawerHeader>
        <HeaderTitle variant="h6">
          {t("Dashboard.BroadcastArea.questions")}
        </HeaderTitle>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
      </DrawerHeader>

      <Content>
        <QuestionTextField
          label={t("Dashboard.BroadcastArea.yourQuestion")}
          variant="outlined"
          multiline
          fullWidth
          maxRows={4}
          value={qText}
          onChange={handleTextChange}
          disabled={posting}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={postQuestion}
          fullWidth
        >
          {posting
            ? t("Dashboard.BroadcastArea.posting")
            : t("Dashboard.BroadcastArea.postYourQuestion")}
        </Button>

        {feedback && (
          <MuiAlert severity={feedback.type} onClose={() => setFeedback(null)}>
            {feedback.message}
          </MuiAlert>
        )}
      </Content>
    </Drawer>
  );
};

export default QuestionDrawer;
