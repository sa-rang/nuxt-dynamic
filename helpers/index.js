import jwtDecode from "jwt-decode";

let cookieParser = require("cookieparser");

export function getUserFromCookie(req) {
  //console.log(process.static);
  // if (!process.server && process.static) {
  //   console.log("first");
  //   return;
  // }
  // if (!req.header.cookie) {
  //   console.log("second");
  //   return;
  // }
  console.log(req);
  if (req.header.cookie) {
    const parsed = cookieParser.parse(req.header.cookie);
    const accessTokenCookie = parsed.access_token;
    if (!accessTokenCookie) return;

    const decodedToken = jwtDecode(accessTokenCookie);
    if (!decodedToken) return;
    return decodedToken;
  }
  return;
}
