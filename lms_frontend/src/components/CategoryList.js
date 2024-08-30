import { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/category/');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array to ensure useEffect runs only once on component mount

    if (loading) {
        return <p>Loading categories</p>;
    }
    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;