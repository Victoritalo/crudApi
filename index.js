import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const usersData = [];
let userUniqueId = randomUUID();
let userMsgId = randomUUID();

app.get("", (req, res) => {
  const httpResponse =
    "Welcome to my Node API Crud!\n" +
    "We're currently working without a proper backend database,\n" +
    "meaning that this APP is 100% client side and we're not saving any of your provided info on any request.\n\n" +
    "We suggest using Postman for a better experience and test. \n" +
    "Check my repository and download Postman config: https://github.com/Victoritalo/crudApi";

  res.set("Content-Type", "text/plain");
  res.send(httpResponse);
});

app.post("/signup", (req, res) => {
  const emailExists = usersData.some((user) => {
    return req.body.userEmail === user.userEmail;
  });
  if (
    req.body.userEmail == "" ||
    req.body.userName == "" ||
    req.body.userPass == ""
  ) {
    return res.status(403).json({ error: `Please fill in the fields` });
  } else if (req.body.userPass !== req.body.confirmPassword) {
    res.status(401).json({ error: "Passwords do not match" });
    return;
  } else if (emailExists) {
    res
      .status(409)
      .json({ error: "Email already registered by another user!" });
    return;
  } else {
    const newUser = {
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      userPass: req.body.userPass,
      userId: userUniqueId,
      userMsgs: [
        {
          messageId: 2345234,
          title: "Welcome!",
          message: "Enjoy the experience!",
        },
      ],
    };
    usersData.push(newUser);
    res.status(200).json({
      message: "User created successfully!",
      userEmail: newUser.userEmail,
      userName: newUser.userName,
      userId: newUser.userId,
    });
  }
});
//logged user & messages
app.get("/:userId/:page", (req, res) => {
  const userId = req.params.userId;
  const usersInfo = usersData.find((user) => {
    return userId === user.userId;
  });
  const currentPage = parseInt(req.params.page);
  const itemsPerPage = 10;
  const startPageIndex = (currentPage - 1) * itemsPerPage;
  const endPageIndex = currentPage * itemsPerPage - 1;
  const paginatedItems = usersInfo.userMsgs.slice(
    startPageIndex,
    endPageIndex + 1
  );
  const total = Math.ceil(usersInfo.userMsgs.length / itemsPerPage);

  if (!usersInfo) {
    res.status(404).json({ error: "No users found!" });
    return;
  } else {
    res.status(200).json({
      userid: usersInfo.userId,
      name: usersInfo.userName,
      messages: paginatedItems,
      totalPages: total,
    });
  }
});

app.post("/login", (req, res) => {
  const verifyUser = usersData.find((user) => {
    return (
      user.userEmail === req.body.userEmail &&
      user.userPass === req.body.userPass
    );
  });
  if (verifyUser) {
    res.status(200).json({
      message: "Login successful!",
      name: verifyUser.userName,
      userId: verifyUser.userId,
      messages: verifyUser.userMsgs,
    });
  } else if (verifyUser === undefined) {
    res.status(400).json({ error: "Wrong credentials!" });
    return;
  }
});

//Create Message
app.post("/:userId/message", (req, res) => {
  const userId = req.params.userId;
  const findUser = usersData.find((user) => {
    return user.userId === userId;
  });

  if (!findUser) {
    res.status(400).json({ error: "Unauthorized" });
    return;
  }
  if (req.body.title == "" || req.body.message == "") {
    res.status(400).json({ error: "Please fill in the fields" });
    return;
  } else {
    const newMessage = {
      messageId: userMsgId,
      title: req.body.title,
      message: req.body.message,
    };
    findUser.userMsgs.push(newMessage);
    res.status(200).json({ message: "Message added successfully" });
  }
});

//Update
app.put("/:userId/:messageId", (req, res) => {
  const userId = req.params.userId;
  const messageId = req.params.messageId;

  const findUser = usersData.find((user) => user.userId === userId);

  if (!findUser) {
    res.status(404).json({
      message:
        "User does not exist or has no permission to access this message",
    });
    return;
  } else if (req.body.title == "" || req.body.message == "") {
    res.status(400).json({ error: "Please fill in the fields" });
    return;
  } else {
    const findMessage = findUser.userMsgs.find((message) => {
      return message.messageId === messageId;
    });

    if (!findMessage) {
      res.status(404).json({ message: "Message does not exist" });
      return;
    } else {
      const updateTitle = req.body.title;
      const updateMsg = req.body.message;
      findMessage.title = updateTitle;
      findMessage.message = updateMsg;
    }
    res.status(200).json({ message: "Message updated successfully" });
  }
});

app.delete("/:userId/:messageId", (req, res) => {
  const userId = req.params.userId;
  const messageId = req.params.messageId;

  const findUser = usersData.find((user) => {
    return user.userId === userId;
  });

  if (!findUser) {
    res.status(404).json({
      message:
        "User does not exist or has no permission to access this message",
    });
  } else {
    const findMessage = findUser.userMsgs.findIndex((message) => {
      return message.messageId === messageId;
    });

    if (findMessage === -1) {
      res.status(404).json({ error: "Message does not exist" });
    } else {
      findUser.userMsgs.splice(findMessage, 1);
      res.status(200).json({ message: "Messaged successfully deleted" });
    }
  }
});

app.listen(3000, () => {
  console.log("Connected!");
  console.log("Node API running on port 3000");
  console.log(userUniqueId);
});
