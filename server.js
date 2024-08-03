const app = require('./app');

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}!`);
});
