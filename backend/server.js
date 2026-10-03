const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json())

const foods = [
    {id: 1, name: "Chai", price: 15},
    {id: 2, name: "Vadapav", price: 20},
    {id: 3, name: "Pohe", price: 25}

]

const drinks = [
    { id: 1, name: "Cutting Chai", price: 15 },
    { id: 2, name: "Cold Coffee", price: 40 },
    { id: 3, name: "Lemon Ice Tea", price: 30 }
];

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



app.get("/api/drinks", (req, res) => {
    res.json(drinks);
});

app.post("/api/drinks", (req, res) => {
    const { name, price } = req.body;

    if (
        typeof name === "string" &&
        typeof price === "number" &&
        price > 0
    ) {
        const drink = {
            id: drinks.length + 1,
            name: name,
            price: price
        };

        drinks.push(drink);

        res.status(201).json(drink);
    } else {
        res.status(400).json({
            message: "Invalid data"
        });
    }
});


app.put("/api/drinks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    const drink = drinks.find(item => item.id === id);

    if (!drink) {
        return res.status(404).json({
            message: "Drink not found"
        });
    }

    drink.name = name;
    drink.price = price;

    res.json(drink);
});


app.patch("/api/drinks/:id", (req, res) => {
    const id = Number(req.params.id);

    const drink = drinks.find(item => item.id === id);

    if (!drink) {
        return res.status(404).json({
            message: "Drink not found"
        });
    }

    if (req.body.name) {
        drink.name = req.body.name;
    }

    if (req.body.price) {
        drink.price = req.body.price;
    }

    res.json(drink);
});


app.delete("/api/drinks/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = drinks.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Drink not found"
        });
    }

    const deletedDrink = drinks.splice(index, 1);

    res.json({
        message: "Drink deleted",
        drink: deletedDrink[0]
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});