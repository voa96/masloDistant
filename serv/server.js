const express = require('express');
const cors = require('cors');
const PORT = 3000
const sequelize = require('./config/db')
const router = require('./routers/undex')
const app = express();




app.use(express.json());
app.use(cors());
app.use('/api', router)


async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`http://localhost:3000/api`);
        })
        
    } catch (error) {
        console.log("err:" + error);
    }
}
start()