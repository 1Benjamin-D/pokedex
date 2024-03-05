'use client';

// PokemonList.tsx
import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonDetails } from '@/api/fetchAPI';
import { pokemonColors } from '@/components/PokemonColor';
import Link from 'next/link';

interface PokemonListProps {
    selectedType: string | null;
}

const PokemonList: React.FC<PokemonListProps> = ({ selectedType }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetails }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setPokemonList(data.results);

                const detailsPromises = data.results.map(async (pokemon: Pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    if (!pokemonResponse.ok) {
                        throw new Error(`Error fetching details for ${pokemon.name}`);
                    }
                    const pokemonData = await pokemonResponse.json();
                    const types = pokemonData.types.map((type: any) => type.type.name).join('/');
                    const imageUrl = pokemonData.sprites.front_default;
                    const imageUrl2 = pokemonData.sprites.front_shiny;
                    return { types, imageUrl, imageUrl2 };
                });

                const details = await Promise.all(detailsPromises);
                const pokemonDetailsMap: { [key: string]: PokemonDetails } = {};
                data.results.forEach((pokemon: Pokemon, index: number) => {
                    pokemonDetailsMap[pokemon.name] = details[index];
                });
                setPokemonDetails(pokemonDetailsMap);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, selectedType]);

    const [hoveredImageUrls, setHoveredImageUrls] = useState<{ [key: string]: string | null }>({});

    const handleMouseOver = (pokemonName: string, imageUrl2: string) => {
        setHoveredImageUrls(prevState => ({
            ...prevState,
            [pokemonName]: imageUrl2
        }));
    };

    const handleMouseLeave = (pokemonName: string) => {
        setHoveredImageUrls(prevState => ({
            ...prevState,
            [pokemonName]: null
        }));
    };

    const filteredPokemonList = selectedType ?
        pokemonList.filter(pokemon => pokemonDetails[pokemon.name]?.types.includes(selectedType)) :
        pokemonList;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPokemonList = filteredPokemonList.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    if (loading) {
        return <p className=" mt-5 text-center">Chargement...</p>;
    }

    if (currentPokemonList.length === 0) {
        return <p className="mt-5 text-center">Il n'y a pas de Pokémon dans cette catégorie.</p>;
    }

    return (
        <div className='text-center text-white'>
            <ul className='flex flex-wrap gap-12 m-12 justify-around'>
                {currentPokemonList.map((pokemon, index) => {
                    const imageUrl = pokemonDetails[pokemon.name]?.imageUrl;
                    if (!imageUrl) {
                        return null;
                    }

                    return (
                        <Link href={`/Pokemon/${pokemon.name}`}>
                            <li key={index} className='flex flex-col items-center p-8 border-4 border-white rounded-xl hover:scale-150' style={{ backgroundColor: pokemonColors[pokemonDetails[pokemon.name]?.types.split('/')[0].toLowerCase()] }}>
                                <img
                                    src={hoveredImageUrls[pokemon.name] || imageUrl}
                                    onMouseOver={() => handleMouseOver(pokemon.name, pokemonDetails[pokemon.name]?.imageUrl2)}
                                    onMouseLeave={() => handleMouseLeave(pokemon.name)}
                                    alt={pokemon.name}
                                />
                                <div className='flex flex-col'>
                                    <span className='font-bold'>{pokemon.name}</span>
                                    <span className='italic'>{pokemonDetails[pokemon.name]?.types}</span>
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>

            <div className=''>
                <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1} className=' m-6 bg-gray-500 p-5 cursor-pointer rounded-xl hover:animate-[multicolor_5s_linear_infinite]'>Previous</button>
                <button type="button" onClick={goToNextPage} disabled={indexOfLastItem >= filteredPokemonList.length} className=' m-6 bg-gray-500 p-5 cursor-pointer rounded-xl hover:animate-[multicolor_5s_linear_infinite]'>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;
