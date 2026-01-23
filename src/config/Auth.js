import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

import {
  setKeycloakData,
  setLoggedInUser,
  setMembershipDataV2
} from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

import ErrorLogin from "../views/ErrorLogin";
import LoadingScreen from "../views/LoadingScreen";
import { fetchProfile } from "../redux/actions/profileActions";
import { getMembershipStatusV2 } from "../services/membership.service";
import { getDebugUser } from "../shared/featureFlags";

const Auth = (props) => {
  const [auth, setAuth] = useState({ keycloak: null, authenticated: false });
  const dispatch = useDispatch();

  useEffect(() => {
    const keycloak = new Keycloak(window.APP_CONFIG.KEYCLOAK_CONFIG);
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        keycloak.loadUserProfile().then(async function () {
          // Debug mode: Override keycloak subject if debug_user is set
          const debugUser = getDebugUser();
          if (debugUser) {
            console.warn('[Debug Mode] 🔧 Overriding keycloak.subject globally');
            console.warn('[Debug Mode] 📝 Original:', keycloak.subject);
            console.warn('[Debug Mode] 📝 Debug User:', debugUser);
            console.warn('[Debug Mode] ⚠️  Backend will reject this unless bypass is enabled!');

            // Override the subject property
            Object.defineProperty(keycloak, 'subject', {
              get: () => debugUser,
              configurable: true
            });
          }

          dispatch(setKeycloakData(keycloak));

          const membership = await getMembershipStatusV2(keycloak.subject);
          dispatch(setMembershipDataV2(membership));
          
          const profile = {
            username: keycloak.profile.username,
            firstName: keycloak.profile.firstName,
            lastName: keycloak.profile.lastName,
            email: keycloak.profile.email,
            token: keycloak.token,
            // TODO: Add gender to the response
            gender: "male",
          };
          setAuth({
            keycloak,
            authenticated,
            profile,
          });
        });
      }).catch((err) => {
        console.error("Keycloak initialization failed:", err);
        setAuth({ keycloak, authenticated: false });
      })  ;
  }, [dispatch]);

  if (auth.keycloak) {
    if (auth.authenticated) {
      dispatch(setLoggedInUser(auth));
      dispatch(fetchProfile());
      return <>{props.children}</>;
    } else {
      return (
        <>
          <ErrorLogin />
        </>
      );
    }
  } else {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
};

export default Auth;
