const request=require('request')

const geocode= (address,callback)=>
{
   const geoURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFydW5hLTEyIiwiYSI6ImNrbWcyNHU5eTFhbHoyd2xqMW8zYTZnb2UifQ.sS8DHWbNn-iGPzfGdZk1ig&limit=1`

 request({url:geoURL,json:true},(error,response)=>
 {
     if(error){
     callback("Unable to connect with geolocation api",undefined)
     }
     else if(response.body.features.length===0)
     {
       callback("Unable to find location!. Try another search..",undefined)
     }
     else{
        //  const latitude=response.body.features[0].center[1]
        //  const longitude=response.body.features[0].center[0]
        //  console.log(latitude,longitude)
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        })
     }
 })
}
module.exports= geocode