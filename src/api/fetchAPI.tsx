'use client'
export interface Pokemon {
  imageUrl: string | undefined;
  types: any;
  name: string;
  url: string;
}

export interface PokemonDetails {
  types: string;
  imageUrl: string;
  imageUrl2: string;
}

export interface PokemonTypes {
  types: string[];
}

export const fetchPokemonTypes = async (): Promise<PokemonTypes> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type/");
    if (!response.ok) {
      throw new Error('Error fetching types');
    }
    const data = await response.json();
    const types: string[] = data.results.map((type: any) => type.name);
    return { types: types };
  } catch (error) {
    console.error('Error fetching types:', error);
    return { types: [] };
  }
}



