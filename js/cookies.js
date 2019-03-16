
function setCookie(cname, cvalue, exdays) {
  let d = new Date();  
  d.setTime(d.getTime() + (exdays*24*3600*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
   name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let c = getCookie(cname);
  if (c != "")
    return true;
  return false;
}

class CookieHandler {
  constructor(cookieName) {
    this.cookieName = cookieName;
  }

  setCookie(cvalue, exdays) {
    setCookie(this.cookieName, cvalue, exdays);
  }

  getCookie() {
    return getCookie(this.cookieName);
  }

  checkCookie() {
    return checkCookie(this.cookieName);
  }
}

const preferenceCookie = new CookieHandler("preference");
let preference = preferenceCookie.getCookie();
if (preference == "") {
  preferenceCookie.setCookie("table", 30);
  preference = "table";
}
