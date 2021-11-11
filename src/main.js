// GET v1/store/9533/reservations
// Host http://3.35.25.199
// content-type application/json

async function fetchData(){
    try{
        const response = await fetch('http://3.35.25.199/v1/store/9533/reservations',  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : '*'
            }
            });
        console.log(response)
    }catch(error){
        console.error(error)
    }
  
}

fetchData()