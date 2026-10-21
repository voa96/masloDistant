const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const data = [
    { id: 1, name: 'Иван', city: 'Москва' },
    { id: 2, name: 'Тимофей', city: 'Москва' },
    { id: 3, name: 'Владимир', city: 'Москва' },
]
let nextId = 4;

app.get('/people', (req, res) => {
    return res.send(data);
})

app.post('/people', (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) {
        throw new Error('Не указаны имя или город')
    }
    const newObj = {
        id: nextId++,
        name: name,
        city: city,
    }
    data.push(newObj);
    console.log(`Новый объект добавлен`);
    return res.status(200).json({ message: 'Created' })
})

app.listen(3000, () => {
    console.log(`http://localhost:3000/people`);
})