import { useState } from "react";

function PetCard({ name, breed, age }) {
const [isFavorite, setIsFavorite] = useState(false);

function handleFavorite() {
setIsFavorite(!isFavorite);
}

return ( <div className="pet-card"> <h2>{name}</h2>


  <p>Breed: {breed}</p>

  <p>Age: {age} years old</p>

  <button onClick={handleFavorite}>
    {isFavorite ? "❤️ Favorite" : "🤍 Add to Favorite"}
  </button>
</div>


);
}

export default PetCard;
