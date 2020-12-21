import React from 'react';
import {Card, CardHeader, IconButton} from '@material-ui/core';
import {MoreVertical} from 'react-feather';

const Arvut = () => {
  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Arvut"
      />
    </Card>
  );
};

export default Arvut;
