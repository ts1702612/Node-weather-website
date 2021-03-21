console.log('text written on console')




const weatherForm=document.querySelector('form')
const search= document.querySelector('input')


const p1=document.querySelector('#message-1')
const p2=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()
   const address= search.value

    p1.textContent="Loading..."
    p2.textContent=""

   fetch(`/weather?address=${address}`).then((response)=>
{
    response.json().then((data)=>
    {
        if(data.error){
        p1.textContent=data.error
        }
        
      else{
           p1.textContent=data.location
           p2.textContent=data.forecast
        }
    })
})
  
})