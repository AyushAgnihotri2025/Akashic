import { useState, useEffect, useRef } from "react";

const useIsMainWindow = () => {
  const initialized = useRef(false);
  const isNewWindowPromotedToMain = useRef(false);
  const windowId = useRef(null);
  const [isMain, setIsMain] = useState(true);

  const getWindowArray = () => {
    let storage = window.localStorage.getItem("checkTab");
    return storage ? JSON.parse(storage) : [];
  };

  const setWindowArray = (data) => {
    window.localStorage.setItem("checkTab", JSON.stringify(data));
  };

  const determineWindowState = () => {
    let windowArray = getWindowArray();

    if (initialized.current) {
      if (
        windowArray.length <= 1 ||
        (isNewWindowPromotedToMain.current
          ? windowArray[windowArray.length - 1]
          : windowArray[0]) === windowId.current
      ) {
        setIsMain(true);
      } else {
        setIsMain(false);
      }
    } else {
      if (windowArray.length === 0) {
        setIsMain(true);
      } else {
        setIsMain(false);
      }
      const newWindowArray = [...windowArray, windowId.current];
      setWindowArray(newWindowArray);
    }

    setTimeout(function () {
      determineWindowState();
    }, 1500);
  };

  const removeWindow = () => {
    var newWindowArray = getWindowArray();
    for (var i = 0, length = newWindowArray.length; i < length; i++) {
      if (newWindowArray[i] === windowId.current) {
        newWindowArray.splice(i, 1);
        break;
      }
    }
    setWindowArray(newWindowArray);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", removeWindow);
    window.addEventListener("unload", removeWindow);
    isNewWindowPromotedToMain.current = true;
    windowId.current = Date.now().toString();
    determineWindowState();
    initialized.current = true;

    return () => {
      window.removeEventListener("beforeunload", removeWindow);
      window.removeEventListener("unload", removeWindow);
    };
  }, []);

  return isMain;
};

export default useIsMainWindow;