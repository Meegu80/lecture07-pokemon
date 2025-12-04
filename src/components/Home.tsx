import {useEffect, useState} from "react";

function Home() {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState(null);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then(res => res.json())
            .then(data => {
                setList(date.result)
            });
    }, []);

    return (
        <>
            <div>
                <h1>Pokemon List</h1>
                <div>
                    {loading
                        ? <div>Loading...</div>
                        : <ul>
                            {list
                        </ul>
                    }


                </div>


            </div>
        </>
    );
}

export default Home;