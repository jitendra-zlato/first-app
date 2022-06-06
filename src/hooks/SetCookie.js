import Cookie from "js-cookie";

const SetCookie = (cookiename, value, expiresIn) => {
  //setting the cookie
  Cookie.set(cookiename, value, {
    //cookie options
    expires: expiresIn,
    secure: true,
    path: "/",
    sameSite: "strict",
  });
};

export default SetCookie;
