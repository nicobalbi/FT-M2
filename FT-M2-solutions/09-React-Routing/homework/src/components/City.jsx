import React from "react";
//creo el componente funcional City que mostrará los detalles de una ciudad
//recibida por props en la ruta /ciudad/{ciudadId}
export default function City({ city }){
    return(
        <div>
            <h2>{city.name}</h2>
            <div>
                <div>Temperatura: {city.temp}</div>
                <div>Clima: {city.weather}</div>
                <div>Viento: {city.wind}</div>
                <div>Nubosidad: {city.clouds}</div>
            </div>
        </div>
    )
}