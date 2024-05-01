import React, { useEffect } from "react";

const Translate = () => {
  useEffect(() => {
    // Check if the script is already loaded
    if (!window.googleTranslateElementInit) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,fr,ms,ta,zh-CN",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        gaTrack: false,
      },
      "google_translate_element"
    );
  };

  return <div id="google_translate_element"></div>;
};

export default Translate;
