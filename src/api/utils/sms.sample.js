const { default: axios } = require("axios");

exports.sendSMS = async () => {
  await axios
    .post(
      "https://api2.ippanel.com/api/v1/sms/pattern/normal/send",
      // "http://ippanel.com/api/select"
      {
        op: "send",
        uname: "u09364366269",
        pass: "Faraz@*********",
        message: "hi",
        to: ["0917*******"],
        // from: "1000XXX",
      },
      {
        headers: {
          apikey: "**************************",
        },
      }
    )
    .then((res) => {
      console.log("response: ", res);
    })
    .catch((e) => console.log("error: ", e));
};
