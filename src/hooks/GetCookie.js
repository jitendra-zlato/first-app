import Cookie from "js-cookie";

const GetCookie = (cookiename) => {
  //getting cookie by cookien name
  return Cookie.get(cookiename);
};

export default GetCookie;
