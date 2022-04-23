import React, { useState } from "react";

export default function SearchBar({onSearch}) {
  //defino estado local para ir guardando lo que escriba el 
  //usuario en la barra de búsqueda
  const [city, setCity] = useState("");
  //defino una función que afectará a mi estado
  //para pasarle el onChange del input
  const handleInputChange = (e) => {
    e.preventDefault();
    setCity(e.target.value)
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      //cuando haga el submit ejecutaré la función onSearch 
      //con mi estado city es decir, lo que sea que haya escrito
      //el usuario.
      onSearch(city);
    }}>
      <input
        type="text"
        placeholder="Ciudad..."
        onChange={(e)=>handleInputChange(e)}
      />
      <input type="submit" value="Agregar" />
    </form>
  );
}
