const express = require('express')
const cors = require('cors')
const weSkiRoutes = require('./api')
const app = express()
const port = 5000

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors()); // For Apply Post/Get from UI
app.use("/api/v1/", weSkiRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})