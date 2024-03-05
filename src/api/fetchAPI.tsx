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

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching Pokemon details');
    }
    const data = await response.json();
    const types = data.types.map((type: any) => type.type.name).join('/');
    const imageUrl = data.sprites.front_default;
    const imageUrl2 = data.sprites.front_shiny;
    return { types, imageUrl, imageUrl2 };
  } catch (error) {
    console.error('Error:', error);
    return { types: '', imageUrl: '', imageUrl2: '' };
  }
};

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



