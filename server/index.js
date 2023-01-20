const express = require('express')
const app = express();

require('./db/conn')

app.listen(2020, ()=>{
    console.log(`http://localhost:2020`)
})