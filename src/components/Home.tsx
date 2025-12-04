import { useEffect, useState } from "react";
import { Link } from "react-router";

export type Pokemon = {
    name: string;
    url: string;
};

type PokemonApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then(res => res.json())
            .then((data: PokemonApiResponse) => {
                setList(data.results);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Pokemon List</h1>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {list.map((item, index) => {
                            const pokemonId = item.url.split('/').filter(Boolean).pop();
                            return (
                                <li key={index}>
                                    <Link to={`/detail/${pokemonId}`}>
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                                            alt={item.name}
                                        />
                                        <p>{item.name}</p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;