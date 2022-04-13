
const selection = document.querySelector(".choose-city")

async function listings() {
  const cityRes = await fetch('https://api.openbrewerydb.org/breweries/search?query=texas')
  const cityData = await cityRes.json()
  let newCity = cityData.map(item => item.city).sort()
  let newCityArr = [...new Set(newCity)]
  console.log(cityData)
  for (i = 0; i < newCityArr.length; i++) {
  selection.innerHTML +=  
  `<option class="pick" value="${newCityArr[i]}">${newCityArr[i]}</option>`
  }

}
listings()


selection.addEventListener("change", () => {

async function main() {
  const res = await fetch('https://api.openbrewerydb.org/breweries?by_city=' + selection.value + '&per_page=50')
  const data = await res.json()
  
  
    for (i = 0; i < data.length; i++) {
      console.log(data[i]['city'])
    }
    console.log(selection.value)

  const cl = s => s?s:""
  document.querySelector(".main").innerHTML = data.map(values => 
    `<div class="listing">
        <h1 class="name">${values.name}</h1>
        <h2 class="street"><a class="google-map" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${cl(values.street)},${cl(values.city)},${values.state} ${values.postal_code}">${cl(values.street)}<br>${cl(values.city)}, ${values.state} ${values.postal_code}</a></h2>
        <h2><a class="phone-tag" href="tel:${values.phone}">${cl(values.phone)}</a></h2>
        <h2><a class="website" href="${values.website_url}" target="_blank">${cl(values.website_url)}</a></h2>
    </div>`).join('')
  
}

main()
})

