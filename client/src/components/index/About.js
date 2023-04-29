import parse from 'html-react-parser';
import { Link } from "react-router-dom";


const About = () => {
    return (
        <div>
            {parse(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>AIT-K | About</title>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
    <!--Style Starts-->
    <link rel="icon" type="image/png" href="https://cdn.mrayush.me/image/akashic/favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.mrayush.me/css/Akashic/style.css">
</head>

<body></body>


</html>`)}
        </div>
    )
};

export default About;