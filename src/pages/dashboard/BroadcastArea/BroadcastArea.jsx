import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";

import Broadcast from "./Broadcast";
import BroadcastQuestions from "./BroadcastQuestions";
import MembershipRequired from "./MembershipRequired";
import { membershipDataV2 } from "../../../redux/selectors/user";

const useStyles = makeStyles((theme) => ({
  rightButton: {
    marginTop: "10px",
  },
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const membershipData = useSelector(membershipDataV2);

  if (!membershipData?.active) {
    return <MembershipRequired />;
  }

  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={12} className={classes.rightButton}>
          <Broadcast />
          <BroadcastQuestions />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <Annoucements /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default BroadcastArea;



// import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid } from "@material-ui/core";
// import { useTranslation } from "react-i18next";
// import { useSelector, useDispatch } from "react-redux";
// import Helmet from "react-helmet";

// import Broadcast from "./Broadcast";
// import BroadcastQuestions from "./BroadcastQuestions";
// import MembershipRequired from "./MembershipRequired";
// import { getMembershipStatusV2 } from "../../../services/membership.service";
// import { setMembershipDataV2 } from "../../../redux/actions/userActions";
// import { membershipDataV2, keycloakData } from "../../../redux/selectors/user";

// const useStyles = makeStyles((theme) => ({
//   rightButton: {
//     marginTop: "10px",
//   },
// }));

// const BroadcastArea = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
  
//   const keycloakId = useSelector((state) => state.userReducer.keycloak?.subject);
//   const membershipData = useSelector(membershipDataV2);

//   Load membership data if not available
//   useEffect(() => {
//     if (keycloakId && Object.keys(membershipData).length === 0) {
//       getMembershipStatusV2(keycloakId).then((res) => {
//         dispatch(setMembershipDataV2(res));
//       });
//     }
//   }, [keycloakId, membershipData, dispatch]);


//   // Check if user has active membership
//   if (membershipData?.isActive !== true) {
//     return <MembershipRequired />;
//   }

//   return (
//     <>
//       <Helmet title={t("Dashboard.BroadcastArea.name")} />

//       <Grid container spacing={10}>
//         <Grid item xs={12} sm={12} md={12} className={classes.rightButton}>
//           <Broadcast />
//           <BroadcastQuestions />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4}>
//           {/* <Annoucements /> */}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default BroadcastArea;
