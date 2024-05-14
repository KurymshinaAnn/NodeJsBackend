const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");

  const hasHello = url.searchParams.has("hello");
  const hasUsers = url.searchParams.has("users");

  if (
    url.searchParams.size > 1 ||
    (!hasHello && !hasUsers && url.searchParams.size === 1)
  ) {
    response.statusCode = 500;
    response.statusMessage = "Internal Server Error";
    response.end();
    return;
  }

  if (hasHello) {
    const name = url.searchParams.get("hello");
    if (name && name.length !== 0) {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain";
      response.write(`Hello, ${name}`);
      response.end();
      return;
    } else {
      response.status = 400;
      response.statusMessage = "Bad Request";
      response.header = "Content-Type: text/plain";
      response.write("Enter a name");
      response.end();
      return;
    }
  }

  if (hasUsers) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello world");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1");
});
