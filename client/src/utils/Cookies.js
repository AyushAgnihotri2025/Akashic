import Cookies from "js-cookie";

const defaultCookieConsentName = "CookieConsent";

/**
 * Returns the value of the consent cookie
 * Retrieves the regular value first and if not found the legacy one according
 * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
 * @param {*} name optional name of the cookie
 */
export const getCookieConsentValue = (name = defaultCookieConsentName) => {
  const cookieValue = Cookies.get(name);
  // if the cookieValue is undefined check for the legacy cookie
  if (cookieValue === undefined) {
    return Cookies.get(getLegacyCookieName(name));
  }
  return cookieValue;
};


/**
 * Get the legacy cookie name by the regular cookie name
 * @param {string} name of cookie to get
*/
export const getLegacyCookieName = (name: string) => {
  return `${name}-legacy`;
};