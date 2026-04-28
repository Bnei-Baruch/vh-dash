import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../contexts/PageTitleContext";


const DashboardPageLayout = ({
  Layout,
  Component,
  routeId,
  enableHeader,
  routeProps,
}) => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    if (enableHeader && routeId) {
      setTitle(t(`Dashboard.${routeId}.title`));
    }

    return () => {
      setTitle("");
    };
  }, [enableHeader, routeId, setTitle, t]);

  return (
    <Layout>
      <Component {...routeProps} />
    </Layout>
  );
};

export default DashboardPageLayout;

