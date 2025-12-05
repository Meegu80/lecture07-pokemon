import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 24px;
`;

const BackButton = styled(Link)`
    display: inline-block;
    margin-bottom: 24px;
    padding: 10px 20px;
    background: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background 0.2s;

    &:hover {
        background: #2980b9;
    }
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 18px;
    color: #7f8c8d;
`;

const Card = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
`;

const PokemonName = styled.h1`
    margin: 0 0 32px 0;
    font-size: 42px;
    font-weight: 700;
    color: #2c3e50;
    text-transform: capitalize;
`;

const ImageWrapper = styled.div`
    margin-bottom: 32px;
`;

const PokemonImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 32px;
`;

const InfoBox = styled.div`
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
`;

const InfoLabel = styled.p`
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #7f8c8d;
    font-weight: 500;
`;

const InfoValue = styled.p`
    margin: 0;
    font-size: 24px;
    color: #2c3e50;
    font-weight: 600;
`;

const TypesWrapper = styled.div`
    margin-top: 24px;
`;

const TypesLabel = styled.p`
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #7f8c8d;
    font-weight: 500;
`;

const TypesList = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
`;

const TypeBadge = styled.span`
    padding: 8px 20px;
    background: #3498db;
    color: white;
    border-radius: 20px;
    font-weight: 500;
    text-transform: capitalize;
`;

const AbilitiesWrapper = styled.div`
    margin-top: 24px;
`;

const AbilitiesLabel = styled.p`
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #7f8c8d;
    font-weight: 500;
`;

const AbilitiesList = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
`;

const AbilityBadge = styled.span`
    padding: 8px 20px;
    background: #2ecc71;
    color: white;
    border-radius: 20px;
    font-weight: 500;
    text-transform: capitalize;
`;

function Detail() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // 포켓몬 상세 정보 가져오기
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("에러 발생:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container>
                <LoadingWrapper>Loading...</LoadingWrapper>
            </Container>
        );
    }

    if (!pokemon) {
        return (
            <Container>
                <LoadingWrapper>포켓몬을 찾을 수 없습니다</LoadingWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <BackButton to="/">← 목록으로 돌아가기</BackButton>

            <Card>
                <PokemonName>{pokemon.name}</PokemonName>

                <ImageWrapper>
                    <PokemonImage
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                    />
                </ImageWrapper>

                <InfoGrid>
                    <InfoBox>
                        <InfoLabel>키</InfoLabel>
                        <InfoValue>{pokemon.height / 10}m</InfoValue>
                    </InfoBox>
                    <InfoBox>
                        <InfoLabel>몸무게</InfoLabel>
                        <InfoValue>{pokemon.weight / 10}kg</InfoValue>
                    </InfoBox>
                </InfoGrid>

                <TypesWrapper>
                    <TypesLabel>타입</TypesLabel>
                    <TypesList>
                        {pokemon.types.map((typeInfo, index) => (
                            <TypeBadge key={index}>
                                {typeInfo.type.name}
                            </TypeBadge>
                        ))}
                    </TypesList>
                </TypesWrapper>

                <AbilitiesWrapper>
                    <AbilitiesLabel>능력</AbilitiesLabel>
                    <AbilitiesList>
                        {pokemon.abilities.map((abilityInfo, index) => (
                            <AbilityBadge key={index}>
                                {abilityInfo.ability.name}
                            </AbilityBadge>
                        ))}
                    </AbilitiesList>
                </AbilitiesWrapper>
            </Card>
        </Container>
    );
}

export default Detail;