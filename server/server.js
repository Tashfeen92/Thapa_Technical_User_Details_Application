const express = require('express');
const dotenv = require('dotenv'); // Hiding DataBase & Port Detail Using Config.env
const app = express();

dotenv.config({ path: './config/config.env' }); // No Need to re-Write again in other Files
const PORT = process.env.PORT;
const connection = require('./db/connection.js');
app.use(express.json()); // Use this middleware to convert data from json to object format Since our application does not understand json.

app.use(require('./router/router.js')); // Separate Router File

app.listen(PORT, () => {
    console.log(`Serving Connected at Port # ${PORT}`);
})

// Hosting Step 3 - Heroku Hosting - Paste Above app.listen
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('client/build'));
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
//     })
// }

// "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
