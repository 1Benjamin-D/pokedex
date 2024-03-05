'use client'

import React, { useState } from 'react';
import PokemonList from '@/components/PokemonList';
import PokemonFilter from '@/components/TypeFilter';

const Home: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleTypeChange = (selectedType: string | null) => {
        setSelectedType(selectedType);
    };

    return (
        <main className="">
            <h1 className=' font-bold text-4xl animate-[multicolor_5s_linear_infinite] text-center mt-5'>Pokemon List</h1>
            <PokemonFilter onTypeChange={handleTypeChange} />
            <PokemonList selectedType={selectedType} />
        </main>
    );
};

export default Home;
