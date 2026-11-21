import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";

// Reopens the CookieYes preferences, so consent can be changed as easily as it was given (GDPR 7(3))
const CookieSettings = () => (
  <Tooltip title="Cookie settings">
    <IconButton size="small" aria-label="Cookie settings" onClick={() => window.revisitCkyConsent?.()}>
      <img src="https://cdn-cookieyes.com/assets/images/revisit.svg" alt="" width={22} height={22} style={{filter: "brightness(0)"}}/>
    </IconButton>
  </Tooltip>
);

export default CookieSettings;
