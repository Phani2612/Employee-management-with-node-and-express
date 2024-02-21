const Express = require("express")

const app = Express()

const FileSystem = require("fs")

app.use("/images",Express.static('images'))

app.set("view engine", "ejs")

app.use(Express.urlencoded())

const Multer = require("multer")

app.get('/', function(req,res)
{
    res.sendFile(__dirname+"/home.html")
})

app.get('/add', function(req,res)
{
    res.sendFile(__dirname+"/practice.html")
})

const details = Multer.diskStorage({

    destination :function(req,file,info)
    {
          info(null,"images/")
    },
    filename : function(req,file,info)
    {
          info(null,file.originalname)
    }
})

let upload = Multer({
    
    storage :details
})


app.post('/add',upload.single("profile"),function(req,res)
{
     let empdata = req.body

     empdata.info = req.file.path

     let empJsondata = JSON.parse(FileSystem.readFileSync("practice.json","utf-8"))

     empJsondata.push(req.body)

     
     
     let empjavascripttoJson = JSON.stringify(empJsondata)
     

     FileSystem.writeFile("practice.json", empjavascripttoJson , function(error)
     {
        if(error)
        {
            console.log("Error occured")
        }
        else{

            console.log("Data added succesfully")
        }
     })

     res.redirect('/')

})




app.get('/view', function(req,res)
{
    let readempdata = FileSystem.readFileSync("practice.json","utf-8")

    let Javascriptdata = JSON.parse(readempdata)

    console.log(Javascriptdata)
    
    if(req.query.sort != undefined)
    {
        
        Javascriptdata.sort(function(a,b)
        {
            
              if(a.name < b.name)
              {
                return -1
              }

              else{

                return 1
              }

            
        })
    }

     res.render("Viewdetails.ejs",{data : Javascriptdata})
})

app.get('/employees/:empid',function(req,res)
{
    const id = req.params.empid

    const readJsondata = FileSystem.readFileSync("practice.json","utf-8")

    

    const JsontoJS = JSON.parse(readJsondata)
    

    JsontoJS.map(function(i)
    {
        
        if(i.empid === id)
        {
            
            res.render("displayemployee.ejs",{emp : i})
           
        }

    })

  
    res.render("404error.ejs")
})

app.listen(8000)