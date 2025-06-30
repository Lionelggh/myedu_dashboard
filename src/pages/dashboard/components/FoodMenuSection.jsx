import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FoodMenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMore, setShowMore] = useState(false);

  const foodItems = [
    {
      id: 1,
      name: "Beef Steak with Fried Potato",
      description: "Grilled beef steak served with crispy golden fried potatoes and seasonal vegetables. A protein-rich meal perfect for growing students.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      category: "main",
      price: 12.50,
      calories: 650,
      allergens: ["gluten"],
      availability: "available",
      rating: 4.5,
      nutritionScore: "B+"
    },
    {
      id: 2,
      name: "Pancake with Honey",
      description: "Fluffy buttermilk pancakes drizzled with pure honey and served with fresh berries. A delightful breakfast or dessert option.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
      category: "dessert",
      price: 8.75,
      calories: 420,
      allergens: ["gluten", "dairy", "eggs"],
      availability: "available",
      rating: 4.8,
      nutritionScore: "C+"
    },
    {
      id: 3,
      name: "Japanese Beef Ramen",
      description: "Authentic Japanese ramen with tender beef slices, soft-boiled egg, and fresh vegetables in rich, savory broth.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
      category: "main",
      price: 11.25,
      calories: 580,
      allergens: ["gluten", "soy", "eggs"],
      availability: "limited",
      rating: 4.7,
      nutritionScore: "A-"
    },
    {
      id: 4,
      name: "Caesar Salad Bowl",
      description: "Fresh romaine lettuce with parmesan cheese, croutons, and creamy caesar dressing. Light and nutritious option.",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      category: "salad",
      price: 9.50,
      calories: 320,
      allergens: ["dairy", "gluten"],
      availability: "available",
      rating: 4.3,
      nutritionScore: "A"
    },
    {
      id: 5,
      name: "Grilled Chicken Sandwich",
      description: "Juicy grilled chicken breast with lettuce, tomato, and mayo on whole wheat bread. Served with sweet potato fries.",
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop",
      category: "main",
      price: 10.75,
      calories: 520,
      allergens: ["gluten", "dairy"],
      availability: "available",
      rating: 4.4,
      nutritionScore: "B+"
    },
    {
      id: 6,
      name: "Fruit Smoothie Bowl",
      description: "Refreshing blend of mixed berries, banana, and yogurt topped with granola and fresh fruits.",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
      category: "dessert",
      price: 7.25,
      calories: 280,
      allergens: ["dairy"],
      availability: "available",
      rating: 4.6,
      nutritionScore: "A"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Items', icon: 'Utensils' },
    { id: 'main', label: 'Main Course', icon: 'ChefHat' },
    { id: 'salad', label: 'Salads', icon: 'Leaf' },
    { id: 'dessert', label: 'Desserts', icon: 'Cookie' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  const displayItems = showMore ? filteredItems : filteredItems.slice(0, 3);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-success';
      case 'limited': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited';
      case 'unavailable': return 'Sold Out';
      default: return 'Unknown';
    }
  };

  const getNutritionColor = (score) => {
    if (score.startsWith('A')) return 'text-success';
    if (score.startsWith('B')) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Current Food Menu</h3>
          <p className="text-text-secondary text-sm">Today's available meals and snacks</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Calendar"
            iconSize={16}
            onClick={() => console.log('View weekly menu')}
          >
            Weekly Menu
          </Button>
          <Button
            variant="primary"
            iconName="Plus"
            iconSize={16}
            onClick={() => console.log('Add new item')}
          >
            Add Item
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "ghost"}
            iconName={category.icon}
            iconSize={16}
            className="whitespace-nowrap"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="bg-surface-secondary rounded-lg p-4 border border-border hover:shadow-elevation-2 transition-smooth"
          >
            <div className="relative mb-3">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(item.availability)} bg-surface`}>
                  {getAvailabilityText(item.availability)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-text-primary line-clamp-1">{item.name}</h4>
                <span className="text-lg font-bold text-primary">${item.price}</span>
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-text-muted">{item.calories} cal</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-text-muted">{item.rating}</span>
                  </div>
                </div>
                <span className={`font-medium ${getNutritionColor(item.nutritionScore)}`}>
                  {item.nutritionScore}
                </span>
              </div>
              
              {item.allergens.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Icon name="AlertTriangle" size={12} className="text-warning" />
                  <span className="text-xs text-text-muted">
                    Contains: {item.allergens.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More/Less Button */}
      {filteredItems.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            iconName={showMore ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : `View More (${filteredItems.length - 3} more items)`}
          </Button>
        </div>
      )}

      {/* Menu Statistics */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{foodItems.filter(item => item.availability === 'available').length}</p>
            <p className="text-sm text-text-secondary">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{foodItems.filter(item => item.availability === 'limited').length}</p>
            <p className="text-sm text-text-secondary">Limited</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{Math.round(foodItems.reduce((sum, item) => sum + item.rating, 0) / foodItems.length * 10) / 10}</p>
            <p className="text-sm text-text-secondary">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">32k</p>
            <p className="text-sm text-text-secondary">Total Served</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenuSection;