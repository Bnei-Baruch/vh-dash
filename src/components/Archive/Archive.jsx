import React, { useEffect } from 'react';
import { ARCHIVE_LINK } from '../../constants/common';
const Archive = () => {
    useEffect(() => {
        window.location.href = ARCHIVE_LINK;
    }, []);
    return (
        <>Redirecting to Archive System</>
    );
};

export default Archive;
