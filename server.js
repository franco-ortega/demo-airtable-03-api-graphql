const app = require('./app');
const PORT = process.env.PORT || 4100;

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Now browse to localhost:${PORT}/graphql`);
});
