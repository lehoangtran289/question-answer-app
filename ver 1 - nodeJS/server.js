// reference: expressjs.com

// GET: lay du lieu, lay info user, lay bai post ...
// POST: co' body, tao moi data tren database, (create account ...)
// PUT: co' body, edit thong tin,
// DELETE: xoa bai viet, ...

// req đến -> res trả về, 1 req -> 1 res (sau khi .send() thì 1 vòng req, res đã kết thúc)
// req + res(header): user info, cookie, url, method..
// res(có body):
// req(có body hoặc ko): khi ng dung muon save data len server (account, form...)
// req -> chua thong tin user muon lay; res -> data tu server tra ve

// type url vào browser và ENTER -> gui method GET toi server

// form 'action=' -> define 'route' ; form 'method=' -> define GET/POST... => server route duy nhất

// Nếu route ko có path, route đó sẽ chặn ngoài cùng, chạy đầu tiên, xong mới tới các route có '/'

// JSON.parse(data) -> convert data lay ra, JSON.stringify() -> convert data ghi vao

// Muốn web tương tác, chạy file dưới client -> tạo file js trong ./public

// ----------------------------------------------------------------------------

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const server = express();
server.use(express.static("public")); //make server use 'public' folder -> .css
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// home-page -> random 1 question 
server.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/index.html"));
});

// create question: GET -> send HTML
server.get("/create-question", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/create-question.html"));
});

// create question: POST -> save data
server.post("/create-question", (req, res) => {
  console.log(req.body);
  // const newQuestion = {
  //     id: 0,
  //     content: '',
  //     yes: 0,
  //     no: 0,
  //     createdAt: '',
  // };

  // fs.writeFIle inside fs.readFile
  fs.readFile("./data.json", (error, data) => {
    if (error) {
      res.status(500).send("Internal Server Error");
    }
    const questions = JSON.parse(data); // data = mang du lieu question
    console.log(typeof questions);

    questions.push({
      // push a question object to array 'questions'
      id: questions.length,
      content: req.body.content, // .content from name:'content' in <form>
      yes: 0,
      no: 0,
      createdAt: new Date().toUTCString()
    });

    fs.writeFile("./data.json", JSON.stringify(questions), error => {
      if (error) {
        res.status(500).send("Internal Server Error");
      }

      //gui toi ajax
      res.status(200).json({
        id: questions.length - 1,
      });
    });
  });

  //res.status(201).end("success");
});

// :quesId, :vote are request Param
server.get("/vote/:questionId/:vote", async (req, res) => {
  // const questionId = req.params.questionId
  // const vote = req.params.vote
  const { questionId, vote } = req.params;
  console.log(questionId, vote);

  fs.readFile("./data.json", (error, data) => {
    if (error) {
      res.status(500).send("Internal Server Error");
    }

    const questions = JSON.parse(data);
    var tempQuestion;
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        vote === "yes" ? (item.yes += 1) : (item.no += 1);
        tempQuestion = item;
        break;
      }
    }
    fs.writeFile("./data.json", JSON.stringify(questions), error => {
      if (error) {
        res.status(500).send("Internal Server Error");
      }
      // ban vao ajax
      res.status(200).send(`Success`);
      // res.status(200).json(tempQuestion);
      // res.status(200).send(`
      //           <!DOCTYPE html>
      //           <html lang="en">
      //               <head>
      //                   <meta charset="UTF-8" />
      //                   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //                   <title>Quick answer</title>
      //               </head>
            
      //               <body>
      //                   <h2>${tempQuestion.content}</h2>
      //                   <h3>Yes: ${tempQuestion.yes}  No: ${tempQuestion.no}</h3>
      //               </body>
      //           </html>
      //       `);
    });
  });
});

// Route using Ajax
server.get("/result/:questionId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/public/vote-result.html"));
});

// another way to define url, using query
server.get("/get-question-by-id", (req, res) => {
  console.log(req.query); //return an object after "?"
  const questionId = req.query.questionId;
  
  fs.readFile('./data.json', (error, data)=>{
    if (error) {
      res.status(500).send("Internal Server Error");
    }
  
    const questions = JSON.parse(data);
    let selectQuestion;
    for(let item of questions) {
      if (item.id === Number(questionId)) {
        selectQuestion = item;
        break;
      }
    }

    // server tra ve cai j -> chinh la (data) trong success cua vote-result.js
    if (selectQuestion) {
      res.status(200).json(selectQuestion);
    } else {
      res.status(200).json({message: 'Question not found'});
    }
    
  });
});

// route de bắn ajax vào, cụ thể là bắn randomQuestion vào data trong ajax index.js
server.get('/random-question', (req, res)=>{
  fs.readFile("./data.json", (error, data) => {
    if (error) {
      res.status(500).send("Internal Server Error");
    }
    
    const questions = JSON.parse(data); //array cac cau hoi
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex]; //Lay cau hoi ngau nhien trong data
    
    res.status(200).json(randomQuestion);
  });
});

server.listen(3000, error => {
  if (error) {
    throw error;
  }
  console.log("Listen on port 3000...");
});
