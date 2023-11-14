const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
