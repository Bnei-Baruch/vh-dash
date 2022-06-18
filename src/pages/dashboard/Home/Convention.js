import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ConventionImage from "../../../asset/icons/convention_icon.svg";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { BB_CONVENTION_REGISTER_SITE } from "../../../constants/common";
import { useSelector } from "react-redux";
import { profileInfo } from "../../../redux/selectors/profile";
import { getEventsListWithParticipationDetail } from "../../../services/events.service";
import moment from "moment";
const Typography = styled(MuiTypography)(spacing);

const ConventionIcon = styled.img`
  height: 25px !important;
  margin: 5px 10px !important;
`;

const ConventionButton = styled(Button)`
  background-color: #ff6058 !important;
  color: #fff !important;
  margin: -1px !important;
  :hover {
    background-color: #f9524a !important;
    border-color: #ff6058 !important;
  }
  :active,
  :focus {
    background-color: #ff6058 !important;
    border-color: #ff6058 !important;
  }
`;

const RegisterButton = styled(Button)`
  margin: -1px 10px !important;
`;

const RegistrationText = styled.div`
  margin: auto 0px !important;
  font-weight: 600 !important;
`;

const RegistrationContainer = styled(Box)`
  @media (max-width: 600px) {
    display: block !important;
    > div {
      margin: 10px 0px !important;
    }
  }
`;

const GreenTick = styled(CheckCircleOutlineOutlinedIcon)`
  color: green !important;
  vertical-align: sub !important;
  height: 0.75em !important;
`;

const RedCircle = styled(CancelOutlinedIcon)`
  color: red !important;
  vertical-align: sub !important;
  height: 0.7em !important;
`;

const Convention = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState(undefined);
  const [registered, setRegistered] = useState(false);
  const profileData = useSelector(profileInfo);
  useEffect(() => {
    if (profileData && profileData.status) {
      const { ticket, membership, convention } = profileData.status;
      if ((ticket || membership) && convention) {
        setRegistered(true);
      }
    }
    if (profileData && profileData.primary_email) {
      getEventsListWithParticipationDetail(profileData.primary_email).then(
        (res) => {
          if (res && res.length > 0) {
            setEvents(res[0]);
          }
        }
      );
    }
  }, [profileData]);

  const navigateToRegister = () => {
    window
      .open(
        `${window.location.origin}/pay/order/ticket/${events.slug}`,
        "_blank"
      )
      .focus();
  };

  const navigateToConvention = () => {
    if (i18n.language === "en") {
      window.open(`${BB_CONVENTION_REGISTER_SITE}`, "_blank").focus();
    } else {
      window
        .open(`${BB_CONVENTION_REGISTER_SITE}${i18n.language}`, "_blank")
        .focus();
    }
  };

  if (!events) return <></>;

  return (
    <Card mb={6}>
      <CardHeader title={t("Home.convention")} />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <ConventionIcon src={ConventionImage} />
            <div>
              <Typography variant="h3">{t(events.slug)}</Typography>
              <span>
                {moment(events.starts_on).format("DD/MM/YYYY")} -{" "}
                {moment(events.ends_on).format("DD/MM/YYYY")}
              </span>
            </div>
          </Box>
        </Box>
        <br />
        <MuiDivider />
        <br />
        <RegistrationContainer display="flex" justifyContent="space-between">
          <RegistrationText>
            {events.is_user_registered && (
              <>
                {" "}
                <GreenTick /> {t("Home.registered")}
              </>
            )}
            {!events.is_user_registered && (
              <>
                {" "}
                <RedCircle /> {t("Home.notRegistered")}
              </>
            )}
          </RegistrationText>
          <div>
            {!events.is_user_registered && (
              <RegisterButton
                color="primary"
                variant="contained"
                onClick={navigateToRegister}
              >
                {t("Home.register")}{" "}
              </RegisterButton>
            )}
            <ConventionButton
              onClick={navigateToConvention}
              color="primary"
              variant="contained"
            >
              {" "}
              {t("Home.conventionSite")}{" "}
            </ConventionButton>
          </div>
        </RegistrationContainer>
      </CardContent>
    </Card>
  );
};

export default Convention;
