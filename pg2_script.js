var totalCredits = 0;
function goToPage1() {
  window.location.href = "page1.html"; // 페이지 2로 이동
}
var selectedCoursesList = [];
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

        // "Add" 버튼 추가
        var addButtonCell = document.createElement("td");
        var addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.addEventListener("click", function () {
          // 버튼이 클릭되었을 때 수행할 동작 추가
          var clickedCourseCode = courses[index]["course_code"];
          NewcourseTime = courses[index]["course_time"];
          addToSelectedCourses(course);
          showSelectedCoursesOnTimetable();
          const $table = document.getElementById("selectedCoursesTable");
        });
        addButtonCell.appendChild(addButton);
        row.appendChild(addButtonCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading courses:", error));
}

var selectedCoursesCount = 0;
var NewcourseTime = [];
var courseTimes = [];

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
        // 과목 코드와 학점을 배열에 추가
      });
      updateCoursesNumber();
      console.log("현재 selected List 목록: ", selectedCoursesList);
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
        dropCourse(course);
        console.log(
          "Drop button clicked for course_code",
          course["course_code"]
        );
        const droppedCourseTimes = course["course_time"].split("\n");

        // 각 시간대에 해당하는 모든 셀의 배경색을 제거
        droppedCourseTimes.forEach((time) => {
          const splitTimes = splitTimeValues([time]);
          splitTimes.forEach((time) => {
            const cell = document.getElementById(time);
            if (cell) {
              cell.style.backgroundColor = ""; // 배경색 제거
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
  // 해당 과목의 행(row)을 찾아서 삭제
  const $table = document.getElementById("selectedCoursesTable");
  const rows = $table.rows;

  // 과목의 행(row)을 찾음
  let rowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    if (cells[0].textContent === String(selectedCoursesCount)) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex !== -1) {
    // 과목의 행(row)이 존재하는 경우에만 실행
    // 해당 행(row) 삭제
    rows[rowIndex].remove();

    // 삭제된 행(row) 이후의 모든 행(row)의 NO 값 조정
    for (let i = rowIndex; i < rows.length; i++) {
      const cells = rows[i].cells;
      cells[0].textContent = String(i + 1);
    }

    selectedCoursesCount -= 1; // 선택한 과목 수 감소
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
  selectedCoursesList.forEach(function (course) {
    highlightTimeSlots(course, getNextColor()); // 선택된 각 과목을 시간표에 표시
  });
}

function highlightTimeSlots(course, color) {
  // 과목의 시간대 가져오기
  const courseTimes = course["course_time"].split("\n");

  // 각 시간대에 대해 반복하면서 시간표 셀의 배경색 변경
  courseTimes.forEach((time) => {
    // 시간대를 시간과 요일로 분리하여 처리
    const splitTimes = splitTimeValues([time]); // splitTimeValues 함수 호출 시 배열로 전달
    splitTimes.forEach((time) => {
      // splitTimes의 각 항목은 요일-시간 형식이므로 다시 분할
      const cell = document.getElementById(time);

      if (cell) {
        cell.style.backgroundColor = color; // 색상을 변경하는 예시 코드
      }
    });
  });
}
let colorIndex = 0;

function clearTimetable() {
  // 시간표에서 모든 과목 제거
  const cells = document.querySelectorAll("Timetable");
  cells.forEach((cell) => {
    cell.style.backgroundColor = ""; // 배경색 초기화
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
function getNextColor() {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length; // 다음 색상을 선택하고, 리스트의 끝에 도달하면 다시 처음으로 돌아갑니다.
  return color;
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
