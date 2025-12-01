import { useState } from 'react';
import './index.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems = {
    appetizers: [
      { id: 1, name: 'Hummus', description: 'Creamy chickpea dip with tahini, lemon, and garlic', price: '$8', image: '🥙' },
      { id: 2, name: 'Baba Ganoush', description: 'Smoky eggplant dip with tahini and spices', price: '$9', image: '🍆' },
      { id: 3, name: 'Stuffed Grape Leaves', description: 'Rice and herbs wrapped in tender grape leaves', price: '$10', image: '🍃' },
      { id: 4, name: 'Falafel', description: 'Crispy chickpea fritters with tahini sauce', price: '$9', image: '🥘' },
    ],
    mains: [
      { id: 5, name: 'Grilled Lamb Chops', description: 'Tender lamb chops marinated in Mediterranean herbs', price: '$28', image: '🍖' },
      { id: 6, name: 'Chicken Shawarma', description: 'Spiced chicken with garlic sauce and pickles', price: '$18', image: '🍗' },
      { id: 7, name: 'Mediterranean Sea Bass', description: 'Fresh sea bass with lemon and herbs', price: '$26', image: '🐟' },
      { id: 8, name: 'Vegetarian Moussaka', description: 'Layers of eggplant, potatoes, and béchamel sauce', price: '$16', image: '🍆' },
      { id: 9, name: 'Beef Kebab', description: 'Marinated beef skewers with rice and vegetables', price: '$22', image: '🍢' },
    ],
    salads: [
      { id: 10, name: 'Greek Salad', description: 'Fresh tomatoes, cucumbers, olives, and feta cheese', price: '$12', image: '🥗' },
      { id: 11, name: 'Mediterranean Quinoa', description: 'Quinoa with vegetables, herbs, and lemon dressing', price: '$14', image: '🌾' },
      { id: 12, name: 'Lebanese Fattoush', description: 'Mixed greens with crispy pita and sumac dressing', price: '$13', image: '🥬' },
    ],
    desserts: [
      { id: 13, name: 'Baklava', description: 'Layers of phyllo pastry with honey and nuts', price: '$8', image: '🍯' },
      { id: 14, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: '$9', image: '☕' },
      { id: 15, name: 'Greek Yogurt with Honey', description: 'Creamy yogurt drizzled with local honey', price: '$7', image: '🍯' },
    ],
    drinks: [
      { id: 16, name: 'Fresh Lemonade', description: 'House-made lemonade with fresh lemons', price: '$5', image: '🍋' },
      { id: 17, name: 'Turkish Coffee', description: 'Traditional strong coffee served in small cups', price: '$4', image: '☕' },
      { id: 18, name: 'Mint Tea', description: 'Refreshing mint tea with honey', price: '$4', image: '🌿' },
    ],
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'salads', name: 'Salads' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' },
  ];

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    return menuItems[activeCategory] || [];
  };

  return (
    <div className="menu-page">
      <section className="menu-hero">
        <div className="container">
          <h1>Our Menu</h1>
          <p className="menu-subtitle">Authentic Mediterranean Flavors</p>
        </div>
      </section>

      <section className="menu-content">
        <div className="container">
          <div className="menu-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="menu-items-grid">
            {getFilteredItems().map(item => (
              <div key={item.id} className="menu-item-card">
                <div className="menu-item-image">{item.image}</div>
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;

