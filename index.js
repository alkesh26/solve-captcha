const axios = require("axios");
const captcha = require("2captcha");
var FormData = require('form-data');

const solver = new captcha.Solver("<My API key>");

const bypassWebsiteCaptcha = async () => {
  console.log("Initiate captcha process");

  try {
    const { data } = await solver.recaptcha(
      "6LexF0sUAAAAADiQjz9BMiSrqplrItl-tWYDSfWa",
      "https://www.geeksforgeeks.org/"
    );

    var bodyFormData = new FormData();
    bodyFormData.append("reqType", "Register");
    bodyFormData.append("email", "12sam1234@sam.co");
    bodyFormData.append("pass", "sam1234!@#$");
    bodyFormData.append("institute", "big data");
    bodyFormData.append("g-recaptcha-response", data);
    bodyFormData.append("to", "https://auth.geeksforgeeks.org/?to=https://www.geeksforgeeks.org/");

    axios({
      method: "post",
      url: "https://auth.geeksforgeeks.org/auth.php",
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json, text/javascript, */*; q=0.01" },
    })
    .then(function (response) {
      console.log("In success");
      console.log(response.data);
    })
    .catch(function (response) {
      console.log("In failure");
      console.log(response);
    });
  } catch (err) {
    console.log("In catch");
    console.log(err);
  }
};

bypassWebsiteCaptcha();
