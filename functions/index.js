
const fs = require("fs").promises;

exports.handler = async function(event, context) {
  const arr_time = [];
  let courseJson;
  let indexJson;
  let course_count;

  try {
    const courseData = await fs.readFile("course/course_data2.json");
    courseJson = JSON.parse(courseData);
    course_count = Object.keys(courseJson).length;

    const indexData = await fs.readFile("course/indexNsize.json");
    indexJson = JSON.parse(indexData);

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error reading course data" })
    };
  }


  function seat_results(time_diff, end_time, course_count) {
    var arr_seats = [];
    for (let i = 0; i < course_count; i++) {
      let seats_i = courseJson[i]["class_size"];
      let seats_left =
        seats_i - Math.floor((time_diff - 10000) / ((end_time * 1000) / seats_i));
      if (seats_left < 0) {
        arr_seats.push({
          id: courseJson[i]["course_code"],
          seats: 0,
        });
      } else {
        arr_seats.push({
          id: courseJson[i]["course_code"],
          seats: seats_left,
        });
      }
    }
    return arr_seats;
  }

  const date = { time: Date.now() };
  arr_time.push(date.time);
  const time_diff = arr_time[arr_time.length - 1] - arr_time[0];

  if (time_diff < 10000) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        time: time_diff,
        pass: "not open",
      })
    };
  }

  const end_time = 12;
  const seats_left = seat_results(time_diff, end_time, course_count);

  return {
    statusCode: 200,
    body: JSON.stringify({
      list: courseJson,
      time: time_diff,
      pass: "open",
      seats_left: seats_left,
    })
  };
};


// const express = require("express");
// var cors = require("cors");
// const app = express();
// const port = 5000;
// var arr_time = []; //접속시간을 milliseconds로 배열에 저장
// var course_count = 0;
// const fs = require("fs");

// var courseGet = new Promise((resolve, reject) => {
//   fs.readFile("course/course_data2.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got course");
//     var courseJson = JSON.parse(data); //change str to json
//     course_count = Object.keys(courseJson).length;
//     global.courseJson = courseJson;
//   });
// });

// var indexGet = new Promise((resolve, reject) => {
//   fs.readFile("course/indexNsize.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got index");
//     var indexJson = JSON.parse(data); //change str to json
//     global.indexJson = indexJson;
//   });
// });
// //console.log(courseJson[0][class_size]) 0번째가 수업 총 인원 출력
// //console.log(indexJson["AI4011-01"]["0"]) AI4011-01이 몇 번째인지 출력

// var AIget = new Promise((resolve, reject) => {
//   fs.readFile("course/AI_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got AI courses");
//     var courseJsonAI = JSON.parse(data); //change str to json
//     course_countAI = Object.keys(courseJsonAI).length;
//     global.courseJsonAI = courseJsonAI;
//   });
// });
// var BSget = new Promise((resolve, reject) => {
//   fs.readFile("course/BS_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got BS courses");
//     var courseJsonBS = JSON.parse(data); //change str to json
//     course_countBS = Object.keys(courseJsonBS).length;
//     global.courseJsonBS = courseJsonBS;
//   });
// });
// var CHget = new Promise((resolve, reject) => {
//   fs.readFile("course/CH_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got CH courses");
//     var courseJsonCH = JSON.parse(data); //change str to json
//     course_countCH = Object.keys(courseJsonCH).length;
//     global.courseJsonCH = courseJsonCH;
//   });
// });
// var CTget = new Promise((resolve, reject) => {
//   fs.readFile("course/CT_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got CT courses");
//     var courseJsonCT = JSON.parse(data); //change str to json
//     course_countCT = Object.keys(courseJsonCT).length;
//     global.courseJsonCT = courseJsonCT;
//   });
// });
// var ECget = new Promise((resolve, reject) => {
//   fs.readFile("course/EC_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got EC courses");
//     var courseJsonEC = JSON.parse(data); //change str to json
//     course_countBS = Object.keys(courseJsonBS).length;
//     global.courseJsonBS = courseJsonBS;
//   });
// });
// var EVget = new Promise((resolve, reject) => {
//   fs.readFile("course/EV_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got EV courses");
//     var courseJsonEV = JSON.parse(data); //change str to json
//     course_countEV = Object.keys(courseJsonEV).length;
//     global.courseJsonEV = courseJsonEV;
//   });
// });
// var FEget = new Promise((resolve, reject) => {
//   fs.readFile("course/FE_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got FE courses");
//     var courseJsonFE = JSON.parse(data); //change str to json
//     course_countFE = Object.keys(courseJsonFE).length;
//     global.courseJsonFE = courseJsonFE;
//   });
// });
// var GSget = new Promise((resolve, reject) => {
//   fs.readFile("course/GS_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got GS courses");
//     var courseJsonGS = JSON.parse(data); //change str to json
//     course_countGS = Object.keys(courseJsonGS).length;
//     global.courseJsonGS = courseJsonGS;
//   });
// });
// var IRget = new Promise((resolve, reject) => {
//   fs.readFile("course/IR_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got IR courses");
//     var courseJsonIR = JSON.parse(data); //change str to json
//     course_countIR = Object.keys(courseJsonIR).length;
//     global.courseJsonIR = courseJsonIR;
//   });
// });
// var MAget = new Promise((resolve, reject) => {
//   fs.readFile("course/MA_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got MA courses");
//     var courseJsonMA = JSON.parse(data); //change str to json
//     course_countMA = Object.keys(courseJsonMA).length;
//     global.courseJsonMA = courseJsonMA;
//   });
// });
// var MCget = new Promise((resolve, reject) => {
//   fs.readFile("course/MC_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got MC courses");
//     var courseJsonMC = JSON.parse(data); //change str to json
//     course_countMC = Object.keys(courseJsonMC).length;
//     global.courseJsonMC = courseJsonMC;
//   });
// });
// var MDget = new Promise((resolve, reject) => {
//   fs.readFile("course/MD_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got MD courses");
//     var courseJsonMD = JSON.parse(data); //change str to json
//     course_countMD = Object.keys(courseJsonMD).length;
//     global.courseJsonMD = courseJsonMD;
//   });
// });
// var MMget = new Promise((resolve, reject) => {
//   fs.readFile("course/MM_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got MM courses");
//     var courseJsonMM = JSON.parse(data); //change str to json
//     course_countMM = Object.keys(courseJsonMM).length;
//     global.courseJsonMM = courseJsonMM;
//   });
// });
// var PSget = new Promise((resolve, reject) => {
//   fs.readFile("course/BS_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got BS courses");
//     var courseJsonBS = JSON.parse(data); //change str to json
//     course_countBS = Object.keys(courseJsonBS).length;
//     global.courseJsonBS = courseJsonBS;
//   });
// });
// var SEget = new Promise((resolve, reject) => {
//   fs.readFile("course/BS_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got BS courses");
//     var courseJsonBS = JSON.parse(data); //change str to json
//     course_countBS = Object.keys(courseJsonBS).length;
//     global.courseJsonBS = courseJsonBS;
//   });
// });
// var UCget = new Promise((resolve, reject) => {
//   fs.readFile("course/UC_courses.json", function (err, data) {
//     if (err) {
//       reject(err);
//     }
//     resolve("got UC courses");
//     var courseJsonUC = JSON.parse(data); //change str to json
//     course_countUC = Object.keys(courseJsonUC).length;
//     global.courseJsonUC = courseJsonUC;
//   });
// });

// app.use(cors()); //cors 비워놓으면 모든 요청 허용
// app.use(express.json());

// function seat_results(time_diff, end_time, course_count) {
//   var arr_seats = []; //{id:과목코드, seats:남은 자리 수} 저장되는 배열
//   for (i = 0; i < course_count; i++) {
//     let seats_i = courseJson[i]["class_size"];
//     let seats_left =
//       seats_i - Math.floor((time_diff - 10000) / ((end_time * 1000) / seats_i));
//     if (seats_left < 0) {
//       arr_seats.push({
//         id: courseJson[i]["course_code"],
//         seats: 0,
//       });
//     }
//     arr_seats.push({
//       id: courseJson[i]["course_code"],
//       seats: seats_left,
//     });
//   }
//   //console.log(arr_seats)
//   return arr_seats;
// }

// app.get("/", (req, res) => {
//   //다 한꺼번에 줄어들어야 함. 지금은 한 과목만
//   var date = { time: Date.now() };
//   console.log("milliseconds:", date.time);
//   arr_time.push(date.time);
//   var time_diff = arr_time[arr_time.length - 1] - arr_time[0];
//   if (time_diff < 10000) {
//     res.send({
//       time: time_diff,
//       pass: "not open",
//     });
//     return;
//   }
//   courseGet.then((result) => console.log(result)); //is course_data2.json ready?
//   indexGet.then((result) => console.log(result)); //is course_index.json ready?
//   //console.log(indexJson[req.body["course_code"]]["0"])
//   for (let i = 0; i < courseJson.length; i++) {
//     let obj = courseJson[i];
//     if (obj[end_time]) {
//       console.log(obj[end_time]);
//     }
//   }
//   var end_time = 12;
//   //var seats_i=courseJson[indexJson["AI3202-01"]["0"]]["class_size"]
//   return res.send({
//     list: courseJson,
//     time: time_diff,
//     pass: "open",
//     seats_left: seat_results(time_diff, end_time, course_count),
//   });
// });

// app.post("/", (req, res) => {
//   var date = { time: Date.now() };
//   console.log("milliseconds:", date.time);
//   arr_time.push(date.time);
//   var time_diff = arr_time[arr_time.length - 1] - arr_time[0];
//   if (time_diff < 10000) {
//     res.send({
//       time: time_diff,
//       pass: "not open",
//     });
//     return;
//   }
//   courseGet.then((result) => console.log(result)); //is course_data2.json ready?
//   indexGet.then((result) => console.log(result)); //is course_index.json ready?
//   let school = req.body["course_code"].slice(0, 2);
//   if (school == "AI") {
//     AIget.then((result) => console.log(result));
//     course_json = courseJsonAI;
//   } else if (school == "BS") {
//     BSget.then((result) => console.log(result));
//     course_json = courseJsonBS;
//   } else if (school == "CH") {
//     CHget.then((result) => console.log(result));
//     course_json = courseJsonCH;
//   } else if (school == "CT") {
//     CTget.then((result) => console.log(result));
//     course_json = courseJsonCT;
//   } else if (school == "EC") {
//     ECget.then((result) => console.log(result));
//     course_json = courseJsonEC;
//   } else if (school == "EV") {
//     EVget.then((result) => console.log(result));
//     course_json = courseJsonEV;
//   } else if (school == "FE") {
//     FEget.then((result) => console.log(result));
//     course_json = courseJsonFE;
//   } else if (school == "GS") {
//     GSget.then((result) => console.log(result));
//     course_json = courseJsonGS;
//   } else if (school == "IR") {
//     IRget.then((result) => console.log(result));
//     course_json = courseJsonIR;
//   } else if (school == "MA") {
//     MAget.then((result) => console.log(result));
//     course_json = courseJsonMA;
//   } else if (school == "MC") {
//     MCget.then((result) => console.log(result));
//     course_json = courseJsonMC;
//   } else if (school == "MD") {
//     MDget.then((result) => console.log(result));
//     course_json = courseJsonMD;
//   } else if (school == "MM") {
//     MMget.then((result) => console.log(result));
//     course_json = courseJsonMM;
//   } else if (school == "PS") {
//     PSget.then((result) => console.log(result));
//     course_json = courseJsonPS;
//   } else if (school == "SE") {
//     SEget.then((result) => console.log(result));
//     course_json = courseJsonSE;
//   } else if (school == "UC") {
//     UCget.then((result) => console.log(result));
//     course_json = courseJsonUC;
//   }

//   let req_num = indexJson[req.body["course_code"]]["0"];
//   let end_time = 12;
//   //var seats_i=courseJson[req_num]["class_size"]
//   let check_results = seat_results(time_diff, end_time, course_count);
//   console.log("check", check_results[req_num]["seats"]);
//   if (check_results[req_num]["seats"] == 0) {
//     res.send({
//       list: course_json,
//       time: time_diff,
//       pass: "failed",
//       seats_left: check_results,
//     });
//     return;
//   }
//   return res.send({
//     list: course_json,
//     time: time_diff,
//     pass: "added",
//     seats_left: check_results,
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
