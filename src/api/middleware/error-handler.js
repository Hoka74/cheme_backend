/** @namespace middleware.errorHandler */

const express = require("express");

/**
 * @memberof middleware.errorHandler
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment || true) {
    // @ts-ignore
    console.log(`${statusCode}: ${err.message}`.red);
  }

  if (statusCode === 500) {
    res.status(statusCode).json({
      message: isDevelopment || true ? err.message : "error from server",
      code: "5001",
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      ...err,
    });
  }
};

module.exports = errorHandler;
