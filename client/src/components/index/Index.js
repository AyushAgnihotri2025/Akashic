import React from "react";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import $ from "jquery";

const Index = () => {
    React.useEffect(() => {
        const scripts = ["https://use.fontawesome.com/434d359724.js", "https://cdn.mrayush.me/js/Akashic/main.js"];
        const loadError = () => {
            console.whisper("Errors in loading js....");
        }
        scripts.forEach((script) => {
            const externalScript = document.createElement("script");
            externalScript.onerror = loadError;
            externalScript.id = "external";
            externalScript.async = true;
            externalScript.type = "text/javascript";
            externalScript.setAttribute("crossorigin", "anonymous");
            document.body.appendChild(externalScript);
            externalScript.src = script;
        });
        return () => {
            // document.body.removeChild(externalScript);
        };
    }, []);

    return (
        <div>
            {parse(`
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome to Akashic</title>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
    <link rel="icon" type="image/png" href="https://cdn.mrayush.me/image/akashic/favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css" />
    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" />
    <link rel="stylesheet" href="https://cdn.mrayush.me/css/Akashic/theme.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.mrayush.me/css/Akashic/style.css" />
</head>

<body id="home"></body>

</html>`)}
        </div>
    )
};

export default Index;