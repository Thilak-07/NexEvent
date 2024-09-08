import React from "react";
import { Button } from "react-bootstrap";
import { useFilters } from "../contexts/FiltersContext";

const categories = [
    "All",
    "Music",
    "Games",
    "Sports",
    "Film",
    "Fashion",
    "Literature",
    "Technology",
    "Lifestyle",
    "Culture",
    "Charity",
    "Arts",
    "Kids",
    "Other",
];

const CategoryFilter = () => {
    const { selectedCategory, handleCategoryChange } = useFilters();

    return (
        <div className="d-flex flex-wrap justify-content-center mb-2">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant="dark"
                    className="mx-2 my-1"
                    onClick={() => handleCategoryChange(category)}
                    style={{
                        color:
                            selectedCategory === category ? "#f5a623" : "grey",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};

export default CategoryFilter;
