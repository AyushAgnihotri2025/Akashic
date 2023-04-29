import {decrypt} from "../encryption";
const { io } = require("socket.io-client");

const server = io.connect();

// Establish Connection with the server

server.on('connect', function() {
    console.whisper("Connected with the server !")
});

// Admin

export const adminSignIn = (formData) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/login",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const adminUpdatePassword = (updatedPassword) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedPassword['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/updatepassword",
        JSON.stringify(updatedPassword), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllStudent = () => new Promise((resolve, reject) => {
    const formData = {};
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getallstudent",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllFaculty = () => new Promise((resolve, reject) => {
    const formData = {};
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getallfaculty",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllAdmin = () => new Promise((resolve, reject) => {
    const formData = {};
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getalladmin",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllDepartment = () => new Promise((resolve, reject) => {
    const formData = {};
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getalldepartment",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllSubject = () => new Promise((resolve, reject) => {
    const formData = {};
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getallsubject",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const updateAdmin = (updatedAdmin) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedAdmin['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/updateprofile",
        JSON.stringify(updatedAdmin), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const addAdmin = (admin) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        admin['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/addadmin",
        JSON.stringify(admin), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const createNotice = (notice) =>  new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        notice['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/createnotice",
        JSON.stringify(notice), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteAdmin = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deleteadmin",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteFaculty = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deletefaculty",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteStudent = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deletestudent",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteSubject = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deletesubject",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteDepartment = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deletedepartment",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAdmin = (admin) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        admin['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getadmin",
        JSON.stringify(admin), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const addDepartment = (department) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        department['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/adddepartment",
        JSON.stringify(department), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const addFaculty = (faculty) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        faculty['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/addfaculty",
        JSON.stringify(faculty), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getFaculty = (department) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        department['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getfaculty",
        JSON.stringify(department), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const addSubject = (subject) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        subject['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/addsubject",
        JSON.stringify(subject), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getSubject = (subject) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        subject['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getsubject",
        JSON.stringify(subject), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const addStudent = (student) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        student['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/addstudent",
        JSON.stringify(student), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getStudent = (student) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        student['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getstudent",
        JSON.stringify(student), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getNotice = (notice) => new Promise((resolve, reject) => {
    if (notice === undefined) {
        notice = {}
    }
    if (localStorage.getItem("user")) {
        notice['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/getnotice",
        JSON.stringify(notice), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const deleteNotice = (notice) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        notice['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "admin/deletenotice",
        JSON.stringify(notice),
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

// Faculty

export const facultySignIn = (formData) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/login",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const facultyUpdatePassword = (updatedPassword) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedPassword['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/updatepassword",
        JSON.stringify(updatedPassword), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const updateFaculty = (updatedFaculty) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedFaculty['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/updateprofile",
        JSON.stringify(updatedFaculty), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const createTest = (test) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        test['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/createtest",
        JSON.stringify(test), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getTest = (test) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        test['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/gettest",
        JSON.stringify(test), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAllTest = (test) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        test['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/getalltest",
        JSON.stringify(test), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getMarksStudent = (student) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        student['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/getstudent",
        JSON.stringify(student), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const uploadMarks = (data) =>  new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/uploadmarks",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});
export const markAttendance = (data) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        data['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "faculty/markattendance",
        JSON.stringify(data), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

// Student

export const studentSignIn = (formData) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "student/login",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const studentUpdatePassword = (updatedPassword) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedPassword['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "student/updatepassword",
        JSON.stringify(updatedPassword), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const updateStudent = (updatedStudent) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        updatedStudent['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "student/updateprofile",
        JSON.stringify(updatedStudent), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getTestResult = (testResult) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        testResult['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "student/testresult",
        JSON.stringify(testResult), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const getAttendance = (attendance) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        attendance['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "student/attendance",
        JSON.stringify(attendance), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

// Smart Login

export const smartSignIn = (formData) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "smartlogin/login",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});

export const smartSignInPinVerify = (formData) => new Promise((resolve, reject) => {
    if (localStorage.getItem("user")) {
        formData['auth'] = `Bearer ${
          JSON.parse(decrypt(localStorage.getItem("user"))).token
        }`;
    };
    server.emit(
        "smartlogin/pin",
        JSON.stringify(formData), 
        (responseFromB) => {
            resolve(responseFromB);
        }
    )
});