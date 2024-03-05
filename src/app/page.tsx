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
            <PokemonFilter onTypeChange={handleTypeChange} />
            <PokemonList selectedType={selectedType} />
        </main>
    );
};

export default Home;
