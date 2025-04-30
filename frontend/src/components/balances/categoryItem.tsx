import { useState } from "react";
import { FaCoffee, FaCar, FaHouseDamage, FaPlane } from "react-icons/fa";
import { LuPopcorn } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const CategoryComponent = () => {



  const categories = [ { label: "Drinks", value: "drink", icon: <FaCoffee />},
    { label: "Transporation", value: "transportation", icon: <FaCar />},
    {label: "Entertainment", value: "entertainment", icon: <LuPopcorn />,},
    {label: "Bills", value: "bills", icon: <FaHouseDamage />},
    {label: "Travel", value: "travel", icon: <FaPlane />},
    {label: "Food", value: "food", icon: <IoFastFoodOutline />},
    {label: "Miscellaneous", value: "miscellaneous", icon: <GiPerspectiveDiceSixFacesRandom />}
  ]
  
  const [selectedCategory, setSelectedCategory] = useState< string | null>(null);

    return (
        <>
        <div className="category-dropdown">
            <ul className="category-list">
            {categories.map((category) => (
                <li key={category.value} onClick={() => setSelectedCategory(category.label)}>
                    <div className="category-item">{category.icon}
                    <span className={selectedCategory === category.label ? 'active-category-text' : 'category-text'}>{category.label}</span>
                    </div>
                    <div className="category-radio-div">
                    </div>
                </li>
            ))}
            </ul>
        </div>
        </>
    )
}

export default CategoryComponent;