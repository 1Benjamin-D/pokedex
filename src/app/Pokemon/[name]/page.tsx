'use client'
import { pokemonColors } from '@/components/PokemonColor';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';

interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    evasion: number;
}

interface PokemonAbility {
    name: string;
    effect: string;
}

const PokemonDetailsPage: React.FC = () => {
    const [pokemonName, setPokemonName] = useState<string | null>(null);
    const [pokeStats, setPokeStats] = useState<PokemonStats | null>(null);
    const [pokeAbilities, setPokeAbilities] = useState<PokemonAbility[]>([]);
    const [pokeType, setPokeType] = useState<string>('');
    const [pokeImage, setPokeImage] = useState<string>('');
    const [pokeDesc, setPokeDesc] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const name = window.location.pathname.split('/').pop();
            if (name) {
                setPokemonName(name);
            }
        }
    }, []);

    useEffect(() => {
        if (pokemonName) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                    if (!response.ok) {
                        throw new Error('Error fetching Pokemon details');
                    }
                    const data = await response.json()

                    const stats: PokemonStats = {
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        evasion: data.stats[3].base_stat
                    };
                    setPokeStats(stats);

                    const abilityURLs = data.abilities.map((ability: any) => ability.ability.url);
                    const abilitiesData = await Promise.all(abilityURLs.map((url: string | URL | Request) => fetch(url).then(response => response.json())));
                    const abilities: PokemonAbility[] = abilitiesData.map((abilityData: any) => ({
                        name: abilityData.name,
                        effect: abilityData.effect_entries.find((entry: any) => entry.language.name === 'en')?.effect || 'No effect available in English'
                    }));
                    setPokeAbilities(abilities);

                    const typeURLs = data.types.map((type: any) => type.type.url);
                    const typeData = await Promise.all(typeURLs.map((url: string | URL | Request) => fetch(url).then(response => response.json())));
                    const types: string[] = typeData.map((typeData: any) => typeData.name);
                    setPokeType(types.join(', '));

                    const speciesResponse = await fetch(data.species.url);
                    const speciesData = await speciesResponse.json();
                    const descriptionEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
                    setPokeDesc(descriptionEntry ? descriptionEntry.flavor_text : 'No description available');

                    setPokeImage(data.sprites.other["official-artwork"].front_default);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [pokemonName]);

    if (!pokeStats || !pokeAbilities || !pokeType || !pokeImage || !pokeDesc || isLoading) return <Spinner />

    return (
        <div className=' border-2 flex flex-col items-center w-1/2 p-10 ml-[25%] mt-[2%] mb-[2%]' style={{ borderColor: pokemonColors[pokeType.split(',')[0].toLowerCase()] }}>
            <h1>{pokemonName}</h1>
            <img src={pokeImage} alt={pokemonName || 'pas de nom'} className='' height="200px" width="200px" />
            <div>
                <p className=' font-semibold' style={{ color: pokemonColors[pokeType.split(',')[0].toLowerCase()] }}>{pokeType}</p>
            </div>
            <div className=' mt-5'>
                <p>{pokeDesc}</p>
            </div>
            <div className=' mt-5'>
                {pokeAbilities.map((ability, index) => (
                    <div key={index}>
                        <p className=' font-semibold' style={{ color: pokemonColors[pokeType.split(',')[0].toLowerCase()] }}>{ability.name}: </p>
                        <p className=' font-semibold'>{ability.effect}</p>
                    </div>
                ))}
            </div>
            <div className=' mt-5'>
                <p>HP: {pokeStats.hp}</p>
                <p>Attack: {pokeStats.attack}</p>
                <p>Defense: {pokeStats.defense}</p>
                <p>Evasion: {pokeStats.evasion}</p>
            </div>
        </div>
    );
};

export default PokemonDetailsPage;