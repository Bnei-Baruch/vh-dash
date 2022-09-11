import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PaymentAction() {
  const { t, i18n } = useTranslation();

  const redirectToPayment = () => {
    window
      .open(
        `${window.location.origin}/pay/order/1?lang=${i18n.language}`,
        "_blank"
      )
      .focus();
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={redirectToPayment}>
        {t('Membership.activate_membership')}
      </Button>
      &nbsp;
      <Button variant="contained" color="primary" onClick={redirectToPayment}>
        {t('Membership.update_payment_details')}
      </Button>
      &nbsp;
      <Button variant="contained" color="primary">
        {t('Membership.make_new_payment')}
        </Button>
        &nbsp;
      <Button variant="outlined" color="primary">
      {t('Membership.switch_membership_type')}
      </Button>
      &nbsp;
      <Button> 
      {t('Membership.cancel_membership')}
      </Button>
    </div>
  );
}
