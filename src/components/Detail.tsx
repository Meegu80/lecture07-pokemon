import { useEffect, useState } from "react";
import { useParams } from "react-router";

type PokemonDetail = {
    name: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
            'official-artwork': {
                front_default: string;
            };
        };
    };
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
};

function Detail() {
    const [loading, setLoading] = useState<boolean>(true);
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
            .then((data: PokemonDetail) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching pokemon:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pokemon) {
        return <div>Not Found</div>;
    }

    return (
        <div>
            <h1>Pokemon Detail: {pokemon.name}</h1>

            <div>
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                />
            </div>

            <div>
                <h2>Types</h2>
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Abilities</h2>
                <ul>
                    {pokemon.abilities.map((item, index) => (
                        <li key={index}>{item.ability.name}</li>
                    ))}
                </ul>
            </div>

            <div>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
            </div>
        </div>
    );
}

export default Detail;