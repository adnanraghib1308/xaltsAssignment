import { prop } from "rambda"
const nodemailer = require("nodemailer");
require('dotenv').process

class ReqHandlerError extends Error {
  resCode: number = 200;
}

export class HandledError extends ReqHandlerError {
  constructor(msg: string, resCode = 500) {
    super(msg);
    this.resCode = resCode;

    return this;
  }
}

export const reqWrapper = (reqHandler: (req: any, res: any, next?: any) => any) => async (req: any, res: any, next?: any) => {
  let result;
  try {
    res.sendResponse = getResponseSender(req, res);
    result = await reqHandler(req, res, next);
  } catch (e) {
    return next(e);
  }

  return result;
};

/**
 * custom fn to validate and send response
 * @param req
 * @param res
 */
export const getResponseSender =
  (req: any, res: any) =>
  (data: object, status: number = 200) => {
    return res.status(status).header("Content-Type", "application/json; charset=utf-8").send(data);
  };

/**
 * checks is error thrown while processing request is thrown purposefully and sends response accordingly.
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const reqErrorHandler = (err: any, req: any, res: any, next?: any) => {
  res.sendResponse = getResponseSender(req, res);

  // logging errors
  console.log("Error while processing request " + req.originalUrl);
  // TODO send error to sentry
  console.error(err);

  if (err instanceof HandledError) {
    return res.sendResponse(
      {
        error: {
          type: "HandleError",
          message: err.message,
        },
      },
      err.resCode
    );
  }

  return res.sendResponse(
    {
      error: "Internal Server Error",
    },
    500
  );
};

export const assertNonEmpty = (obj: any, { errClass = HandledError, allowedValues }: any = {}): boolean => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (!value && (!allowedValues || !allowedValues.includes(value))) throw new errClass(`${key} is missing`);
  }
  return obj;
};

//@ts-ignore
export function reduceToMap(arr, key) {
  return arr.reduce((obj: any, item: any) => {
    obj[item[key]] = item;
    return obj;
  }, {});
}

export const sendEmail = async ({ to, subject, text }: { to: string, subject: string, text: string}) => {
  const email = process.env.email;
  const password = process.env.emailpassword;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use the email service you prefer
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}