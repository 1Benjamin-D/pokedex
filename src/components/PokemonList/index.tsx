'use client';

import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonDetails } from '@/api/fetchAPI';
import { fetchPokemonList, fetchPokemonDetails } from '@/api/fetchAPI';
import { pokemonColors } from '@/components/PokemonColor';

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
                const list = await fetchPokemonList();
                setPokemonList(list);
                const detailsPromises = list.map(pokemon => {
                    if (!pokemonDetails[pokemon.name]) {
                        return fetchPokemonDetails(pokemon.url);
                    }
                    return Promise.resolve(pokemonDetails[pokemon.name]);
                });
                const details = await Promise.all(detailsPromises);
                const pokemonDetailsMap: { [key: string]: PokemonDetails } = {};
                list.forEach((pokemon, index) => {
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

    return (
        <div className='text-center text-white'>
            <h1 className=' font-bold text-4xl animate-[multicolor_5s_linear_infinite]'>Pokemon List</h1>
            <ul className='flex flex-wrap justify-around'>
                {currentPokemonList.map((pokemon, index) => (
                    <li key={index} className='m-12 p-4 border-4 border-white rounded-xl hover:scale-150' style={{ backgroundColor: pokemonColors[pokemonDetails[pokemon.name]?.types.split('/')[0].toLowerCase()] }}>
                        <img
                            src={hoveredImageUrls[pokemon.name] || pokemonDetails[pokemon.name]?.imageUrl}
                            onMouseOver={() => handleMouseOver(pokemon.name, pokemonDetails[pokemon.name]?.imageUrl2)}
                            onMouseLeave={() => handleMouseLeave(pokemon.name)}
                            alt={pokemon.name}
                        />
                        <div className='flex flex-col'>
                            <span className='font-bold'>{pokemon.name}</span>
                            <span className='italic'>{pokemonDetails[pokemon.name]?.types}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1} className=' m-6 bg-gray-500 p-5 cursor-pointer rounded-xl hover:animate-[multicolor_5s_linear_infinite]'>Previous</button>
                <button type="button" onClick={goToNextPage} disabled={indexOfLastItem >= filteredPokemonList.length} className=' m-6 bg-gray-500 p-5 cursor-pointer rounded-xl hover:animate-[multicolor_5s_linear_infinite]'>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;