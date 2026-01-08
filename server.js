const http = require("http");

let users = [];

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // REGISTER
    if (req.method === "POST" && req.url === "/register") {
        let body = "";

        req.on("data", chunk => body += chunk.toString());

        req.on("end", () => {
            const data = JSON.parse(body);
            users.push(data);
            res.end("Registration successful");
        });
    }

    // LOGIN
    else if (req.method === "POST" && req.url === "/login") {
        let body = "";

        req.on("data", chunk => body += chunk.toString());

        req.on("end", () => {
            const data = JSON.parse(body);
            const found = users.find(
                u => u.email === data.email && u.password === data.password
            );

            if (found) {
                res.end("Login successful");
            } else {
                res.end("Invalid credentials");
            }
        });
    }

    // DEFAULT
    else {
        res.end("Backend running");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
