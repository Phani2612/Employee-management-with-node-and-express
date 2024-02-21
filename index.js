const Express = require("express")

const app = Express()

app.use(Express.urlencoded())

app.get("/login", function(req, res)
{
    //Write the logic to give the response as the login page

    // in express, we have a variable __dirname --> automatically store the path of the project
    res.sendFile("C:/Users/HI/Desktop/Node server/index.html")
})

// ejs --> react

app.post("/login", function(req, res)
{
    // Logic to extract the username and password
    let enteredUsername = req.body.username
    let enteredPassword = req.body.password
    
    res.send(`<h3>Welcome ${enteredUsername}.You have successfully logged in!</h3>`)

    
})



app.listen(9000)