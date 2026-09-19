import PetCard from "../components/PetCard";

function Pets() {

const pets = [
{
id: 1,
name: "Max",
breed: "Golden Retriever",
age: 3
},
{
id: 2,
name: "Bella",
breed: "German Shepherd",
age: 2
},
{
id: 3,
name: "Luna",
breed: "Labrador",
age: 4
}
];

return (
<div className="page">
<h1>Available Pets 🐾</h1>


  {pets.map((pet) => (
    <PetCard
      key={pet.id}
      name={pet.name}
      breed={pet.breed}
      age={pet.age}
    />
  ))}
</div>


);
}

export default Pets;
