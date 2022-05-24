const selection = document.querySelector(".choose-city")

async function getCities() {
  let page = 0
  let cities = new Set()
  do {
      const response = await fetch('https://api.openbrewerydb.org/breweries?by_state=texas&sort=city:asc&page=' + page++ + '&per_page=50')
      const data = await response.json()
      

      if (data.length === 0) break

      

        for (const item of data) {
          cities.add(item.city)
        }
        
      
      } while (true)
      return [...cities].sort()
      
      
}



async function postCities() {
  for (const city of await getCities()) {
    selection.innerHTML += `<option class="pick" value="${city}">${city}</option>`
  }
}

postCities()








selection.addEventListener("change", () => {

async function main() {
  const res = await fetch('https://api.openbrewerydb.org/breweries?by_city=' + selection.value + '&per_page=50')
  const data = await res.json()
  
  const x = []
  console.log(x)
  
  for (i = 0; i < data.length; i++) {
    let stateData = data[i]['state']
    if(stateData === "Texas") {
      x.push(data[i])
    }
  }

  
  const cl = s => s?s:""
  document.querySelector(".main").innerHTML = x.map(values => 
    
    `<div class="listing">
        <h1 class="name">${values.name}</h1>
        <h2 class="street"><a class="google-map" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${cl(values.street)},${cl(values.city)},${values.state} ${values.postal_code}">${cl(values.street)}<br>${cl(values.city)}, ${values.state} ${values.postal_code}</a></h2>
        <h2><a class="phone-tag" href="tel:${values.phone}">${cl(values.phone)}</a></h2>
        <h2><a class="website" href="${values.website_url}" target="_blank">${cl(values.website_url)}</a></h2>
    </div>`).join('')
    
}

main()
})

