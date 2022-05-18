const db = require("../db");

class MessageController {
  async getMessage(req, res) {
    const messages = await db.query("SELECT * FROM messages");
    res.send(messages.rows);
  }

  async createMessage(req, res) {
    const { user_id, message } = req.body;

    await db.query(
      "INSERT INTO messages (message, user_id) VALUES ($1, $2) RETURNING *",
      [message, user_id]
    );
    res.send();
  }
}

module.exports = new MessageController();
