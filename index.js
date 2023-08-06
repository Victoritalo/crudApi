import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const usersData = [];
let userUniqueId = 0;
let userMsgId = 2345234;

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
  if (req.body.userEmail == "" ||req.body.userName == "" ||req.body.userPass == "") {
    return res.status(403).json({ error: `Please fill in the fields`});
  } else if (req.body.userPass !== req.body.confirmPassword) {
    res.status(401).json({ error: "Passwords do not match" });
    return
  }else if (emailExists) {
    res.status(409).json({ error: "Email already registered by another user!" });
    return;
  } else {
    const newUser = {
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      userPass: req.body.userPass,
      userId: userUniqueId,
      userMsgs: [],
    };
    userUniqueId++;
    usersData.push(newUser);
    res.status(200).json({
      message: "User created successfully!",
      userEmail: newUser.userEmail,
      userName: newUser.userName,
      userId: newUser.userId,
    });
  }
});

app.get("/users", (req, res) => {
  const usersInfo = usersData.map((user) => {
    return {
      name: user.userName,
      id: user.userId,
      email: user.userEmail,
      messages: user.userMsgs,
    };
  });

  if (usersInfo.length === 0) {
    res.status(404).json({ error: "No users found!" });
    return;
  } else {
    res.status(200).json({ UsersList: usersInfo });
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
      userID: verifyUser.userId,
      messages: verifyUser.userMsgs,
    });
  } else if(verifyUser === undefined) {
    res.status(400).json({ error: "Wrong credentials!" });
    return;
  }
});

//Create Message
app.post("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const findUser = usersData.find((user) => {
    return user.userId === userId;
  });

  if (!findUser) {
    res.status(404).json({ error: "User not found!" });
    return;
  } else {
    const newMessage = {
      messageId: userMsgId,
      title: req.body.title,
      message: req.body.message,
    };
    findUser.userMsgs.push(newMessage);
    userMsgId++;
    res
      .status(200)
      .json({ user: findUser.userName, message: findUser.userMsgs });
  }
});

//Update
app.put("/:userId/:messageId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const messageId = parseInt(req.params.messageId);

  const findUser = usersData.find((user) => {
    return user.userId === userId;
  });

  if (!findUser) {
    res.status(404).json({
      error: "User does not exist or has no permission to access this message",
    });
    return;
  } else {
    const findMessage = findUser.userMsgs.find((message) => {
      return message.messageId === messageId;
    });

    if (!findMessage) {
      res.status(404).json({ error: "Message does not exist" });
      return;
    } else {
      const updateTitle = req.body.title;
      const updateMsg = req.body.message;
      findMessage.title = updateTitle;
      findMessage.message = updateMsg;
    }
    res
      .status(200)
      .json({ user: findUser.userName, message: findUser.userMsgs });
  }
});

app.delete("/:userId/:messageId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const messageId = parseInt(req.params.messageId);

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

    if (findMessage < 0) {
      res.status(404).json({ error: "Message does not exist" });
      return;
    } else {
      findUser.userMsgs.splice(findMessage, 1);
    }
    res
      .status(200)
      .json({ user: findUser.userName, message: findUser.userMsgs });
  }
});

app.listen(3000, () => {
  console.log("Connected!");
  console.log("Node API running on port 3000");
});
