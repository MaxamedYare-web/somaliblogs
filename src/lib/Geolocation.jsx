// import { useEffect } from "react"
// import { useAuth } from "./BlogContext"


// export const GeolocationApi = () => {
//  const getApiLocation =import.meta.env.VITE_API_GEOLOCATION
//  const {setGeoLocationData} = useAuth()
//  useEffect(async()=>{
// try {
    
// const responsive  = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${getApiLocation}`)
// const data = await responsive.json()
//     setGeoLocationData(data)
// } catch (error) {
//     console.log(error)
// }
//  },[])


// }

// GeolocationApi()