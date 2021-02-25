import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  asyncHeartbeat,
  asyncFetchStreams,
  changeVolume,
  changeLanguage,
} from '../../redux/actions/streamActions';
import { HEARTBEAT_INTERVAL } from '../../redux/constants';
import LanguagesMenu from './LanguagesMenu';

const useStyles = makeStyles({
  noBroadcast: {
    backgroundColor: 'lightgray',
    height: 400,
    lineHeight: 400,
    textAlign: 'center',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      height: 200,
      lineHeight: 200,
    },
  },
  message: {
    lineHeight: 'normal',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
  caption: {
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
});

const HLSPlayer = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(state => state.streamReducer);

  useEffect(() => {
    const id = setInterval(dispatchHeartbeat, HEARTBEAT_INTERVAL);

    dispatchHeartbeat();
    dispatch(asyncFetchStreams(state.selectedLanguage));

    return () => {
      clearInterval(id);
      clearPlayer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedLanguage]);

  const dispatchHeartbeat = () => {
    const { selectedBitrate } = state;
    dispatch(asyncHeartbeat(state.selectedLanguage, selectedBitrate));
  };

  const onLangSelected = lang => {
    console.info('Lang selected', lang);
    clearPlayer();
    dispatch(changeLanguage(lang));
    dispatch(asyncFetchStreams(lang));
  };

  // const onBitrateSelected = bitrate => {
  //   console.info('Bitrate selected', bitrate);
  //   clearPlayer();
  //   changeBitrate(bitrate);
  // };

  const setupPlayer = (sources, volume) => {
    console.info(
      'Setting up player',
      sources.map(source => source.file),
    );
    window
      .jwplayer('jwplayer-container')
      .setup({
        playlist: [{ sources: sources }],
        autostart: true,
        aspectratio: '16:9',
        width: '100%',
      })
      .setVolume(volume)
      .on('volume', event => {
        console.info('Volume changed', event.volume);
        dispatch(changeVolume(event.volume));
      });
  };

  const clearPlayer = () => {
    if (!document.getElementById('jwplayer-container')) return;

    const jwp = window.jwplayer('jwplayer-container');
    if (jwp && jwp.getState() !== null) {
      jwp.stop();
      jwp.remove();
    }
  };

  const chooseStream = (streams, bitrate) => {
    if (streams.has(bitrate)) {
      return streams.get(bitrate);
    } else {
      return streams.values().next().value;
    }
  };

  const { streams, selectedBitrate, selectedVolume, broadcast } = state;
  const statusPhrase = broadcast
    ? t('Dashboard.CongressArea.loading')
    : t('Dashboard.CongressArea.noBroadcast');

  // Setup jwplayer if it is idle and we're broadcasting
  if (broadcast) {
    if (
      window.jwplayer &&
      streams.hasOwnProperty(state.selectedLanguage) &&
      document.getElementById('jwplayer-container') !== null &&
      window.jwplayer('jwplayer-container').getState() == null
    ) {
      const stream = chooseStream(
        streams[state.selectedLanguage],
        selectedBitrate,
      );
      const sources = [{ file: stream.hls }, { file: stream.rtmp }];
      setupPlayer(sources, selectedVolume);
    }
  } else {
    clearPlayer();
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='baseline'>
        <Typography variant='h3' className={classes.caption}>
          {t('Dashboard.CongressArea.broadcast')}
        </Typography>
        <LanguagesMenu
          languages={state.languages}
          onLangSelected={onLangSelected}
        />
      </Box>
      <Box className='player'>
        <Box id='jwplayer-container'>
          <Box className={classes.noBroadcast}>
            <span className={classes.message}>{statusPhrase}</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HLSPlayer;
