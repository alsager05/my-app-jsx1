import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const orderHistory = [
  {
    id: 1,
    date: '2024-03-20',
    restaurant: 'Tasty Bites',
    items: ['Margherita Pizza', 'Pasta Carbonara'],
    total: 23.98,
    status: 'Delivered'
  },
  {
    id: 2,
    date: '2024-03-18',
    restaurant: 'Spice Garden',
    items: ['Butter Chicken'],
    total: 14.99,
    status: 'Delivered'
  }
];

export default function ProfileScreen({ user, onLogout, onBack }) {
  const [showOrders, setShowOrders] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[styles.actionButton, showOrders && styles.activeActionButton]}
            onPress={() => setShowOrders(!showOrders)}
          >
            <Text style={styles.actionButtonText}>Order History</Text>
          </TouchableOpacity>
          {showOrders && (
            <View style={styles.orderHistorySection}>
              {orderHistory.map(order => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                    <Text style={styles.orderStatus}>{order.status}</Text>
                  </View>
                  <Text style={styles.restaurantName}>{order.restaurant}</Text>
                  <Text style={styles.orderItems}>{order.items.join(', ')}</Text>
                  <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Favorite Restaurants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Delivery Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Payment Methods</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF4B3A',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF4B3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#666',
    fontSize: 16,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionsSection: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderHistorySection: {
    marginTop: 10,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    color: '#666',
    fontSize: 14,
  },
  orderStatus: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderItems: {
    color: '#666',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FF4B3A',
    marginTop: 5,
  },
  activeActionButton: {
    borderColor: '#FF4B3A',
    backgroundColor: '#FFF5F4',
  },
}); 