// postHandler.js  챗지피티가 netlify는 server.js가 필요없고 대신 얘를 써보래서 일단 만들어봤어요..!

exports.handler = async function(event, context) {
  // CORS 설정
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  // POST 요청 처리
  if (event.httpMethod === "POST") {
    try {
      // 요청 데이터 읽기
      const requestBody = JSON.parse(event.body);
      console.log("Received data:", requestBody);

      // 여기서 데이터 처리 로직을 추가할 수 있습니다.
      // 예: 데이터베이스에 저장, 외부 API 호출 등

      // 클라이언트에 응답 전송
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Data received successfully" })
      };
    } catch (error) {
      console.error("Error processing request:", error);

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Error processing request" })
      };
    }
  }

  // POST 요청이 아닌 경우 기본 응답
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "Hello, this is a simple serverless function!" })
  };
};
