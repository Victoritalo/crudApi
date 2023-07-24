import express from "express";
const app = express();
app.use(express.json());

const usersData = [];
let userUniqueId = 0;
let userMsgId = 2345234;

app.post("/signup", (req, res) => {
  const emailExists = usersData.some((user) => {
    return req.body.userEmail === user.userEmail;
  });

  if (emailExists) {
    res.status(400);
    res.send({error: "Email already registered by another user!"});
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
    res.status(200).json(usersData);
  }
});

app.get("/users", (req, res) => {
  res.status(200).json({ UsersList: usersData });
});

app.get("/login", (req, res) => {
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
      Messages: verifyUser.userMsgs,
    });
  } else {
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
      error:
        "User does not exist or has no permission to access this message",
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
    const findMessage = findUser.userMsgs.find((message) => {
      return message.messageId === messageId;
    });

    if (!findMessage) {
      res.status(404).json({ error: "Message does not exist" });
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
