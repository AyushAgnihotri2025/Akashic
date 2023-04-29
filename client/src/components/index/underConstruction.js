import React from "react";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import $ from "jquery";

const UnderConstruction = () => {
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
            {parse(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>AIT-K | RTI</title>
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
    <!--Style Starts-->
    <link rel="icon" type="image/png" href="https://cdn.mrayush.me/image/akashic/favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.mrayush.me/css/Akashic/style.css">
</head>

<body>
    <!-- Start Your Body Code From here -->
    <div className="wrapper">
        <!-- header starts here -->
        <header id="header" className="">
            <!-- header -->
            <div className="header-wrapper">
                <div className="header-container">
                    <div>
                        <div className="logo-name">
                            <div className="logo">
                                <a href="./" title=""><img src="https://cdn.mrayush.me/image/akashic/logo.png" alt="logo"></a>
                            </div>
                            <div className="name">
                                <a href="./" title="">
                                    <h5>Akashic Institute of Technology</h5>
                                    <h5 className="primary-color">Kanpur</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="header-links">
                        <a href="#" data-toggle="popover" title="Address" data-content="c/o Akashic Institute of Technology, Kanpur Nagar, Uttar Pradesh - 208201" data-placement="bottom"><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="popover" title="Phone No." data-content="+91-00-00000000" data-placement="bottom"><i className="fa fa-phone fa-lg" aria-hidden="true"></i></a>
                        <a href="#" data-toggle="popover" title="Email" data-content="helpdesk@akashic.ac.in" data-placement="bottom"><i className="fa fa-envelope fa-lg" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            <nav>
                <div className="navbar navbar-inverse navbar-custom" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" style="visibility: visible;" >
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Institute <b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-level">
                                        <li><a href="about">About</a></li>
                                        <li><a href="directors_message">Director's Message</a></li>
                                        <li><a href="bog">Board of Governors</a></li>
                                        <li><a href="society_members">Society Members</a></li>
                                        <li><a href="academic_council">Academic Council</a></li>
                                        <li><a href="finance_committee">Finance Committee</a></li>
                                        <li className="active"><a href="rti">RTI</a></li>
                                        <li><a href="pdf/MOU.pdf">MOU</a></li>
                                        <li className="dropdown-submenu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Linkages</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="linkages/da-iict">DA-IICT</a></li>
                                                <li><a href="linkages/gsfc">GSFC</a></li>
                                                <li><a href="linkages/germi">GERMI</a></li>
                                                <li><a href="linkages/tcs">TCS</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Academics <b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-level">
                                        <li className="dropdown-submenu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">B.Tech</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="btech_cse">CSE</a></li>
                                                <li><a href="btech_it">IT</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">M.Tech</a>
                                            <ul className="dropdown-menu">
                                                <li><a href="mtech_cse">CSE</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="phd">Ph.D</a></li>
                                        <li><a href="pdf/academic_calendar_autumn_2015_16.pdf">Academic Calender</a></li>
                                        
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Admission <b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-level">
                                        <li><a href="btech_admission">B.Tech</a></li>
                                        <li><a href="mtech_admission">M.Tech</a></li>
                                        <li><a href="phd_admission">Ph.D</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">People <b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-level">
                                        <li><a href="faculty">Faculty</a></li>
                                        <li><a href="visiting_faculty">Visiting Faculty</a></li>
                                        <li><a href="staff">Staff</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">More <b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-level">
                                        <li><a href="faq">FAQs</a></li>
                                        <li><a href="student_corner">Student's Corner</a></li>
                                        <li><a href="http://moodle.iiitv.ac.in" target="_blank">Moodle</a></li>
                                        <li><a href="library">Library</a></li>
                                        <li><a href="invited_talks">Invited Talks</a></li>
                                    </ul>
                                </li>
                                <li><a href="career">Career</a></li>
                                <li><a href="gallery">Photo Gallery</a></li>
                    <li>
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Login <b className="caret"></b></a>
                        <ul className="dropdown-menu multi-level">
                            <li><a href="../login/studentlogin">Student Login</a></li>
                            <li><a href="../login/facultylogin">Faculty Login</a></li>
                            <li><a href="../smartLogin">Smart Login</a></li>
                        </ul>
                    </li>
                </ul>
                        </div>
                        <!--/.nav-collapse -->
                    </div>
                </div>
            </nav>
        </header>
        <!-- /header -->
        <!-- Content wrapper -->
        <div className="contents-wrapper">
            <!-- Contents starts here -->
            <div className="content">
                <center>
                    <img className="responsive-img" src="https://cdn.mrayush.me/image/akashic/under-construction.gif" style="width: 100%">
                </center>
            </div>
        </div>
        <!-- Footer -->
        <footer>
            <div className="footer-wrapper">
                <span className="logo"><img src="https://cdn.mrayush.me/image/akashic/logo.png" alt=""></span>
                <div className="row">
                    <div className="col-sm-4 address">
                        <strong>Address : </strong>c/o Akashic Institute of Technology, Kanpur Nagar, Uttar Pradesh - 208201
                    </div>
                    <div className="col-sm-4 links">
                        <div>
                            <a href="./#news">News</a>
                            <i className="seperator"></i>
                            <a href="./#announcements">Announcement</a>
                            <i className="seperator"></i>
                            <a href="./#events">Events</a>
                        </div>
                        <div>
                            <a href="./">Home</a>
                            <i className="seperator"></i>
                            <a href="rti">RTI</a>
                            <i className="seperator"></i>
                            <a href="pdf/MOU.pdf">MOU</a>
                        </div>
                        <div>
                            <a href="admissions">Admission</a>
                            <i className="seperator"></i>
                            <a href="student_corner">Student</a>
                            <i className="seperator"></i>
                            <a href="faculty">Faculty</a>
                        </div>
                    </div>
                    <div className="col-sm-4 footer-social">
                        <a href="#!"><i className="fa fa-facebook" aria-hidden="true"
                                        title="Official Facebook Page"></i></a>
                        <a href="https://github.com/ayushagnihotri2025"><i className="fa fa-github" aria-hidden="true"
                                                              title="Github Group"></i></a>
                        <a href="#!"><i className="fa fa-linkedin" aria-hidden="true" title="LinkedIn Profile"></i></a>
                        <a href="#!" title=""><i className="fa fa-twitter" aria-hidden="true"
                                                 title="Official Twitter Account"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</body>

</html>
`)}
        </div>
    )
};

export default UnderConstruction;