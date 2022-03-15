import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

import { setKeycloakData, setLoggedInUser, setMembershipData } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

import ErrorLogin from "../views/ErrorLogin";
import LoadingScreen from "../views/LoadingScreen";
import { fetchProfile } from "../redux/actions/profileActions";
import { getMembershipStatus } from "../services/membership.service";

const Auth = (props) => {
  const [auth, setAuth] = useState({ keycloak: null, authenticated: false });
  const dispatch = useDispatch();

  useEffect(() => {
    const keycloak = Keycloak(window.APP_CONFIG.KEYCLOAK_CONFIG);
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        keycloak.loadUserProfile().then(async function () {
          dispatch(setKeycloakData(keycloak));
          const membership = await getMembershipStatus(keycloak.profile.email);
          dispatch(setMembershipData(membership));
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
      });
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
