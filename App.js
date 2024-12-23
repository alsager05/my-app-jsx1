import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import SignupScreen from './SignupScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutScreen from './CheckoutScreen';
import RatingComponent from './RatingComponent';

// Sample data - in a real app, this would come from an API
const restaurants = [
  {
    id: 1,
    name: "Italiano Delizioso",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    reviews: [
      {
        userName: "John D.",
        rating: 5,
        review: "Best Italian food in town! The atmosphere is amazing.",
        date: "2024-03-15"
      },
      {
        userName: "Sarah M.",
        rating: 4,
        review: "Great food but slightly long wait times.",
        date: "2024-03-10"
      }
    ],
    menu: [
      { 
        id: 1, 
        name: "Margherita Pizza", 
        price: 14.99,
        description: "Fresh tomatoes, mozzarella, basil, olive oil",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400", 
        rating: 4.8,
        reviews: [
          {
            userName: "Mike R.",
            rating: 5,
            review: "Perfect crust and fresh ingredients!",
            date: "2024-03-18"
          },
          {
            userName: "Lisa K.",
            rating: 4,
            review: "Delicious but could use more basil.",
            date: "2024-03-14"
          }
        ]
      },
      { 
        id: 2, 
        name: "Pasta Carbonara", 
        price: 12.99,
        description: "Creamy sauce, pancetta, parmesan cheese",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
      },
      {
        id: 3,
        name: "Tiramisu",
        price: 6.99,
        description: "Classic Italian dessert with coffee and mascarpone",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
      },
      {
        id: 4,
        name: "Bruschetta",
        price: 7.99,
        description: "Toasted bread with tomatoes, garlic, and herbs",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
      }
    ]
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-45 min",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=500",
    menu: [
      { 
        id: 5, 
        name: "Butter Chicken", 
        price: 15.99,
        description: "Creamy tomato sauce, tender chicken, aromatic spices",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
      },
      { 
        id: 6, 
        name: "Vegetable Biryani", 
        price: 13.99,
        description: "Fragrant rice with mixed vegetables and spices",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
      },
      {
        id: 7,
        name: "Garlic Naan",
        price: 3.99,
        description: "Freshly baked bread with garlic and butter",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      },
      {
        id: 8,
        name: "Mango Lassi",
        price: 4.99,
        description: "Refreshing yogurt drink with mango",
        image: "https://images.unsplash.com/photo-1571006682881-b02fc41a5a36?w=400",
      }
    ]
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "20-35 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    menu: [
      {
        id: 9,
        name: "Dragon Roll",
        price: 16.99,
        description: "Eel, cucumber, avocado, special sauce",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
      },
      {
        id: 10,
        name: "Salmon Nigiri (4pc)",
        price: 11.99,
        description: "Fresh salmon over seasoned rice",
        image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400",
      },
      {
        id: 11,
        name: "Miso Soup",
        price: 3.99,
        description: "Traditional Japanese soup with tofu",
        image: "https://images.unsplash.com/photo-1607301405390-d831c242f59a?w=400",
      },
      {
        id: 12,
        name: "Tempura Udon",
        price: 13.99,
        description: "Thick noodles in soup with crispy tempura",
        image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400",
      }
    ]
  },
  {
    id: 4,
    name: "Burger Bliss",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "15-30 min",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500",
    menu: [
      {
        id: 13,
        name: "Classic Cheeseburger",
        price: 12.99,
        description: "Beef patty, cheddar, lettuce, tomato, special sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      },
      {
        id: 14,
        name: "Loaded Fries",
        price: 8.99,
        description: "Crispy fries with cheese, bacon, and ranch",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
      },
      {
        id: 15,
        name: "Chicken Wings (8pc)",
        price: 11.99,
        description: "Choose from BBQ, Buffalo, or Garlic Parmesan",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
      },
      {
        id: 16,
        name: "Milkshake",
        price: 5.99,
        description: "Vanilla, Chocolate, or Strawberry",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400",
      }
    ]
  },
  {
    id: 5,
    name: "Thai Orchid",
    cuisine: "Thai",
    rating: 4.7,
    deliveryTime: "25-40 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500",
    menu: [
      {
        id: 17,
        name: "Pad Thai",
        price: 13.99,
        description: "Rice noodles, shrimp, tofu, peanuts, tamarind sauce",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
      },
      {
        id: 18,
        name: "Green Curry",
        price: 14.99,
        description: "Coconut curry with bamboo shoots, Thai basil, choice of protein",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
      },
      {
        id: 19,
        name: "Tom Yum Soup",
        price: 8.99,
        description: "Spicy and sour soup with mushrooms, lemongrass, lime leaves",
        image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400",
      },
      {
        id: 20,
        name: "Mango Sticky Rice",
        price: 6.99,
        description: "Sweet coconut sticky rice with fresh mango",
        image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=400",
      }
    ]
  },
  {
    id: 6,
    name: "Mediterranean Delight",
    cuisine: "Mediterranean",
    rating: 4.8,
    deliveryTime: "20-35 min",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=500",
    menu: [
      {
        id: 21,
        name: "Mixed Mezze Platter",
        price: 16.99,
        description: "Hummus, baba ganoush, falafel, dolmas, pita bread",
        image: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400",
      },
      {
        id: 22,
        name: "Chicken Shawarma Wrap",
        price: 12.99,
        description: "Marinated chicken, garlic sauce, pickles, tomatoes",
        image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400",
      },
      {
        id: 23,
        name: "Greek Salad",
        price: 10.99,
        description: "Tomatoes, cucumbers, olives, feta cheese, olive oil",
        image: "https://images.unsplash.com/photo-1522664141-cd2e136ce786?w=400",
      },
      {
        id: 24,
        name: "Baklava",
        price: 5.99,
        description: "Layered phyllo pastry with nuts and honey",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400",
      }
    ]
  }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setSelectedRestaurant(null);
  };

  const handlePlaceOrder = (orderDetails) => {
    Alert.alert(
      "Order Placed!",
      "Your order has been successfully placed.",
      [
        {
          text: "OK",
          onPress: () => {
            setCart([]);
            setShowCheckout(false);
            setSelectedRestaurant(null);
          }
        }
      ]
    );
  };

  if (!user) {
    if (isSignup) {
      return (
        <SignupScreen 
          onSignup={handleLogin}
          onBackToLogin={() => setIsSignup(false)}
        />
      );
    }
    return <LoginScreen onLogin={handleLogin} onSignup={() => setIsSignup(true)} />;
  }

  if (showProfile) {
    return (
      <ProfileScreen 
        user={user}
        onLogout={handleLogout}
        onBack={() => setShowProfile(false)}
      />
    );
  }

  if (showCheckout) {
    return (
      <CheckoutScreen
        cart={cart}
        total={getTotalPrice()}
        deliveryAddress={user.address}
        onBack={() => setShowCheckout(false)}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>
            <Text style={styles.headerFirst}>FoO</Text>
            <Text style={styles.headerSecond}>Diez</Text>
          </Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setShowProfile(true)}
            >
              <Text style={styles.profileButtonText}>
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.tagline}>Delicious food at your doorstep</Text>
        <Text style={styles.welcomeText}>
          Welcome, {user.name || user.email}
        </Text>
      </View>

      <ScrollView style={styles.mainContent}>
        <View style={styles.restaurantsList}>
          <Text style={styles.sectionTitle}>Restaurants</Text>
          {restaurants.map(restaurant => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => setSelectedRestaurant(restaurant)}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.cuisineText}>{restaurant.cuisine} Cuisine</Text>
                <RatingComponent 
                  rating={restaurant.rating}
                  totalRatings={restaurant.reviews?.length || 0}
                  onPress={() => handleShowReviews(restaurant)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedRestaurant && (
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{selectedRestaurant.name} Menu</Text>
            {selectedRestaurant.menu.map(item => (
              <View key={item.id} style={styles.menuItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuImage}
                />
                <View style={styles.menuItemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <RatingComponent 
                    rating={item.rating}
                    totalRatings={item.reviews?.length || 0}
                    size="small"
                    onPress={() => handleShowReviews(item, 'menuItem')}
                  />
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Your Cart</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          ) : (
            <>
              {cart.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cartItemImage}
                  />
                  <View style={styles.cartItemContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.cartTotal}>
                <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
                <TouchableOpacity 
                  style={styles.checkoutButton}
                  onPress={() => setShowCheckout(true)}
                >
                  <Text style={styles.buttonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF4B3A',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerFirst: {
    color: '#fff',
  },
  headerSecond: {
    color: '#FFE031',
  },
  tagline: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisineText: {
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
    fontWeight: '500',
  },
  deliveryTime: {
    color: '#666',
    fontSize: 14,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuImage: {
    width: '100%',
    height: 180,
  },
  menuItemContent: {
    padding: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#666',
    marginBottom: 8,
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF4B3A',
  },
  addButton: {
    backgroundColor: '#FF4B3A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  orderButton: {
    backgroundColor: '#FF4B3A',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartTotal: {
    marginTop: 20,
    padding: 15,
    borderTopWidth: 2,
    borderColor: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemContent: {
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#FF4B3A',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
    opacity: 0.9,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF4B3A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF4B3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
