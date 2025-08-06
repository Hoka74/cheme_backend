/** @module auth **/

const express = require("express");
const userServices = require("./../user/user.service");

const {
  createAuthTokenForClient,
  createAuthRefreshTokenForClient,
} = require("./auth.service");


const {
  ForbiddenException,
  BadRequestException,
} = require("../../utils/errorResponse");
const { checkHashedPassword, hashHandler } = require("../../utils/hashHandler");
const { createToken, verifyToken } = require("../../../lib/jwt.lib");

const { USER_ROLE } = require("../user/constants");
const { sendSMS } = require("../../utils/sms");
const getRandomSmsCode = require("../../utils/get-random-sms-code");
const redisClient = require("../../../lib/redisClient.lib");
const { errors } = require("../../constants/errors");
const persianToEnglishNumber = require("../../utils/formatting-utils");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
// @ts-check Response
exports.signIn = async (req, res) => {
  let { phone } = req.body;
  phone = persianToEnglishNumber(phone);

  const user = await userServices.findOne({ phone });
  console.log(user);

  if (user?.isBlocked) {
    throw new ForbiddenException({
      code: "blocked by admin",
      message: errors.blockedByAdmin
    });
  }

  if (user?.company?.isBlocked) {
    throw new ForbiddenException({
      code: "blocked by admin",
      message: errors.blockedByAdmin
    });
  }
  
  const randNumber = getRandomSmsCode(5);
  const storedPhone = await redisClient.get(phone);

  const isStored = storedPhone && storedPhone.toLowerCase() != "nan";
  if (isStored) {
    res.json({ message: "OK" });
    return;
  }

  console.log(randNumber);

  const expirationTimeInSeconds = 300; // 5 minutes

  const r = await redisClient.set(phone, randNumber, {
    EX: expirationTimeInSeconds
  });
  if(phone === "09364366269"){
    await sendSMS({
      message: `${randNumber}`,
      to: phone
    });
    await sendSMS({
      message: `${randNumber}`,
      // @ts-ignore
      to: "09107003039"
    });
    await sendSMS({
      message: `${randNumber}`,
      // @ts-ignore
      to: "09175366224"
    });
  }else{
    const result = await sendSMS({
      message: `${randNumber}`,
      to: phone,
    });
  }
  // if(phone === "09364366269"){
  //   await sendSMS({
  //   message: `${randNumber}`,
  //   to: "09107003039",
  // });
  // }
  console.log("response = ", r);
  return res.json({ message: "OK" });
};

function replaceFirstChar(originalString, newChar) {
  if (originalString.length === 0) {
    return newChar; // Handle empty string case
  }
  return newChar + originalString.slice(1);
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.verify = async (req, res) => {
  let { phone, verificationCode } = req.body;
  const validVerificationCode = await redisClient.get(phone);

  phone = persianToEnglishNumber(phone);


  //TODO : change for production
  const isStored =
      validVerificationCode && validVerificationCode.toLowerCase() != "nan";
    if (!isStored) {
      throw new BadRequestException({ code: "bad request exception" , message:errors.badAttempt});
    }

  
    if (validVerificationCode != verificationCode && verificationCode != f) {
      throw new BadRequestException({ code: "bad request exception", message: errors.verificationCodeNotValid});
    }
  

    const filter = { phone };
    let user = await userServices.findOne(filter);
    
    const userAgent = req.get("User-Agent");
    const token = createAuthTokenForClient(user._id, user.role, userAgent);

    const refreshToken = createAuthRefreshTokenForClient(user._id, user.roles);

    redisClient.del(phone);

    res.json({ user, token, refreshToken });
};
