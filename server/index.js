const express = require('express');
const { getAll, createData } = require('./service/service.js');
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

app.get('/', (req, res) => {
    try {
        const data = getAll();
        res.send(data);
    }
    catch (err) {
        res.send(err.message);
    }
});


app.post('/', (req, res) => {
    try {
        const dataFromClient = req.body;
        const data = createData(dataFromClient);
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
});
