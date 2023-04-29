import React, { useEffect, useState, useRef } from "react";
import WebCam from "react-webcam";
import "../../assets/stylesheets/smartlogin.scss";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../utils/Spinner";
import { decrypt } from "../../redux/encryption";
import { smartSignInPinVerify, smartSignIn } from "../../redux/actions/loginActions";

import { confirmAlert } from 'react-confirm-alert';
import '../../assets/stylesheets/confirmation-box.scss';

import { Helmet } from "react-helmet";

import useIsMainWindow from "../../utils/IsAppAlreadyOpened";

const SmartLogin = () => {

    const [translate, setTranslate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pinVerified, setPinVerified] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state) => state);

    const [error, setError] = useState({});
    const [video, setVideo] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const height = 560;
    const width = 720;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [pin, setPin] = useState("");
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setTranslate(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (pinVerified) {
            setInterval(() => {
                document.querySelector(":root").style.setProperty("--height", document.getElementById("video").clientHeight + "px");
                document.querySelector(":root").style.setProperty("--customheight", document.getElementById("video").clientHeight + 175 + "px");
            }, 100);
        }
    }, [pinVerified]);

    function security_pin_mask(e) {
        // var security_pin = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,6})/);
        // e.target.value = security_pin[1] + ' - '+ security_pin[2];
        var mask = "__ - ______";
        var masker = e.target;
        var myText = "";
        var myNumbers = [];
        var myOutPut = "";
        var theLastPos = 0;
        myText = masker.value;
        //get numbers
        for (var i = 0; i < myText.length; i++) {
            if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
                myNumbers.push(myText.charAt(i));
            }
        }
        //write over mask
        for (var j = 0; j < mask.length; j++) {
            if (mask.charAt(j) == "_") {
                //replace "_" by a number
                if (myNumbers.length == 0) {
                    myOutPut = myOutPut + mask.charAt(j);
                } else {
                    myOutPut = myOutPut + myNumbers.shift();
                    theLastPos = j + 1; //set caret position
                }
            } else {
                myOutPut = myOutPut + mask.charAt(j);
            }
        }
        masker.value = myOutPut;
        masker.setSelectionRange(theLastPos, theLastPos);
        setPin(myOutPut);
    };

    // authData

    useEffect(() => {
        if (Object.keys(store.errors).length !== 0) {
            setError(store.errors);
            setLoading(false);
            if (error.pinError) {
                setPin("");
            } else if (error.loginError) {
                confirmAlert({
                    title: 'Login in Error',
                    message: error.loginError,
                    buttons: [
                        {
                            label: 'Close',
                            onClick: () => setError({})
                        }
                    ]
                });
            };
        }
    }, [store.errors]);

    useEffect(() => {
        if (store.login.authData.result !== undefined) {
            console.log(store.login.authData.result);
            setError({});
        }
    }, [store.login.authData]);

    useEffect(() => {
        if (store.login.data.result !== undefined) {
            setError({});
            setLoading(false);
            setUserName(store.login.data.result);
            setPinVerified(true);
        };
    }, [store.login.data]);

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(smartSignInPinVerify({ pin: pin }));
    };

    useEffect(() => {
        if (store.errors) {
            setLoading(false);
            setPin("");
        }
    }, [store.errors]);

    useEffect(() => {
        if (pinVerified) {
            if (navigator.mediaDevices.getUserMedia) {
                setVideo(document.getElementById("video"));
                navigator.mediaDevices
                    .getUserMedia({ audio: false, video: true })
                    .then(function (stream) {
                        //Display the video stream in the video object
                        document.getElementById("video").srcObject = stream;
                        //Play the video stream
                        document.getElementById("video").play();
                        setIsLoaded(true);
                        addEvent();
                    })
                    .catch(function (e) {
                        console.log(e.name + ": " + e.message);
                    });
            };

            function addEvent() {
                document.getElementById("video").addEventListener("play", () => {
                    setInterval(async () => {
                        dispatch(smartSignIn({ uri: videoRef.current.getScreenshot(), pin: pin }, navigate));
                    }, 2000);
                });
            };
        };
    }, [pinVerified]);
    const isMain = useIsMainWindow();

    const LoginedUser = JSON.parse(decrypt(localStorage.getItem("user")));
    if (!LoginedUser) {
        if (isMain) {
            return (
                <>
                    <div className="bg-[#1589FF] h-screen w-screen flex items-center justify-center">
                        <div className="grid laptop:grid-cols-2 desktop:grid-cols-2 2xl:grid-cols-2">
                            <div className={`h-96 w-96 bg-white flex items-center justify-center ${translate ? "translate-x-[12rem]" : ""}  duration-1000 transition-all rounded-3xl shadow-2xl mobile:hidden tablet:hidden`}>
                                <h1 className="text-[3rem]  font-bold text-center">
                                    Smart
                                    <br />
                                    Login
                                </h1>
                            </div>
                            <form
                                onSubmit={login}
                                className={`${loading ? "h-[27rem]" : "h-96"} w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${translate ? "-translate-x-[12rem]" : ""
                                    }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl mobile:translate-y-0 mobile:translate-x-0 mobile:w-screen mobile:max-w-xs tablet:translate-y-0 tablet:translate-x-0 mobile:custom-added-6`}
                            >
                                <h1 className="text-white text-3xl font-semibold">{userName ? "Hello, " + userName : "Smart Login"}</h1>
                                {!pinVerified && (
                                    <>
                                        <div className="space-y-1">
                                            <p className="text-[#515966] font-bold text-sm">Security Pin</p>
                                            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                                                <input
                                                    onChange={(e) => security_pin_mask(e)}
                                                    value={pin}
                                                    pattern="^[0-9]{2} - [0-9]{6}$"
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    required
                                                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                                                    placeholder="Security Pin"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]">
                                            Login
                                        </button>
                                    </>
                                )}
                                {loading && <Spinner message="Checking Pin" height={30} width={150} color="#ffffff" messageColor="#fff" />}
                                {error.pinError && <p className="text-red-500">{error.pinError}</p>}
                                {pinVerified && (
                                    <div className="video-container place-content-center items-center ocrloader" id="container">
                                        <p>Scanning</p>
                                        <em id="scanner">
                                            <div style={{ padding: "10px" }}>
                                                <WebCam
                                                    id="video"
                                                    //src={video}
                                                    ref={videoRef}
                                                    autoPlay={false}
                                                    width={width}
                                                    height={height}
                                                    mirrored={true}
                                                    screenshotFormat="image/png"
                                                    screenshotQuality={1}
                                                    imageSmoothing={true}
                                                    playsInline
                                                    muted
                                                    style={{ width: "inherit", height: "inherit" }}
                                                />
                                                <span></span>
                                            </div>
                                        </em>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            );
        } else {
            return (<div>Close the other window !!</div>)
        };
    } else {
        navigate(`/${LoginedUser.result.position.toLowerCase()}/home`);
    };
};

export default SmartLogin;
