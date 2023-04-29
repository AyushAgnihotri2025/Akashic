import $ from "jquery";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "../../assets/stylesheets/cookie.scss";
import cookieConsentIcon from "../../assets/images/cookie_consent_icon.svg";
import { getCookieConsentValue, getLegacyCookieName } from "../../utils/Cookies";

export const CookieConsentBanner = () => {
    const cookieName = "AkashicCookieConsent";
    const consentUrl = cookieConsentUrl();
    const [visible, setVisible] = useState(true);
    const [isClick, setisClick] = useState(false);
    const [cookieConsent, setcookieConsent] = useState("undecided");

    function getCookieConsent() {
      return getCookieConsentValue(cookieName);
    }

    function updateCookieConsent(consent) {
      const cookieSecurity = window.location ? window.location.protocol === "https:" : true;
      const cookieOptions =  { expires: 7, path: '/', sameSite: 'none', secure: cookieSecurity };
      Cookies.set(getLegacyCookieName(cookieName), consent, cookieOptions);
      Cookies.set(cookieName, consent, cookieOptions);
      setisClick(true);
      setcookieConsent(consent);
    }

    useEffect(() => {
      if (getCookieConsent() === "undecided" || getCookieConsent() === undefined) {
          setVisible(true);
      } else {
          if (isClick) {
              $.when(
                  $('#cookieBanner').fadeOut(2000)
              ).done(function() {
                  setVisible(false);
              });
          } else {
              setVisible(false);
          };
      };
    }, [cookieConsent]);

    if (visible) {
        return (
          <CookieBanner
            url={consentUrl.url}
            title={consentUrl.title}
            onAccept={updateCookieConsent}
            onDecline={updateCookieConsent}
          />
        );
    };
};

function CookieBanner(props) {
  return (
    <div id="cookieBanner" className="fixed-bottom cookie-box d-lg-flex d-sm-flex align-items-center">
      <div className="cookie-content d-flex align-items-center">
        <div className="cookie-img-box">
          <img
            draggable="false"
            className="cookie-img"
            src={cookieConsentIcon}
            alt="cookie-img"
          />
        </div>
        <div>
          <div className="cookie-box-title">Cookies policy</div>
          <div className="cookie-box-content">
            Our website uses cookies to analyze how the site is used and to
            ensure your experience is consistent between visits.
            <a
              className="cookie-box-link"
              href={props.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {props.title}
            </a>
          </div>
        </div>
      </div>
      <div className="button-wrapper ml-auto">
        <button
          className="cookie-button btn-cookie btn-outline-grey ml-auto"
          onClick={() => props.onDecline("declined")}
        >
          Decline
        </button>
        <button
          className="cookie-button btn-cookie cookie-btn-primary ml-auto mr-2"
          onClick={() => props.onAccept("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

function cookieConsentUrl() {
    return {
        url: "",
        title: "Cookies Policy" || "Learn more »",
    };
}
