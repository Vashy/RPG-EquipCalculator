'use strict';

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let c = getCookie(cname);
  return c !== "";

}

class PrefCookieHandler {
  constructor(cookieName) {
    this._cookieName = cookieName;
  }

  // setCookie(cvalue, exdays) {
  //   setCookie(this._cookieName, cvalue, exdays);
  // }

  // getCookie() {
  //   return getCookie(this._cookieName);
  // }

  // checkCookie() {
  //   return checkCookie(this._cookieName);
  // }

  swap() {
    if (this.cookie === "table") {
      setCookie(this._cookieName, "text", 30);
      return "table";
    }

    setCookie(this._cookieName, "table", 30);
    return "text";
  }

  get cookie() {
    return getCookie(this.cookieName);
  }

  get cookieName() {
    return this._cookieName;
  }

  get isTable() {
    return this.cookie === 'table';

  }

  get isText() {
    return this.cookie === 'text';
  }

  get alternative() {
    let cookie = this.cookie;
    if (cookie === "table")
      return "text";
    else
      return "table";
  }
}

const preferenceCookie = new PrefCookieHandler("preference");
// let preference = preferenceCookie.cookie;
if (preferenceCookie.cookie === "") {
  setCookie(preferenceCookie.cookieName, "table", 30);
  // preference = "table";
}
