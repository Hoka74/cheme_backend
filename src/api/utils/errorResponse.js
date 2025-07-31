/** @namespace utils.errors **/
class ErrorResponse extends Error {
  static codes = {
    // 400
    "bad request exception": "4001",
    "email not found": "4002",
    "member is blocked": "4003",
    // 404
    "not found": "4041",
    "user not found": "4042",
    "company not found": "4043",
    "area not found": "4044",
    "project not found": "4045",
    // 422
    "input is not valid": "4221",
    "username or password is incorrect": "4222",
    "project should be an object": "4223",
    "project is required": "4224",
    // 401
    "authorization failed": "4011",
    // 403
    "blocked by admin": "4031",
    "blocked by company": "4032",
    "company is inactive": "4033",
    "company is blocked": "4034",
    "no access": "4035",
    "failed sign-in count": "4036",
    "credit is failed": "4037",
    // 409 conflict
    "data is not valid": "4091",
    "email is not valid #already used": "4092",
    "project is not valid to inactive #tag": "4093",
    "area is not valid to inactive #tag": "4094",
    // 500
    "error from server": "5001",
  };

  /**
   * @param {string} message
   * @param {any} data
   * @param {string} code
   * @param {number} statusCode
   */

  constructor(message, code, data, statusCode) {
    console.log(ErrorResponse.codes[code]);
    super(message);
    this.code = ErrorResponse.codes[code];
    this.data = data;
    this.statusCode = statusCode;
  }
}

ErrorResponse.ConflictException = undefined;

/**
 * @memberof utils.errors
 */
class BadRequestException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {(
   * "bad request exception"
   * |"email not found"
   * |"member is blocked"
   * )=} params.code
   * @param {object=} params.data
   * @param {any[]=} params.errors
   */
  constructor({
    message = "bad request exception",
    data = {},
    code = "bad request exception",
    errors = [],
  } = {}) {
    super(message, code, data, 400);
    this.errors = errors;
  }
}

/**
 * @memberof utils.errors
 */
class ForbiddenException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {("no access"
   * | "blocked by company"
   * | "blocked by admin"
   * | "company is inactive"
   * | "company is blocked"
   * | "failed sign-in count"
   * | "credit is failed"
   * )=} params.code
   * @param {object=} params.data
   * @param {any[]=} params.errors
   */
  constructor(
    {
      message = "ForbiddenException",
      data = {},
      code = "no access",
      errors = [],
    } = {
      message: "ForbiddenException",
      code: "no access",
      data: {},
      errors: [],
    }
  ) {
    super(message, code, data, 403);
    this.errors = errors;
  }
}

/**
 * @memberof utils.errors
 */
class UnauthorizedException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {("authorization failed")=} params.code
   * @param {object=} params.data
   */
  constructor(
    {
      message = "UnauthorizedException",
      code = "authorization failed",
      data = undefined,
    } = {
      message: "UnauthorizedException",
      code: "authorization failed",
      data: {},
    }
  ) {
    super(message, code, data, 401);
  }
}

/**
 * @memberof utils.errors
 */
class NotFoundException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {(
   * "not found"
   * |"user not found"
   * |"area not found"
   * |"project not found"
   * |"company not found"
   * )=} params.code
   * @param {object=} params.data
   */
  constructor(
    { message = "NotFoundException", code = "not found", data = undefined } = {
      message: "NotFoundException",
      code: "not found",
      data: undefined,
    }
  ) {
    super(message, code, data, 404);
  }
}

/**
 * @memberof utils.errors
 */
class UnprocessableEntity extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {(
   * "input is not valid"
   * | "username or password is incorrect"
   * | "project should be an object"
   * | "project is required"
   * )=} params.code
   * @param {object=} params.data
   * @param {any[]=} params.errors
   */
  constructor(
    {
      message = "Unprocessable Entity",
      code = "input is not valid",
      data = undefined,
      errors = [],
    } = {
      message: "Unprocessable Entity",
      code: "input is not valid",
      data: undefined,
      errors: [],
    }
  ) {
    super(message, code, data, 422);
    this.errors = errors;
  }
}

/**
 * @memberof utils.errors
 */
class ConflictException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {(
   * "email is not valid #aleary used"
   * | "data is not valid"
   * | "project is not valid to inactive #tag"
   * | "area is not valid to inactive #tag"
   * )=} params.code
   * @param {object=} params.data
   */
  constructor(
    {
      message = "ConflictException",
      code = "data is not valid",
      data = undefined,
    } = {
      message: "ConflictException",
      code: "data is not valid",
      data: undefined,
    }
  ) {
    super(message, code, data, 409);
  }
}

/**
 * @memberof utils.errors
 */
class InternalServerErrorException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {string} params.code
   * @param {object=} params.data
   */
  constructor(
    {
      message = "InternalServerErrorException",
      code = "error from server",
      data = undefined,
    } = {
      message: "InternalServerErrorException",
      code: "error from server",
      data: undefined,
    }
  ) {
    super(message, code, data, 500);
  }
}

/**
 * @memberof utils.errors
 */
class ServiceUnavailableException extends ErrorResponse {
  /**
   * @param {object} params
   * @param {string=} params.message
   * @param {string} params.code
   * @param {object=} params.data
   */
  constructor(
    {
      message = "ServiceUnavailableException",
      data = undefined,
      code = "not found",
    } = {
      message: "ServiceUnavailableException",
      data: undefined,
      code: "not found",
    }
  ) {
    super(message, code, data, 503);
  }
}

module.exports = {
  ErrorResponse,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnprocessableEntity,
};
