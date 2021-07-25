import React, { useEffect } from 'react';
import { ARVUT_SYSTEM_URL } from '../../../constants/common';
const ArvutSystem = () => {
    useEffect(() => {
        window.location.href = ARVUT_SYSTEM_URL;
    }, []);
    return (
        <>Redirecting to Arvut System</>
    );
};

export default ArvutSystem;
