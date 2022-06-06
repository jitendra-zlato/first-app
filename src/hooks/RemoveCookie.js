import Cookie from "js-cookie";

const RemoveCookie = (cookiename) => {
  // remove the cookie
  let cookie = Cookie.get(cookiename);
  Cookie.remove(cookiename);
  if (cookie === undefined) return false;
  else return true;
};

export default RemoveCookie;
