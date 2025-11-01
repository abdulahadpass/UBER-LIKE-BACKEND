import dotenv from 'dotenv'
import { connectDb } from './db/db.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`)
        })
        app.on('error', (err) => {
            console.log('Error in running the server', err)
        })
    })
    .catch((err) => {
        console.log('Error in connecting Db', err);


    })