'use client'

// TypeFilter.tsx
import React, { useState, useEffect } from 'react';
import { fetchPokemonTypes } from '@/api/fetchAPI';
import { pokemonColors } from '@/components/PokemonColor';

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
        <div className=' ml-16 mt-4'>
            <label htmlFor="pokemonType" className=' mr-2 font-bold'>Pokemon Type:</label>
            <select name="pokemonType" id="pokemonType" onChange={handleTypeChange} className='text-black text-center rounded-2xl font-semibold italic'>
                <option value="">All</option>
                {pokemonTypes.map(type => (
                    <option key={type} value={type} className={`text-center font-semibold italic`} style={{ backgroundColor: pokemonColors[type.toLowerCase()] }}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default PokemonFilter;

