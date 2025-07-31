/** @namespace middleware.auth */

const express = require("express");

const {
  UnauthorizedException,
  ForbiddenException,
} = require("../utils/errorResponse");
const { verifyToken } = require("../../lib/jwt.lib");
const userService = require("../modules/user/user.service");
const { prepareMemberAccess } = require("../utils/prepareMemberAccess");
const { default: mongoose } = require("mongoose");

/**
 * Check access & authorization (admin, manager, employee)
 * @memberof middleware.auth
 * @param {{
 *  onlyAdmin?:Boolean,
 *  onlyManager?:Boolean,
 *  onlyRefreshToken?:Boolean,
 *  adminAccess?:Boolean
 *  checkCreditAccess?:Boolean
 * }} props
 */
const useAuth = (props) => {
  const {
    adminAccess = false,
    onlyAdmin = false,
    onlyManager = false,
    onlyRefreshToken = false,
    checkCreditAccess = false,
  } = props;
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return async (req, res, next) => {
    let BearerToken;
    if (onlyRefreshToken) {
      const { refreshToken } = req.body;
      BearerToken = refreshToken;
    } else {
      BearerToken = req.headers.authorization;
    }
    
    if (!BearerToken) throw new UnauthorizedException();

    
    const token = BearerToken?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedException();

    
    let tokenData = {};
    try {
      tokenData = verifyToken(token, "AUTH");
    } catch (error) {
      throw new UnauthorizedException();
    }

    const isAdmin = tokenData.role === "admin";

    const userAgent = req.get("User-Agent");
    
    if (userAgent !== tokenData.userAgent) {
      throw new UnauthorizedException();
    }
    
    if (onlyAdmin) {
      if (!isAdmin) throw new ForbiddenException({ code: "no access" });
    }

    let payload = req.body;
    
    payload.TOKEN_DATA = tokenData;

    let skip = false;

    if (adminAccess && isAdmin) {
      skip = true;
    }

    // if (onlyManager && !skip) {
    //   if (!tokenData.isManager) {
    //     throw new ForbiddenException();
    //   }
    // }

    
    if (isAdmin) {
      // admin
      console.log("User was admin check in auth!");
      const filter = {
        _id: new mongoose.Types.ObjectId(tokenData.userId),
      };
      
      const userData = await userService.findOne(filter);

      payload.USER_DATA = userData;

      if (!userData?._id) {
        throw new UnauthorizedException();
      }
      
    } else {
      
      const filter = {
        _id: new mongoose.Types.ObjectId(tokenData.userId),
      };
      
      const userData = await userService.findOne(filter);
      payload.USER_DATA = userData;
      
      if(checkCreditAccess){
        // @ts-ignore
        const accessCreditDate = new Date(userData.company.creditEndDate) - new Date();
        if(accessCreditDate <= 0){
          throw new ForbiddenException({code:"credit is failed"});
        }
      }

      if (!userData?._id) {
        throw new UnauthorizedException();
      }
      if (userData.isBlocked) {
        throw new ForbiddenException();
      }
      if (userData.company?.isBlocked) {
        throw new ForbiddenException();
      }
    }
    return next();
  };
};

module.exports = useAuth;
