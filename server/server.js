const express = require('express');
const path = require('path');
const app = express()
const cors = require('cors');
const helmet = require("helmet");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", "https://hpc-web-82ffa098f14a.herokuapp.com/"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'"]
        }
    }
}));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
