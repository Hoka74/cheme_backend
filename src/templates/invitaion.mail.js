const ADMIN_TO_USER_TEMPLATE = {
  intro:
    "You have received this email because of your cooperation with our company",
  instructions: "Click the button below to register:",
  outro: "This link is confidential and is useless after your registration.",
  color: "#0091ea",
  text: "sign up",
};

const FORGET_PASSWORD_TEMPLATE = {
  intro:
    "It seems like you forgot your password. If this is true, click the link below to reset your password",
  instructions:
    "If you did not forget your password, please disregard this email. This password reset link is only valid for the next 15 minutes",
  outro: "This link is confidential.",
  color: "#0091ea",
  text: "forget password",
};

const MANAGER_TO_USER_TEMPLATE = {
  intro: "You have received this email because of your company",
  instructions: "Click the button below to register:",
  outro: "This link is confidential and is useless after your registration.",
  color: "#0091ea",
  text: "sign up",
};

const emailTemplate = ({
  name,
  intro,
  outro,
  instructions,
  color,
  text,
  link,
}) => ({
  body: {
    name,
    intro,
    action: {
      instructions,
      button: {
        color,
        text,
        link,
      },
    },
    outro,
  },
});

module.exports = {
  emailTemplate,
  ADMIN_TO_USER_TEMPLATE,
  MANAGER_TO_USER_TEMPLATE,
  FORGET_PASSWORD_TEMPLATE,
};

// If you did not request a password reset, no further action is required on your part.
// "You have received this email because a password reset request for your account was received.",
