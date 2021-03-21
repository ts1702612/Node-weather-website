const express= require('express')
const path= require('path')
const hbs=require('hbs')
const geocode= require('./utils/geolocation')
const forecast=require('./utils/forecast')

//define path for express config
const indexPath= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//starting express  instance
const app= express()

hbs.registerPartials(partialsPath)

//setup handllebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//set up static directory to serve 
app.use(express.static(indexPath))


app.get('',(req,res)=>
{
    res.render('index',
    {
        title: "Weather App",
        footer_text:"Taruna Agrawal"
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title: "About",
       
        footer_text:"Taruna Agrawal"
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        title: "Help",
       
        footer_text:"Taruna Agrawal"
    })
})

app.get('/weather', (req,res)=>
{ 
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
      if(error){
          return res.send({
              error:error
          })
      }
     
          forecast(latitude,longitude,(error,forecastData)=>
          {
              if(error){
                 return res.send({
                      error:error
                  })
              }
              res.send({
                 forecast: `${forecastData.description}. It is currently ${forecastData.temp} degrees out.`,
                  location,
                  address: req.query.address
              })
          })
      
    })


})

app.get('/help/*',(req,res)=>
{
  res.render('404page',{
      title:'404',
      msg:'Help article not found',
      footer_text:"Taruna Agrawal"
     
  })
})

app.get('*',(req,res)=>
{
  res.render('404page',{
      title:'404',
      msg:'page not found',
      footer_text:"Taruna Agrawal"
     
  })
})

const PORT= 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})