const express = require('express')
const router = express.Router()

router.get("/",  (request, response) => {
    response.render("index")
})

router.post("/compile", (request, response) => {
    let formData = request.body
    
    console.log(request.body)

    
    response.send(request.body)
})

router.use((request, response, next) => {
    let now = new Date()
    console.log("[" + now.toLocaleString() + "] " + request.method + ": " + request.path);
    next()
})

module.exports = router