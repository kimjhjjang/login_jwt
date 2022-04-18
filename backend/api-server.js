const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cookieParser());

const members = [
    {
        id: 3,
        name: "김정훈",
        loginId: "kimjhjjang",
        loginPw: "1234"
    },
    {
        id: 4,
        name: "테스터",
        loginId: "test",
        loginPw: "1234"
    },
];


app.get('/api/account', (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, "abc1234567", (err, decoded) => {
            if (err) {
                return res.send(401);
            } else {
                return res.send(decoded); 
            }
        });
    }
    else {
        res.send(401);
    }
});

app.post('/api/account', (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    console.log(loginId, "//", loginPw);

    const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);

    console.log(member);
    if (member) {

        const options = {
            domain: "localhost",
            path: "/",
            httpOnly: true
        };

        const token = jwt.sign({
            id: member.id,
            name: member.name,
        }, "abc1234567", {
            expiresIn: "15m",
            issuer: "kimjhjjang"
        });

        res.cookie("token", token, options);
        res.send(member);

    } else {
        res.send(404);
    }
});


app.delete('/api/account', (req, res) => {
    if (req.cookies && req.cookies.token) {
        res.clearCookie("token");
    }
    res.send(200);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});