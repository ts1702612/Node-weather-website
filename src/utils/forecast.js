const request=require('request')

const forecast= (latitude,longitude,callback)=>
{
   const url=`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=02523142592cbac37809d6cbb0e3ef0a&units=metric`

 request({url,json:true},(error,response)=>
 {
     if(error){
     callback(error,undefined)
     }
     else if(response.body.message)
     {
       callback("Unable to find weather information!. Try another search..",undefined)
     }
     else{
        callback(undefined,{
            temp:response.body.current.temp,
            description:response.body.current.weather[0].description,
        })
     }
 })
}
module.exports= forecast