import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

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

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
`;

const Title = styled.h2`
    margin: 0 0 32px 0;
    font-size: 35px;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 18px;
    color: #7f8c8d;
`;

const PokemonGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const PokemonCard = styled.li`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    overflow: hidden;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
`;

const PokemonLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-decoration: none;
    color: inherit;
`;

const PokemonImage = styled.img`
    width: 96px;
    height: 96px;
    object-fit: contain;
`;

const PokemonName = styled.p`
    margin: 12px 0 0 0;
    font-size: 16px;
    font-weight: 500;
    color: #2c3e50;
    text-transform: capitalize;
    text-align: center;
`;

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
        <Container>
            <Title>Pokemon List</Title>
            {loading ? (
                <LoadingWrapper>Loading...</LoadingWrapper>
            ) : (
                <PokemonGrid>
                    {list.map((item, index) => {
                        // 포켓몬 번호는 순서대로 1번부터 시작
                        const pokemonNumber = index + 1;

                        return (
                            <PokemonCard key={index}>
                                <PokemonLink to={`/detail/${pokemonNumber}`}>
                                    <PokemonImage
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`}
                                        alt={item.name}
                                    />
                                    <PokemonName>{item.name}</PokemonName>
                                </PokemonLink>
                            </PokemonCard>
                        );
                    })}
                </PokemonGrid>
            )}
        </Container>
    );
}

export default Home;