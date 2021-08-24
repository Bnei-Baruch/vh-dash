import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    makeStyles,
    Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ConventionImage from "../../../asset/icons/convention_icon.svg";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
const Typography = styled(MuiTypography)(spacing);

const ConventionIcon = styled.img`
height: 40px;
`;

const ConventionButton = styled(Button)`
    background-color: #FF6058;
    color: #fff;

`

const GreenTick = styled(CheckCircleIcon)`
color: green
`
const RedCircle = styled(CancelIcon)`
color: red`;
const useStyles = makeStyles({
    cardTitle: {
        fontSize: 14,
        color: '#ff0000',
    },
});

const Convention = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    // TODO: add friendsFromTen variable to an array when get updates from BE
    const [registered, setRegistered] = useState(false);
    const user = useSelector(state => state.userReducer.info.profile);

    useEffect(() => {
    }, []);

    useEffect(() => {
    }, []);

    return (
        <Card mb={6}>
            <CardHeader
                title={t('Home.convention')}
                classes={{ title: classes.cardTitle }}
            />
            <CardContent>

                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex'>
                        <ConventionIcon src={ConventionImage} />
                        <div>
                            <Typography variant='h3'>Convention Title</Typography>
                            <span>Convention Subtitle</span>
                        </div>
                    </Box>
                    <Typography variant='h3'>22/09</Typography>
                </Box>
                <hr/>
                <Box display='flex' justifyContent='space-between'>
                    <div>
                        { registered  && <> <GreenTick /> You are registered </>}
                        { !registered  && <> <RedCircle /> You are not registered </>}
                    </div>
                    <div>
                        <Button color='primary' variant='contained'>Register </Button>
                        <ConventionButton color='primary' variant='contained'> Convention</ConventionButton>
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Convention;
