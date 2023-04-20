import {useState} from "react";

function Categories() {
    const [showCategories, setShowCategories] = useState([])
    const [words, setWords] = useState(null);
    const [details, setShowDetails] = useState(null)
    const [viewableWords, setViewableWords] = useState([]);

    async function getCategories() {
        const response = await fetch(`${import.meta.env.VITE_CATEGORYHOST}/v1/admin/categories`, {
            method: "GET",
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("SavedToken")}
        })
        const {data} = await response.json()
        setShowCategories(data)
        console.log(data)
        fetch(`${import.meta.env.VITE_CATEGORYDETAILS}/v1/admin/Words?wordfilter=published`, {
            method: "GET",
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("SavedToken")}
        })
            .then(response =>
                response.json()
            )
            .then(data => setWords(data.data.items))
            .catch((error) => {
                console.log(error)
            });
    }

    function showDetails(id) {
        const correctWords = [];
        console.log(words.length)
        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words[i].categories.length; j++) {
                if (words[i].categories[j].id === id) {
                    correctWords.push(words[i]);
                }
            }
        }
        setViewableWords(correctWords);
    }

    return (
        <div>
            <button onClick={getCategories}>Show Categories</button>
            <div className="categoryDisplay">
            {showCategories && showCategories.map((category) => (
                <div key={category.id} className="categoryButtons">
                    <button onClick={() => showDetails(category.id)}>{category.name}</button>
                </div>
            ))}
            </div>
            {
                setShowDetails !== null &&
                <>{JSON.stringify(viewableWords)}</>
            }
        </div>
    )
}

export default Categories