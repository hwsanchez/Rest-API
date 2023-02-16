const { expressUse, expressApp, listentoPort } = require("./config");
const { connect } = require("./dbConfig");

expressUse();

expressApp.get("/characters", async (req, res) => {
  const connection = await connect();
  const [characters, _] = await connection.query("SELECT * FROM hp_characters");
  res.status(200).json(characters);
});
expressApp.get("/characters/:id", async (req, res) => {
  const connection = await connect();
  const [characters, _] = await connection.execute(
    "SELECT * FROM hp_characters WHERE id = ?",
    [req.params.id]
  );
  if (characters.length) {
    res.status(200).json(characters);
    return;
  }
  res.status(404).send(`Character with id ${req.params.id} does not exist!`);
});
expressApp.delete("/characters/:id", async (req, res) => {
  const connection = await connect();
  const [characters, _] = await connection.execute(
    "DELETE FROM hp_characters WHERE id = ?",
    [req.params.id]
  );
  res.status(200).json(characters);
});

expressApp.patch("/characters/:id", async (req, res) => {
  var { name, house, actor } = req.body;
  var update = { name, house, actor };
  update = Object.fromEntries(
    Object.entries(update).filter(([key, value]) => value !== undefined)
  );
  const connection = await connect();
  const [results, _] = await connection.execute("Select * From hp_characters");
  console.log([update, req.params.id]);
  res.status(200).json(results);
});

listentoPort();
