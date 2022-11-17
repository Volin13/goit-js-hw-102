
const Base_URL = "https://restcountries.com/v3.1/name"

export default function fetchCountries(name){
    return fetch(`${Base_URL}/${name}`)
    .then(response =>{
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json()
    })
}
export {fetchCountries};