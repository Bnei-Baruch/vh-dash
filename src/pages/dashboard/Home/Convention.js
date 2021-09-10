import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ConventionImage from "../../../asset/icons/convention_icon.svg";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { BB_CONVENTION_REGISTERED, BB_CONVENTION_REGISTER_LINK, BB_CONVENTION_REGISTER_SITE } from '../../../constants/common';
import { useSelector } from 'react-redux';
import { profileInfo } from '../../../redux/selectors/profile';
const Typography = styled(MuiTypography)(spacing);

const ConventionIcon = styled.img`
    height: 25px !important;
    margin: 5px 10px!important;
`;

const ConventionButton = styled(Button)`
    background-color: #FF6058 !important;
    color: #fff !important;
    margin: 10px !important;
    :hover {
        background-color: #f9524a !important;
        border-color: #FF6058 !important;
    }
    :active, :focus {
        background-color: #FF6058 !important;
        border-color: #FF6058 !important;
    }
`

const RegisterButton = styled(Button)`
    margin: 10px !important;
`;

const RegistrationText = styled.div`
    margin: auto 0px !important;
    font-weight: 600 !important;
    visibility: hidden;
`;

const RegistrationContainer = styled(Box)`
    @media(max-width: 600px) {
        display: block !important;
        >div { 
            margin: 10px 0px !important;
        }
    }
`

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
    const [registered, setRegistered] = useState(false);
    const profileData = useSelector(profileInfo);
    useEffect(() => {
        if(profileData && profileData.status) {
            const { ticket, membership, convention } = profileData.status
            if ((ticket || membership) && convention) {
                setRegistered(true);
            }
        }
    }, [profileData])

    const navigateToRegister = () => {
        window.open(BB_CONVENTION_REGISTER_LINK, '_blank').focus();
    }

    const navigateToConvention = () => {
        if (i18n.language === "en"){
            window.open(`${BB_CONVENTION_REGISTER_SITE}`, '_blank').focus();
        } else {
            window.open(`${BB_CONVENTION_REGISTER_SITE}${i18n.language}`, '_blank').focus();
        }
    }

    return (
        <Card mb={6}>
            <CardHeader
                title={t('Home.convention')}
            />
            <CardContent>
                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex'>
                        <ConventionIcon src={ConventionImage} />
                        <div>
                          <Typography variant='h2'>{t('Home.conventiontitle')}</Typography>
                          <span>{t('Home.conventionsubtitle')}</span>
                        </div>
                    </Box>
                    <Typography variant='h3'>24/09</Typography>
                </Box>
                <br />
                <MuiDivider />
                <br />
                <RegistrationContainer display='flex' justifyContent='space-between'>
                    <RegistrationText>
                        {registered && <> <GreenTick /> {t('Home.registered')}</>}
                        {!registered && <> <RedCircle /> {t('Home.notRegistered')}</>}
                    </RegistrationText>
                    <div>
                        <RegisterButton color='primary' variant='contained' onClick={navigateToRegister}>{t('Home.register')} </RegisterButton>
                        <ConventionButton onClick={navigateToConvention} color='primary' variant='contained'> {t('Home.conventionSite')} </ConventionButton>
                    </div>
                </RegistrationContainer>
            </CardContent>
        </Card>
    );
};

export default Convention;
