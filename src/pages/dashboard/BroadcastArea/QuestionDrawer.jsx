import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  Box as MuiBox,
  IconButton as MuiIconButton,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Snackbar from "../../../components/SnackBar";

/* ---------- Styled Components ---------- */

const Drawer = styled(MuiDrawer)`
  width: 400px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: 400px;
    box-sizing: border-box;
    background-color: #fff;
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
`;

const HeaderTitle = styled(Typography)`
  && {
    color: ${(props) => props.theme.sidebar.header.color};
    font-weight: 500;
    font-size: 18px;
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
  const [type, setType] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Reset state when drawer closes
  React.useEffect(() => {
    if (!open) {
      setQText("");
      setDisabled(true);
      setPosting(false);
      setShowSnackbar(false);
    }
  }, [open]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setQText(value);
    setDisabled(value.trim() === "");
  };

  const postQuestion = () => {
    if (qText.trim() === "") {
      setSnackbarMessage(t("Dashboard.BroadcastArea.noText"));
      setType("error");
      setShowSnackbar(true);
      return;
    }

    setDisabled(true);
    setPosting(true);

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
        setSnackbarMessage(t("Dashboard.BroadcastArea.successPosted"));
        setType("success");
        setShowSnackbar(true);
        setPosting(false);
        setDisabled(true);
      })
      .catch(() => {
        setSnackbarMessage(t("Dashboard.BroadcastArea.errorPosting") || "Failed to post question");
        setType("error");
        setShowSnackbar(true);
        setPosting(false);
        setDisabled(false);
      });
  };

  return (
    <>
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
        </Content>
      </Drawer>

      <Snackbar show={showSnackbar} type={type} message={snackbarMessage} />
    </>
  );
};

export default QuestionDrawer;
