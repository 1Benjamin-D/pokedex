'use client'

import React, { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '@/api/fetchAPI';

interface TypeFilterProps {
    onTypeChange: (selectedType: string | null) => void;
}

const PokemonFilter: React.FC<TypeFilterProps> = ({ onTypeChange }) => {
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const { types } = await fetchPokemonTypes();
                setPokemonTypes(types);
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchTypes();
    }, []);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        onTypeChange(selectedType === "" ? null : selectedType);
    };

    return (
        <div className=' ml-16 mt-2'>
            <label htmlFor="pokemonType" className=' mr-2'>Type de Pokémon:</label>
            <select name="pokemonType" id="pokemonType" onChange={handleTypeChange} className='text-black text-center'>
                <option value="">All</option>
                {pokemonTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default PokemonFilter;
