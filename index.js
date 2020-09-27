const app = require("./app");
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("Servidor corriendo en el puerto", PORT);
});
