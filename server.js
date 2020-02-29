const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function(request, response) {
    response.writeHead(200, { "content-type": "text/plain" });

    if (request.url.includes("/write")) {
      const username = url.parse(request.url, true).query.username;
      fs.writeFile("./users.txt", username, err => {
        if (err) {
          console.log(err);
          return;
        }
        response.end();
      });
    }

    if (request.url === "/read") {
      fs.readFile("./users.txt", "utf-8", (err, content) => {
        response.write(content);
        response.end();
      });
    }
    if (request.url === "/delete") {
      fs.truncate("./users.txt", 0, err => {
        if (err) {
          console.log(err);
        }
        response.end();
      });
    }

    if (request.url === "/roll") {
      rollDice();
      if (rollDice === 4) {
        response.write("you win");
        return;
      }
      response.write("you lose");
      response.end();
    }
  })
  .listen(4000);

console.log("listening on: http://localhost:4000");
