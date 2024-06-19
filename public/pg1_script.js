      // 페이지 2로 이동하는 함수 정의
      function goToPage2() {
        window.location.href = "page2.html"; // 페이지 2로 이동
      }
      //타이머
      window.onload = function () {
        var second = 50;
        var minute = 59;
        var hour = 14;
        var appendSecond = document.getElementById("second");
        var appendMinute = document.getElementById("minute");
        var appendHour = document.getElementById("hour");
        var Interval;

        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);

        function startTimer() {
          second++;

          if (second <= 9) {
            appendSecond.innerText = "0" + second;
          }

          if (second > 9) {
            appendSecond.innerText = second;
          }

          if (second >= 60) {
            console.log("minute");
            minute++;
            second = 0;
            appendSecond.innerText = "0" + 0;
          }

          if (minute <= 9) {
            appendMinute.innerText = "0" + minute;
          }

          if (minute > 9) {
            appendSecond.innerText = second;
          }

          if (minute >= 60) {
            console.log("hour");
            hour++;
            minute = 0;
            appendMinute.innerText = "0" + 0;
          }

          if (hour <= 9) {
            appendHour.innerText = "0" + hour;
          }

          if (hour > 9) {
            appendHour.innerText = hour;
          }
        }
      };
