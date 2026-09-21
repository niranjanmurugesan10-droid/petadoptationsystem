import { createContext, useContext, useState } from "react";

const PetContext = createContext();

function PetProvider({ children }) {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      gender: "Male",
      description: "Friendly and playful dog",
      ownerId: "demo-owner-1"
    },
    {
      id: 2,
      name: "Luna",
      breed: "Labrador",
      age: 2,
      gender: "Female",
      description: "Very calm and loving dog",
      ownerId: "demo-owner-2"
    }
  ]);

  function addPet(petData) {
    const newPet = {
      id: Date.now(),
      ...petData
    };

    setPets((previousPets) => [
      ...previousPets,
      newPet
    ]);
  }

  function deletePet(id) {
    setPets((previousPets) =>
      previousPets.filter(
        (pet) => pet.id !== id
      )
    );
  }

  function updatePet(updatedPet) {
    setPets((previousPets) =>
      previousPets.map((pet) =>
        pet.id === updatedPet.id
          ? updatedPet
          : pet
      )
    );
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        addPet,
        deletePet,
        updatePet
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePets() {
  return useContext(PetContext);
}

export default PetProvider;