const axios = require("axios");
const request = require("request");

/**
 * @param {object} data
 * @param {string} data.message
 * @param {string[]} data.to
 */
exports.sendSMS = async (data) => {
  const { message, to } = data;

  console.log("do you here");
  const result = await request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: "u09364366269",
        pass: "S#2281836372?!f",
        fromNum: "3000505",
        toNum: to,
        patternCode: "fslwyxjwf6fugwu",
        inputData: [{ "verification-code": message }],
      },
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
        console.log("body is: ", response.body);
      } else {
        console.log("error is: ", error);
      }
    }
  );
  // console.log(result);
};

// {
//   "code": "zd7xxxxf5h",
//   "sender": "+983000505",
//   "recipient": "+989120000000",
//   "variable": {
//     "name": "Ø³Ù„Ø§Ù…ØŒâ€ŒØ¨Ù‡ IPPanel Ø®ÙˆØ´ Ø¢Ù…Ø¯ÛŒ"
//   }
// }

//   await axios
//     .post(
//       "https://api2.ippanel.com/api/v1/sms/pattern/normal/send",
//       // "http://ippanel.com/api/select"
//       {
//         op: "send",
//         uname: "u09364366269",
//         pass: "S#2281836372?!f",
//         message,
//         patternCode:"fslwyxjwf6fugwu",
//         to,
//         from: "3000505",
//         inputData:[{"verification-code":message}]
//       },
//       {
//         headers: {
//           apikey: "2cnJYHt9gVx2hn9u-t8UfMjXTi5RMDkqB_ClMa_axJg=",
//         },
//       }
//     )
//     .then((res) => {
//       console.log("response: ", res);
//     })
//     .catch((e) => console.log("error: ", e));
// };

// const test = {
//   info: {
//     _postman_id: "8c218bb1-5375-4d2e-b2b8-4d7c07c8fa85",
//     name: "VOTP",
//     schema:
//       "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
//     _exporter_id: "4699325",
//   },
//   item: [
//     {
//       name: "VOTP",
//       request: {
//         method: "POST",
//         header: [
//           {
//             key: "Content-Type",
//             type: "text",
//             value: "application/json",
//           },
//           {
//             key: "apikey",
//             value: "your_api_key",
//             type: "default",
//           },
//         ],
//         body: {
//           mode: "raw",
//           raw: '{\n    "recipient": [\n        "+989121111111","+989122222222"\n    ],\n    "sender": "+98VOTP",\n    "message": "12345",\n    "description": {\n        "summary": "msg summary",\n        "count_recipient": "2"\n    }\n}',
//         },
//         url: {
//           raw: "https://api2.ippanel.com/api/v1/sms/send/otp",
//           protocol: "https",
//           host: ["api2", "ippanel", "com"],
//           path: ["api", "v1", "sms", "send", "otp"],
//         },
//       },
//       response: [],
//     },
//   ],
// };
