
const express = require('express');
const cors = require('cors');
const Games = require('./DBs/game-collection');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/user-profile')

const app = express();
app.use(cors());
app.use(express.json());


const port = 5000;

app.get('/', (req, res) => {
    return res.send('Hi');
});

// Game Routes
app.get('/api/games', async (req, res) => {
    try {
        const games = await Games.find();
        console.log(games)
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ message: 'error in data retrieval', error: err });
    }
})

app.get('/api/games/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const game_info = await Games.find((game) => game._id === id);
        res.status(200).json(game_info);
    } catch (err) {
        res.status(500).json({ message: 'Error in retriving data', error: err });
    }
})

// User Routes
app.use('/api/users' , userRoutes); // when registering
app.use('/api/auth' , authRoutes); // when logging in

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})