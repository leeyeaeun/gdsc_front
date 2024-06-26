const http = require("http");

// 요청을 처리할 콜백 함수 정의
const server = http.createServer((req, res) => {
  // CORS 정책 허용 (개발용)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // POST 요청 처리
  if (req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      console.log("Received data:", data);
      // 여기서 데이터를 처리하고 클라이언트에 응답을 보낼 수 있습니다.
      res.end("Data received successfully");
    });
  } else {
    res.end("Hello, this is a simple server!");
  }
});

// 서버가 리스닝할 포트 설정
const PORT = process.env.PORT || 3000;

// 서버가 클라이언트 요청을 처리하기 위해 리스닝
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
