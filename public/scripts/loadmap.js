console.log('Hello world!')
const txtDisplay=document.querySelector('#res1')
console.log(txtDisplay)
const getEntries= ()=>{
    fetch('/entry').then((response) =>{
        response.json().then((data)=>{
            console.log(data)
            if (data.error)
                txtDisplay.innerHTML='<p>Could not fetch data</p>'
            else{
                console.log('Success: Now loading data');
                for (let i=0;i<data.length;i++){
                    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        '<p>'+data[i].title +'</p>'+
                        '<p>'+data[i].description+'</p>'+
                        '<img src='+data[i].image+' width=200px>'
                    );
    
                    var marker = new mapboxgl.Marker()
                    .setLngLat([data[i].longitude, data[i].latitude])
                    .setPopup(popup)
                    .addTo(map);
                }
                
            }
                
        })
    })
    
    
}
getEntries()
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpc2hlazMyIiwiYSI6ImNrYTZjNG11MDA1aDkyeHMwNzdvbGlvMmsifQ.qZIqdzcHXLXdUxLlR5rPfw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-98.5795, 39.8283],
zoom: 4
});

const inputForm =document.querySelector('form')

inputForm.addEventListener('submit',(e)=>{
    console.log('here')
    e.preventDefault()
    console.log('here2')
    const title = document.querySelector('#txtTitle');
    const des = document.querySelector('#txtDes');
    const rating = document.querySelector('#sldRating');
    const addr = document.querySelector('#txtAddress');
    const image = document.querySelector('#txtUrl');
    let lon=0
    let lat=0
    const getCo =fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+addr.value+'.json?access_token=pk.eyJ1IjoiYXZpc2hlazMyIiwiYSI6ImNrYTZjNG11MDA1aDkyeHMwNzdvbGlvMmsifQ.qZIqdzcHXLXdUxLlR5rPfw').then((response) =>{
        response.json().then((data)=>{
            lon=data.features[0].center[0]
            lat=data.features[0].center[1]
            console.log(lat,lon)
            request_object={
                "title": title.value,
                "description": des.value,
                "image": image.value,
                "rating": rating.value,
                "latitude": lat, 
                "longitude":  lon,
                "dateVisited": "2020-07-20T07:41:34.765Z"
            }
            fetch('http://localhost:3000/entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_object),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    getEntries()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
    
        })

})
 
