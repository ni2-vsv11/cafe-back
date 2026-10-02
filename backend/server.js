const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json())

const foods = [
    {id: 1, name: "Chai", price: 15},
    {id: 2, name: "Vadapav", price: 20},
    {id: 3, name: "Pohe", price: 25}

]

app.get('/', (req, res) => {
    res.send("Welcome to College Cafe");
});

app.get('/api/foods', (req, res) => {
    res.json(foods)
})

app.get('/api/foods/:id', (req, res) =>{
    const food = foods.find( 
        item => item.id === Number(req.params.id)
    );
    if(!food) {
        return res.status(404).json({
            message: "Food not found"
        });
    }
    res.json(food);
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});