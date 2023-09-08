import axios from "axios";

export const getMembershipStatus = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/status/${email}`)
    .then((res) => res.data);
};

//checking - recurring payment

// export const getMembershipStatusv2 = (email) => {

//   let data = {
//     "id": 53,
//     "active": true,
//     "user_id": "7182e0e4-7e43-4836-9e92-c3285bc9cb66",
//     "type": "automatic",
//     "month": 8,
//     "year": 2023,
//     "expiry": "2023-09-28T01:15:31.986778Z",
//     "created_at": "2023-08-29T01:06:35.993963Z",
//     "updated_at": "2023-08-29T01:15:32.179096Z",
//     "deleted_at": null,
//     "notifications": [
//       {
//         "slug": "mb_has_expired_notice",
//         "content": {
//           "en": "Your membership has expired",
//           "ru": "Your membership has expired"
//         }
//       }

//     ],
//     "details": {
//       "payment": {
//         "date": "2023-08-29T01:15:31.698962Z",
//         "amount": 10,
//         "currency": "2",
//         "payment_method": "xxxxxxxxxxxxxxxx",
//         "status": "failed"
//       },
//       "automatic": {
//         "order_id": 344,
//         "payment_id": 344
//       },
//       "special": {},
//       "help_haver": {}
//     }
//   };
//   return Promise.resolve(data);
// };
// export const getMembershipStatusv2 = (email) => {
//   let data = {
//     "id": 53,
//     "active": false,
//     "user_id": "7182e0e4-7e43-4836-9e92-c3285bc9cb66",
//     "type": "automatic",
//     "month": 8,
//     "year": 2023,
//     "expiry": "2023-09-28T01:15:31.986778Z",
//     "created_at": "2023-08-29T01:06:35.993963Z",
//     "updated_at": "2023-08-29T01:15:32.179096Z",
//     "deleted_at": null,
//     "notifications": [
//       {
//         "slug": "mb_problem_previous_payment",
//         "content": {
//           "en": "There was a problem with the previous payment",
//           "ru": "There was a problem with the previous payment"
//         }
//       }
//       // {
//       //   "slug": "mb_cancelled",
//       //   "content": {
//       //     "en": "Your membership has been cancelled",
//       //     "ru": "Your membership has been cancelled"
//       //   }
//       // }
//       // {
//       //   "slug": "mb_problem_previous_payment",
//       //   "content": {
//       //     "en": "There was a problem with the previous payment",
//       //     "ru": "There was a problem with the previous payment"
//       //   }
//       // }
//       // {
//       //   "slug": "mb_new",
//       //   "content": {
//       //     "en": "You do not have a membership yet",
//       //     "ru": "You do not have a membership yet"
//       //   }
//       // }
//     ],
//     "details": {
//       "payment": {
//         "date": "2023-08-29T01:15:31.698962Z",
//         "amount": 10,
//         "currency": "2",
//         "payment_method": "xxxxxxxxxxxxxxxx",
//         "status": "failed"
//       },
//       "automatic": {
//         "order_id": 344,
//         "payment_id": 344
//       },
//       "special": {},
//       "help_haver": {}
//     }
//   };
//   return Promise.resolve(data);
// };


export const getMembershipStatusv2 = (email) => {

  let data = {
    "id": 53,
    "active": true,
    "user_id": "7182e0e4-7e43-4836-9e92-c3285bc9cb66",
    "type": "automatic",
    "month": 8,
    "year": 2023,
    "expiry": "2023-09-28T01:15:31.986778Z",
    "created_at": "2023-08-29T01:06:35.993963Z",
    "updated_at": "2023-08-29T01:15:32.179096Z",
    "deleted_at": null,
    "notifications": [
      {
        "slug": "mb_problem_previous_payment",
        "content": {
          "en": "There was a problem with the previous payment",
          "ru": "There was a problem with the previous payment"
        }
      }
    ],
    "details": {
      "payment": {
        "date": "2023-08-29T01:15:31.698962Z",
        "amount": 10,
        "currency": "2",
        "payment_method": "1234123412341234",
        "status": "success"
      },
      "automatic": {
        "order_id": 344,
        "payment_id": 344
      },
      "special": {},
      "help_haver": {}
    }
  };


  return Promise.resolve(data);
};



