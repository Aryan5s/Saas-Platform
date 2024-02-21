const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const {sequelize}= require('./config/db')
const userRoutes = require('./routers/userRoutes');
const communityRoutes = require('./routers/communityRoutes')
const roleRoutes = require('./routers/roleRoutes')
const memberRoutes = require('./routers/memberRoutes');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/' , (req , res) => res.json({
    'status' : true,
    'message' : "dummy Route"
}))

app.use('/v1/auth' , userRoutes)
app.use('/v1' , communityRoutes);
app.use('/v1' , roleRoutes)
app.use('/v1' , memberRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Database connected successfully');
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

startServer();