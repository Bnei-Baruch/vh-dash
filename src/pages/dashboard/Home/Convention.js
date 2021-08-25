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
const Typography = styled(MuiTypography)(spacing);

const ConventionIcon = styled.img`
    height: 25px;
    margin: 5px 10px
`;

const ConventionButton = styled(Button)`
    background-color: #FF6058;
    color: #fff;
    margin: 10px;
    :hover {
        background-color: #f9524a;
        border-color: #FF6058;
    }
    :active, :focus {
        background-color: #FF6058;
        border-color: #FF6058;
    }
`

const RegisterButton = styled(Button)`
    margin: 10px;
`;

const RegistrationText = styled.div`
    margin: auto 0px;
    font-weight: 600;
`;

const RegistrationContainer = styled(Box)`
    @media(max-width: 600px) {
        display: block;
        >div { 
            margin: 10px 0px;
        }
    }
`

const GreenTick = styled(CheckCircleOutlineOutlinedIcon)`
    color: green;
    vertical-align: sub;
    height: 0.75em;
`;

const RedCircle = styled(CancelOutlinedIcon)`
    color: red;
    vertical-align: sub;
    height: 0.7em;
`;

const Convention = () => {
    const { t, i18n } = useTranslation();
    const [registered, setRegistered] = useState(false);
    const keycloak = useSelector(state => state.userReducer.keycloak);

    useEffect(() => {
        if (keycloak.realmAccess.roles.includes(BB_CONVENTION_REGISTERED)) {
            setRegistered(true);
        }
    }, [])

    const navigateToRegister = () => {
        window.open(BB_CONVENTION_REGISTER_LINK, '_blank').focus();
    }

    const navigateToConvention = () => {
        window.open(`${BB_CONVENTION_REGISTER_SITE}${i18n.language}`, '_blank').focus();
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
                            <Typography variant='h2'>Convention Title</Typography>
                            <span>Convention Subtitle</span>
                        </div>
                    </Box>
                    <Typography variant='h3'>22/09</Typography>
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
                        {!registered && <RegisterButton color='primary' variant='contained' onClick={navigateToRegister}>{t('Home.register')} </RegisterButton>}
                        <ConventionButton onClick={navigateToConvention} color='primary' variant='contained'> {t('Home.conventionSite')} </ConventionButton>
                    </div>
                </RegistrationContainer>
            </CardContent>
        </Card>
    );
};

export default Convention;