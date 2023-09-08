import axios from "axios";

export const getUserPreviousPayments = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/payments/all/${email}`)
    .then((res) => res.data.data);
};

export const getUserLastPayment = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/payments/last/${email}`)
    .then((res) => res.data.data);
};

export const getUserPreviousPayments2 = (email) => {
  // Sample data representing previous payment history
  const demoPayments = [
    {
      created_at: "2023-06-10T09:00:00Z",
      type: "Purchase",
      product_type: "Subscription",
      amount: 100,
      currency: "USD",
      payment_id: "12345",
      cc_number: "**** **** **** 1234",
      payment_status: "success",
    },
    {
      created_at: "2023-07-10T14:30:00Z",
      type: "Purchase",
      product_type: "Subscription",
      amount: 100,
      currency: "USD",
      payment_id: "67890",
      cc_number: "**** **** **** 1234",
      payment_status: "success",
    },
    {
      created_at: "2023-08-10T18:15:00Z",
      type: "Purchase",
      product_type: "Subscription",
      amount: 100,
      currency: "USD",
      payment_id: "54321",
      cc_number: "**** **** **** 1234",
      payment_status: "success",
    },
  ];
  return Promise.resolve(demoPayments);
}


export const getUserLastPayment2 = (email) => {

  const demoPayments = getUserLastPayment2()
  return demoPayments[demoPayments.length - 1]
}

// export default getUserPreviousPayments;
// export default getUserLastPayment;

export default getUserPreviousPayments2;
// export default getUserLastPayment2;


