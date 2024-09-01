var totalCredits = 0;
function goToPage2() {
  window.location.href = "page3.html"; // 페이지 2로 이동
}

//대기자 수 추가
function calculateWaitingList() {
  const maxValue = 80;
  const peakTime = 20;
  const decayRateLeft = 0.03;
  const decayRateRight = 0.0001;
  let t = 0; // Initial value of t

  function a_function(t) {
    return (
      maxValue *
        Math.exp(-decayRateLeft * Math.pow(t - peakTime, 2)) *
        (t < peakTime ? 1 : 0) +
      maxValue *
        Math.exp(-decayRateRight * Math.pow(t - peakTime, 2)) *
        (t >= peakTime ? 1 : 0)
    );
  }

  let waiting_list = [];

  t += 10;
  let waiting_people = Math.floor(a_function(t) + 173);

  while (waiting_people >= 0) {
    waiting_list.push(waiting_people);
    waiting_people -= 50;
  }

  console.log("waiting_list is ", waiting_list); // 대기자 수 결과
  return waiting_list;
}

// 모달을 표시하고 대기자 수를 업데이트하는 함수
function showWaitingModal() {
  const waiting_list = calculateWaitingList(); // 대기자 수 배열 가져오기
  //console.log("Hello");
  if (!waiting_list || waiting_list.length === 0) {
    console.error("waitingList is undefined or empty");
    return; // 배열이 없거나 비어있으면 함수를 종료
  }
  //console.log("waiting_list exists");

  // 1초마다 대기자 수 업데이트
  let index = 0;
  //console.log("index is ", index);
  const interval = setInterval(() => {
    // document.getElementById("popup").style.display = "block";
    if (index < waiting_list.length) {
      console.log("first waiting_list is ", waiting_list);
      console.log("index is ", index);
      document.getElementById("waitingNumber").textContent =
        waiting_list[index];
      index++;
      //      console.log("index is ", index);
    } else {
      clearInterval(interval); // 모든 대기자 수가 업데이트되면 타이머 중지
      //console.log("index addition will finish at ", index);
    }
  }, 1000);
}

function showWaiting() {
  // 접속 대기 창 표시 코드
  document.getElementById("popup").style.display = "block";
  showWaitingModal();
  const timer = setTimeout(() => {
    showSaved();
    document.getElementById("waitingModal").style.display = "block";
  }, 2000);
}

function hideWaiting() {
  // 접속 대기 창 숨기기 코드
  document.getElementById("popup").style.display = "none";
  const timer = setTimeout(() => {
    document.getElementById("waitingModal").style.display = "none";
  }, 2000);
}

function showWaiting1() {
  // 접속 대기 창 표시 코드
  document.getElementById("waitingModal").style.display = "block";
}

function hideWaiting1() {
  // 접속 대기 창 숨기기 코드
  document.getElementById("waitingModal").style.display = "none";
}

function showSaved() {
  //하단 saved바 표시 코드
  const modal = document.getElementById("savedModal");
  modal.style.bottom = "0"; // 모달을 화면 하단에 고정
  modal.style.opacity = "1"; // 모달의 불투명도를 100%로 설정
  setTimeout(hideSaved, 3000); // 3초 후에 모달을 숨기기 위한 타이머 설정
}

function hideSaved() {
  // 하단 saved바 숨기기 코드
  const modal = document.getElementById("savedModal");
  modal.style.bottom = "-100px"; // 모달을 화면 아래로 슬라이드하여 숨기기
  //modal.style.opacity = "0"; // 모달의 불투명도를 0%로 설정
}

function showDeleted() {
  //하단 deleted바 표시 코드
  const modal = document.getElementById("deletedModal");
  modal.style.bottom = "0"; // 모달을 화면 하단에 고정
  modal.style.opacity = "1"; // 모달의 불투명도를 100%로 설정
  setTimeout(hideDeleted, 3000); // 3초 후에 모달을 숨기기 위한 타이머 설정
}

function hideDeleted() {
  // 하단 deleted바 숨기기 코드
  const modal = document.getElementById("deletedModal");
  modal.style.bottom = "-100px"; // 모달을 화면 아래로 슬라이드하여 숨기기
}

var selectedCoursesList = [];

let department;
document.getElementById("SE").addEventListener("click", function () {
  department = "SE";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("GS").addEventListener("click", function () {
  department = "GS";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("UC").addEventListener("click", function () {
  department = "UC";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("MM").addEventListener("click", function () {
  department = "MM";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("FE").addEventListener("click", function () {
  department = "FE";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("MD").addEventListener("click", function () {
  department = "MD";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("CT").addEventListener("click", function () {
  department = "CT";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("IR").addEventListener("click", function () {
  department = "IR";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("AI").addEventListener("click", function () {
  department = "AI";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("EC").addEventListener("click", function () {
  department = "EC";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("MA").addEventListener("click", function () {
  department = "MA";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("MC").addEventListener("click", function () {
  department = "MC";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("EV").addEventListener("click", function () {
  department = "EV";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("BS").addEventListener("click", function () {
  department = "BS";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("PS").addEventListener("click", function () {
  department = "PS";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});
document.getElementById("CH").addEventListener("click", function () {
  department = "CH";
  console.log(department);
  showWaiting1();
  const timer = setTimeout(() => {
    hideWaiting1();
  }, 1000);
});

function showCourses(division) {
  // 해당 division에 맞는 과목 목록을 가져와서 표시

  var tableBody = document.getElementById("courseTableBody");

  // 기존의 과목 목록 삭제
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  } else {
    console.error("Error: Table body not found.");
    return;
  }
  var jsonFileName = division + "_courses.json";
  // JSON 파일에서 데이터 불러오기
  fetch("./course/" + jsonFileName)
    .then((response) => response.json())
    .then((courses) => {
      courses.forEach(function (course, index) {
        var row = document.createElement("tr");

        // "NO" 데이터 추가
        var noCell = document.createElement("td");
        noCell.textContent = index + 1;
        row.appendChild(noCell);

        // 나머지 데이터 추가
        var keys = [
          "course_code",
          "Video",
          "course_title",
          "course_type",
          "",
          "course_time",
          "instructor",
          "grading",
          "class_size",
          "class_size",
          "course_credit",
        ];
        keys.forEach(function (key) {
          var cell = document.createElement("td");
          if (key === "Size") {
            cell.textContent = course["class_size"];
          } else if (key === "Grade") {
            cell.textContent = "Letter";
          } else {
            cell.classList.add("scrollable-cell"); // 스크롤 가능한 셀 클래스 추가
            var content = document.createElement("div");
            content.classList.add("scrollable-content"); // 스크롤 가능한 콘텐츠 클래스 추가
            content.textContent = key === "" ? "" : course[key];
            cell.appendChild(content);
          }
          row.appendChild(cell);
        });

        // 클릭한 전공 department에 저장
        // department 콘솔에 출력

        // "Add" 버튼 추가
        var addButtonCell = document.createElement("td");
        var addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.addEventListener("click", function () {
          // 버튼이 클릭되었을 때 수행할 동작 추가
          // 접속 대기 창 표시
          showWaiting();

          // 5초 후에 addAfterDelay 함수 호출
          setTimeout(() => {
            hideWaiting();
            setTimeout(() => {
              var clickedCourseCode = courses[index]["course_code"];
              NewcourseTime = courses[index]["course_time"];
              addToSelectedCourses(course);
              showSelectedCoursesOnTimetable();
              const $table = document.getElementById("selectedCoursesTable");
            }, 1000);
          }, 1000);

          // 서버에 데이터를 전송하기 위한 JSON 객체 생성
          var data = {
            courseCode: clickedCourseCode,
            // 필요한 경우 다른 데이터도 추가할 수 있습니다.
          };

          // POST 요청을 보냄
          fetch("http://localhost:3000", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //or text/plain
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              // 서버로부터의 응답을 JSON으로 파싱하기 전에 오류 처리 추가
              return response.text();
            })
            .then((data) => {
              // 서버로부터의 응답 처리
              console.log("Server response:", data);
              // 필요한 경우 추가 작업 수행
            })
            .catch((error) => {
              // 오류 메시지 출력
              console.error(
                "There was a problem with your fetch operation:",
                error
              );
            });
        });
        addButtonCell.appendChild(addButton);
        row.appendChild(addButtonCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading courses:", error));
}

document.getElementById("btnReset").addEventListener("click", function () {
  showCourses(department);
});

var selectedCoursesCount = 0;
var NewcourseTime = [];
var courseTimes = [];

function addAfterDropCourses(course) {
  var row = document.createElement("tr");
  var noCell = document.createElement("td");
  noCell.textContent = ++selectedCoursesCount;
  row.appendChild(noCell);

  var keys = [
    "course_code",
    "course_title",
    "course_time",
    "instructor",
    "grading",
    "Adivisor",
    "course_credit",
    "Drop",
  ];
  keys.forEach(function (key) {
    var cell = document.createElement("td");
    if (key === "Grade" || key === "Adivisor") {
      // Grade와 Advisor는 빈 문자열로 설정
      cell.textContent = "";
    } else if (key === "Drop") {
      // Drop 버튼 추가
      var dropButton = document.createElement("button");
      dropButton.textContent = "Drop";
      dropButton.addEventListener("click", function () {
        // drop 버튼이 클릭되었을 때 수행할 동작 추가 (예를 들어, 해당 행을 삭제하는 등)
        showWaiting1();
        dropCourse(course);
        showDeleted();
        console.log(
          "Drop button clicked for course_code",
          course["course_code"]
        );
        console.log(selectedCoursesList);
        const droppedCourseTimes = course["course_time"].split("\n");
        // 선택된 과목 리스트에 있는 모든 과목을 다시 선택된 과목 테이블에 추가
        selectedCoursesList.forEach((course) => {
          addAfterDropCourses(course);
        });

        // 각 시간대에 해당하는 모든 셀의 배경색을 제거
        droppedCourseTimes.forEach((time) => {
          const splitTimes = splitTimeValues([time]);
          splitTimes.forEach((time) => {
            const cell = document.getElementById(time);
            if (cell) {
              cell.style.backgroundColor = ""; // 배경색 제거

              // 셀 내부의 모든 div 요소를 선택하여 제거
              cell.querySelectorAll("div").forEach((div) => {
                div.remove();
              });
            }
          });
        });
        colorIndex = 0;

        updateCoursesNumber();

        const $table = document.getElementById("selectedCoursesTable");
      });
      cell.appendChild(dropButton);
    } else {
      // 나머지 키에 대해 course 객체의 속성값을 사용
      cell.textContent = course[key.toLowerCase()] || "";
    }
    row.appendChild(cell);
  });

  selectedCoursesTableBody.appendChild(row);
}

function addToSelectedCourses(course) {
  // 선택한 과목을 추가하는 함수
  if (NewcourseTime) {
    if (
      !selectedCoursesList.some((selectedCourse) =>
        isTimeConflict(selectedCourse.course_time, NewcourseTime)
      )
    ) {
      selectedCoursesList.push({
        course_code: course.course_code,
        course_credit: course.course_credit,
        course_time: course.course_time,
        course_title: course.course_title,
        instructor: course.instructor,
        grading: course.grading,
        // 과목 코드와 학점을 배열에 추가
      });
      updateCoursesNumber();
      console.log("현재 selected List 목록: ", selectedCoursesList);
      selectedCoursesCount++;
    } else {
      alert(
        "There are times of duplicate enrollment courses. Please check timetable."
      );
      console.log("과목 시간이 겹칩니다 :", NewcourseTime);
      console.log("현재 selected List 목록: ", selectedCoursesList);
      return;
    }
  }

  var row = document.createElement("tr");
  var noCell = document.createElement("td");
  noCell.textContent = selectedCoursesCount;
  row.appendChild(noCell);

  var keys = [
    "course_code",
    "course_title",
    "course_time",
    "instructor",
    "grading",
    "Adivisor",
    "course_credit",
    "Drop",
  ];
  keys.forEach(function (key) {
    var cell = document.createElement("td");
    if (key === "Grade" || key === "Adivisor") {
      // Grade와 Advisor는 빈 문자열로 설정
      cell.textContent = "";
    } else if (key === "Drop") {
      // Drop 버튼 추가
      var dropButton = document.createElement("button");
      dropButton.textContent = "Drop";
      dropButton.addEventListener("click", function () {
        // drop 버튼이 클릭되었을 때 수행할 동작 추가 (예를 들어, 해당 행을 삭제하는 등)
        dropCourse(course);
        console.log(
          "Drop button clicked for course_code",
          course["course_code"]
        );
        console.log(selectedCoursesList);
        const droppedCourseTimes = course["course_time"].split("\n");
        // 선택된 과목 리스트에 있는 모든 과목을 다시 선택된 과목 테이블에 추가
        selectedCoursesList.forEach((course) => {
          addAfterDropCourses(course);
        });

        // 각 시간대에 해당하는 모든 셀의 배경색을 제거
        droppedCourseTimes.forEach((time) => {
          const splitTimes = splitTimeValues([time]);
          splitTimes.forEach((time) => {
            const cell = document.getElementById(time);
            if (cell) {
              cell.style.backgroundColor = "";
              // 셀 내부의 모든 div 요소를 선택하여 제거
              cell.querySelectorAll("div").forEach((div) => {
                div.remove();
              }); // 배경색 제거
            }
          });
        });
        colorIndex = 0;

        updateCoursesNumber();

        const $table = document.getElementById("selectedCoursesTable");
      });
      cell.appendChild(dropButton);
    } else {
      // 나머지 키에 대해 course 객체의 속성값을 사용
      cell.textContent = course[key.toLowerCase()] || "";
    }
    row.appendChild(cell);
  });

  selectedCoursesTableBody.appendChild(row);
}

function dropCourse(course) {
  // 선택한 과목을 제거하는 함수
  const index = selectedCoursesList.findIndex(
    (item) => item.course_code === course.course_code
  );
  if (index !== -1) {
    selectedCoursesList.splice(index, 1); // 해당 인덱스의 과목 제거
  }
  selectedCoursesCount = 0;
  showWaiting1();
  setTimeout(() => {
    hideWaiting1();
  }, 1000); // 1초 후 모달 숨김
  showDeleted();
  clearSelectedCoursesTable();
  showSelectedCoursesOnTimetable();
}

function clearSelectedCoursesTable() {
  const tableBody = document.getElementById("selectedCoursesTableBody");
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  } else {
    console.error("Error: Selected courses table body not found.");
  }
}
// 시간표 형태 : "TUE 13:00~14:30\nTHU 13:00~14:30"
function isTimeConflict(courseTime1, courseTime2) {
  const timeRanges1 = courseTime1.split("\n");
  const timeRanges2 = courseTime2.split("\n");

  for (const range1 of timeRanges1) {
    for (const range2 of timeRanges2) {
      const [day1, timeRange1] = range1.split(" ");
      const [day2, timeRange2] = range2.split(" ");

      if (day1 === day2 && isOverlap(timeRange1, timeRange2)) {
        return true; // 시간이 겹치면 충돌이 발생했음을 반환
      }
    }
  }

  return false; // 겹치는 시간이 없으면 충돌이 발생하지 않음을 반환
}

function isOverlap(time1, time2) {
  const [start1, end1] = time1.split("~").map((time) => timeToMinutes(time));
  const [start2, end2] = time2.split("~").map((time) => timeToMinutes(time));

  // 겹치는 경우: 끝나는 시간이 시작 시간보다 이전이거나, 시작 시간이 끝나는 시간보다 이후인 경우
  return !(end1 <= start2 || end2 <= start1);
}

function timeToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function updateCoursesNumber() {
  // 과목 수와 학점 합계를 초기화
  let courseCount = 0;
  let courseCount2 = 0;
  let totalCredits = 0;
  let totalCredits2 = 0;

  // selectedCoursesList를 순회하면서 과목 수와 학점 합계를 계산
  selectedCoursesList.forEach((course) => {
    courseCount++;
    courseCount2++; // 과목 수 증가
    totalCredits += parseInt(course.course_credit);
    totalCredits2 += parseInt(course.course_credit); // 학점 합계 증가
    // 학점 합계 증가
  });

  // HTML 업데이트
  const courseCountElement = document.getElementById("courseCount");
  const courseCount2Element = document.getElementById("courseCount2");
  const totalCreditsElement = document.getElementById("totalCredits");
  const totalCredits2Element = document.getElementById("totalCredits2");

  if (
    courseCountElement &&
    totalCreditsElement &&
    courseCount2Element &&
    totalCredits2Element
  ) {
    courseCountElement.textContent = courseCount;
    courseCount2Element.textContent = courseCount2;
    totalCreditsElement.textContent = totalCredits;
    totalCredits2Element.textContent = totalCredits2;
  } else {
    console.error("Error: HTML elements not found.");
  }
}

let tooltipElem;

document.onmouseover = function (event) {
  let target = event.target;

  // data-tooltip 속성이 있는 요소
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;

  // 툴팁 요소를 만듭니다.

  tooltipElem = document.createElement("div");
  tooltipElem.className = "tooltip";
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  // 툴팁 요소를 data-tooltip 속성이 있는 요소 위, 가운데에 위치시킵니다.
  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;

  if (left < 0) left = 0; // 툴팁이 창 왼쪽 가장자리를 넘지 않도록 합니다.

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    // 툴팁이 창 위로 넘치면 요소 아래에 보여줍니다.
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + "px";
  tooltipElem.style.top = top + "px";
};

document.onmouseout = function (e) {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};

function showSelectedCoursesOnTimetable() {
  // 시간표에 추가된 과목들로 시간표 갱신
  clearTimetable(); // 시간표 초기화
  // selectedCourseList를 순회하면서 색상을 할당
  selectedCoursesList.forEach((course, index) => {
    const color = getNextColor(index);
    console.log(`Index ${index}:`, course, `Color: ${color}`);
    highlightTimeSlots(course, color); // 선택된 각 과목을 시간표에 표시
  });
}

function highlightTimeSlots(course, color) {
  // 과목의 시간대 가져오기
  const courseTimes = course["course_time"].split("\n");
  const courseCode = course["course_code"];

  // 각 시간대에 대해 반복하면서 시간표 셀의 배경색 변경
  courseTimes.forEach((time) => {
    // 시간대를 시간과 요일로 분리하여 처리
    const splitTimes = splitTimeValues([time]); // splitTimeValues 함수 호출 시 배열로 전달
    splitTimes.forEach((time, index) => {
      // splitTimes의 각 항목은 요일-시간 형식이므로 다시 분할
      const cell = document.getElementById(time);

      if (cell) {
        // 이미 해당 시간대에 과목 코드가 표시되어 있는지 확인
        const existingCodeElement = cell.querySelector(".course-code");
        if (!existingCodeElement) {
          // 과목 코드가 없을 때만 추가
          // 과목 코드 엘리먼트 생성
          const codeElement = document.createElement("div");
          codeElement.classList.add("course-code");
          codeElement.textContent = index === 0 ? courseCode : ""; // 첫 번째 셀에만 과목 코드 추가
          codeElement.style.fontSize = "10px";

          // 과목 코드 엘리먼트를 셀에 추가
          cell.appendChild(codeElement);
        }

        cell.style.backgroundColor = color; // 색상을 변경하는 예시 코드
      }
    });
  });
}

let colorIndex = 0;

function clearTimetable() {
  const cells = document.querySelectorAll(
    "td[id^='MON'], td[id^='TUE'], td[id^='WED'], td[id^='THU'], td[id^='FRI']"
  );

  cells.forEach((cell) => {
    cell.style.backgroundColor = ""; // 배경색 초기화

    // 셀 내부의 모든 div 요소를 선택하여 제거
    cell.querySelectorAll("div").forEach((div) => {
      div.remove();
    });
  });
}

function splitTimeValues(timeValues) {
  let splitTimes = [];

  // 각 시간대를 순회하면서 처리
  timeValues.forEach((timeValue) => {
    // 시간대를 요일과 시작 시간, 종료 시간으로 분할
    const [day, timeRange] = timeValue.split(" ");
    const [startTime, endTime] = timeRange.split("~");
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // 시작 시간과 종료 시간을 분 단위로 계산
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // 각 시간대별로 시작 시간부터 종료 시간 전까지의 셀 id 구하기
    for (let i = startTotalMinutes; i < endTotalMinutes; i += 30) {
      const currentHour = Math.floor(i / 60); // 현재 시간
      const currentMinute = i % 60; // 현재 분
      const currentHourStr = currentHour.toString().padStart(2, "0"); // 시간을 두 자리 숫자로 변환
      const currentMinuteStr = currentMinute.toString().padStart(2, "0"); // 분을 두 자리 숫자로 변환

      // 해당 시간대의 셀 ID를 구성
      const cellId = `${day}-${currentHourStr}:${currentMinuteStr}`;
      splitTimes.push(cellId);
    }
  });
  return splitTimes; // 모든 시간대의 셀 ID를 담은 배열 반환
}

function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}
// highlightTimeSlots 함수를 호출할 때마다 리스트의 다음 색상을 선택합니다.

function getNextColor(colorIndex) {
  return colors[colorIndex % colors.length];
}

// 특정한 RGB 값을 사용하여 색상 리스트를 만듭니다.
const colors = [
  rgb(173, 255, 47),
  rgb(127, 255, 212),
  rgb(255, 99, 71),
  rgb(222, 184, 135),
  rgb(255, 127, 80),
  rgb(255, 192, 203),
  rgb(255, 215, 0),
  rgb(189, 183, 107),
  rgb(255, 99, 71),
];

document.getElementById("searchButton").addEventListener("click", function () {
  performSearch();
});

document
  .getElementById("courseSearch")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

function performSearch() {
  const searchText = document
    .getElementById("courseSearch")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#courseTableBody tr");

  rows.forEach((row) => {
    const titleText = row.cells[3].textContent.toLowerCase();
    const instructorText = row.cells[7].textContent.toLowerCase();
    const codeText = row.cells[1].textContent.toLowerCase();

    if (
      titleText.includes(searchText) ||
      instructorText.includes(searchText) ||
      codeText.includes(searchText)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
