async function getCountries(){
  fetch("https://restcountries.com/v3/all")
  .then(function(data){
    return data.json()
  })
  .then(function(jsondata){
    jsondata.forEach(element => {
      var name = element.name.common
      var picurl = element.flags[1]
      var capital = element.capital
      var region = element.region
      var latlng = element.latlng
      var code = element.cca2
      
      show(name, picurl, capital, region, latlng, code)
    });
  })
  .catch(function(err){
    console.log(err)
  })
}

getCountries()

function show(name, picurl, capital, region, latlng, code){
  var card = document.createElement("div")
  card.className = "row col-lg-4 col-sm-12 card"

  var cardHead = document.createElement("div")
  cardHead.className = "card-header"
  cardHead.innerText = name;

  var cardBody = document.createElement("div")
  cardBody.className = "card-body"

  var flag = document.createElement("img")
  flag.className = "flag-class"
  flag.src = picurl

  var info = document.createElement("div")
  info.className = "info-class"
  info.innerHTML = "<p>Capital: "+capital+"<br>Region: "+region+"<br>LatLng: "+latlng+"<br>Country Code: "+code+"</p>"

  var btn = document.createElement("button")
  btn.className = "btn btn-primary"
  btn.innerText = "Click for Weather"
  btn.onclick = function(){display(name, latlng[0], latlng[1])};

  cardBody.appendChild(flag)
  cardBody.appendChild(info)
  cardBody.appendChild(btn)
  card.appendChild(cardHead)
  card.appendChild(cardBody)
  document.body.appendChild(card)
}

function display(name, lat, lon){
  fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=071ea33c5ae74a71414fc56039a1fac6")
  .then(function(res){
    return res.json()
  })
  .then(function(status){
    alert(name+"\nTemperature: "+status.main.temp+"\nClick 'OK' to close")
  })
  .catch(function(err){
    console.log(err)
  })
}