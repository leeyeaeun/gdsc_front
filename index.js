'use strict';
const express = require("express");
const serverless = require("serverless-http");
var cors = require("cors");
const app = express();
const router = express.Router();
const port = 5000;
var arr_time = []; //접속시간을 milliseconds로 배열에 저장
var course_count = 0;
const fs = require("fs");

var courseGet = new Promise((resolve, reject) => {
  fs.readFile("course/course_data2.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got course");
    var courseJson = JSON.parse(data); //change str to json
    course_count = Object.keys(courseJson).length;
    global.courseJson = courseJson;
  });
});

var indexGet = new Promise((resolve, reject) => {
  fs.readFile("course/indexNsize.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got index");
    var indexJson = JSON.parse(data); //change str to json
    global.indexJson = indexJson;
  });
});
//console.log(courseJson[0][class_size]) 0번째가 수업 총 인원 출력
//console.log(indexJson["AI4011-01"]["0"]) AI4011-01이 몇 번째인지 출력

var AIget = new Promise((resolve, reject) => {
  fs.readFile("course/AI_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got AI courses");
    var courseJsonAI = JSON.parse(data); //change str to json
    global.courseJsonAI = courseJsonAI;
  });
});
var BSget = new Promise((resolve, reject) => {
  fs.readFile("course/BS_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got BS courses");
    var courseJsonBS = JSON.parse(data); //change str to json
    global.courseJsonBS = courseJsonBS;
  });
});
var CHget = new Promise((resolve, reject) => {
  fs.readFile("course/CH_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got CH courses");
    var courseJsonCH = JSON.parse(data); //change str to json
    global.courseJsonCH = courseJsonCH;
  });
});
var CTget = new Promise((resolve, reject) => {
  fs.readFile("course/CT_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got CT courses");
    var courseJsonCT = JSON.parse(data); //change str to json
    global.courseJsonCT = courseJsonCT;
  });
});
var ECget = new Promise((resolve, reject) => {
  fs.readFile("course/EC_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got EC courses");
    var courseJsonEC = JSON.parse(data); //change str to json
    global.courseJsonEC = courseJsonEC;
  });
});
var EVget = new Promise((resolve, reject) => {
  fs.readFile("course/EV_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got EV courses");
    var courseJsonEV = JSON.parse(data); //change str to json
    global.courseJsonEV = courseJsonEV;
  });
});
var FEget = new Promise((resolve, reject) => {
  fs.readFile("course/FE_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got FE courses");
    var courseJsonFE = JSON.parse(data); //change str to json
    global.courseJsonFE = courseJsonFE;
  });
});
var GSget = new Promise((resolve, reject) => {
  fs.readFile("course/GS_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got GS courses");
    var courseJsonGS = JSON.parse(data); //change str to json
    global.courseJsonGS = courseJsonGS;
  });
});
var IRget = new Promise((resolve, reject) => {
  fs.readFile("course/IR_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got IR courses");
    var courseJsonIR = JSON.parse(data); //change str to json
    global.courseJsonIR = courseJsonIR;
  });
});
var MAget = new Promise((resolve, reject) => {
  fs.readFile("course/MA_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got MA courses");
    var courseJsonMA = JSON.parse(data); //change str to json
    global.courseJsonMA = courseJsonMA;
  });
});
var MCget = new Promise((resolve, reject) => {
  fs.readFile("course/MC_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got MC courses");
    var courseJsonMC = JSON.parse(data); //change str to json
    global.courseJsonMC = courseJsonMC;
  });
});
var MDget = new Promise((resolve, reject) => {
  fs.readFile("course/MD_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got MD courses");
    var courseJsonMD = JSON.parse(data); //change str to json
    global.courseJsonMD = courseJsonMD;
  });
});
var MMget = new Promise((resolve, reject) => {
  fs.readFile("course/MM_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got MM courses");
    var courseJsonMM = JSON.parse(data); //change str to json
    global.courseJsonMM = courseJsonMM;
  });
});
var PSget = new Promise((resolve, reject) => {
  fs.readFile("course/PS_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got PS courses");
    var courseJsonPS = JSON.parse(data); //change str to json
    global.courseJsonPS = courseJsonPS;
  });
});
var SEget = new Promise((resolve, reject) => {
  fs.readFile("course/SE_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got SE courses");
    var courseJsonSE = JSON.parse(data); //change str to json
    global.courseJsonSE = courseJsonSE;
  });
});
var UCget = new Promise((resolve, reject) => {
  fs.readFile("course/UC_courses.json", function (err, data) {
    if (err) {
      reject(err);
    }
    resolve("got UC courses");
    var courseJsonUC = JSON.parse(data); //change str to json
    global.courseJsonUC = courseJsonUC;
  });
});

app.use(cors()); //cors 비워놓으면 모든 요청 허용
app.use(express.json());
// app.use(bodyParser);

function seat_results(time_diff, end_time, course_count) {
  var arr_seats = []; //{id:과목코드, seats:남은 자리 수} 저장되는 배열
  for (var i = 0; i < course_count; i++) {
    let seats_i = courseJson[i]["class_size"];
    let seats_left =
      seats_i - Math.floor((time_diff - 10000) / ((end_time * 1000) / seats_i));
    if (seats_left < 0) {
      arr_seats.push({
        id: courseJson[i]["course_code"],
        seats: 0,
      });
    }
    arr_seats.push({
      id: courseJson[i]["course_code"],
      seats: seats_left,
    });
  }
  return arr_seats;
}

router.post("/", (req, res) => {
  console.log('in router.post')
  var date = { time: Date.now() };
  console.log("milliseconds:", date.time);
  // arr_time.push(date.time);
  // var time_diff = arr_time[arr_time.length - 1] - arr_time[0];
  if (req.body["server_start"]==-1){
    res.send({
      time: 0,
      pass: "not open",
      server_start: date.time
    });
    return;
  }
  var time_diff=date.time-req.body["server_start"];
  if (time_diff < 10000) {
    res.send({
      time: time_diff,
      pass: "not open",
      server_start: req.body["server_start"]
    });
    return;
  }
  courseGet.then((result) => console.log(result)); //is course_data2.json ready?
  indexGet.then((result) => console.log(result)); //is course_index.json ready?
  for (let i = 0; i < courseJson.length; i++) {
    let obj = courseJson[i];
    if (obj[end_time]) {
      console.log(obj[end_time]); 
    }
  }
  var end_time = 12;
  return res.send({
    list: courseJson,
    time: time_diff,
    pass: "open",
    seats_left: seat_results(time_diff, end_time, course_count),
  });
});

router.post("/div", (req, res) => {
  courseGet.then((result) => console.log(result)); //is course_data2.json ready?
  indexGet.then((result) => console.log(result)); //is course_index.json ready?
  let school = req.body["div_code"];
  console.log(school)
  if (school == "AI") {
    AIget.then((result) => console.log(result));
    const course_json = courseJsonAI;
    res.send({
      data: course_json
    });
  } else if (school == "BS") {
    BSget.then((result) => console.log(result));
    const course_json = courseJsonBS;
    res.send({
      data: course_json
    });
  } else if (school == "CH") {
    CHget.then((result) => console.log(result));
    const course_json = courseJsonCH;
    res.send({
      data: course_json
    });
  } else if (school == "CT") {
    CTget.then((result) => {
      console.log(result)
      const course_json = courseJsonCT;
      res.send({
        data: course_json
      });
    });
  } else if (school == "EC") {
    ECget.then((result) => console.log(result));
    const course_json = courseJsonEC;
    res.send({
      data: course_json
    });
  } else if (school == "EV") {
    EVget.then((result) => console.log(result));
    const course_json = courseJsonEV;
    res.send({
      data: course_json
    });
  } else if (school == "FE") {
    FEget.then((result) => console.log(result));
    const course_json = courseJsonFE;
    res.send({
      data: course_json
    });
  } else if (school == "GS") {
    GSget.then((result) => console.log(result));
    const course_json = courseJsonGS;
    res.send({
      data: course_json
    });
  } else if (school == "IR") {
    IRget.then((result) => console.log(result));
    const course_json = courseJsonIR;
    res.send({
      data: course_json
    });
  } else if (school == "MA") {
    MAget.then((result) => console.log(result));
    const course_json = courseJsonMA;
    res.send({
      data: course_json
    });
  } else if (school == "MC") {
    MCget.then((result) => console.log(result));
    const course_json = courseJsonMC;
    res.send({
      data: course_json
    });
  } else if (school == "MD") {
    MDget.then((result) => console.log(result));
    const course_json = courseJsonMD;
    res.send({
      data: course_json
    });
  } else if (school == "MM") {
    MMget.then((result) => console.log(result));
    const course_json = courseJsonMM;
    res.send({
      data: course_json
    });
  } else if (school == "PS") {
    PSget.then((result) => console.log(result));
    const course_json = courseJsonPS;
    res.send({
      data: course_json
    });
  } else if (school == "SE") {
    SEget.then((result) => console.log(result));
    const course_json = courseJsonSE;
    res.send({
      data: course_json
    });
  } else if (school == "UC") {
    UCget.then((result) => console.log(result));
    const course_json = courseJsonUC;
    res.send({
      data: course_json
    });
  }
});


app.use("/.netlify/functions/index", router);
module.exports = app;
module.exports.handler = serverless(app);