const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const {PORT, CONNECTION_STRING} = require('./configs/config')
const userRouter = require('./routes/userRouter')
app.use(cors())
app.use('/api', userRouter)


const main = async() => {
    await mongoose.connect(CONNECTION_STRING)
    console.log('Connection established');
    app.listen(PORT, () => {
        console.log('Server is launched on port ' + PORT);
    })
}

main()

process.on('SIGINT', async() => {
    await mongoose.disconnect()
    process.exit()
})