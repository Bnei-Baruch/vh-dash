import React from "react";

const DashboardPageLayout = ({ Layout, Component, routeProps }) => {
  return (
    <Layout>
      <Component {...routeProps} />
    </Layout>
  );
};

export default DashboardPageLayout;
