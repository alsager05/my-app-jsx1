import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CheckoutScreen({ cart, total, onBack, onPlaceOrder, deliveryAddress }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [note, setNote] = useState('');

  const deliveryFee = 2.99;
  const tax = (total * 0.1).toFixed(2);
  const finalTotal = (parseFloat(total) + parseFloat(deliveryFee) + parseFloat(tax)).toFixed(2);

  const handlePlaceOrder = () => {
    Alert.alert(
      "Confirm Order",
      "Would you like to place this order?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Place Order",
          onPress: () => {
            onPlaceOrder({
              items: cart,
              total: finalTotal,
              paymentMethod,
              deliveryAddress,
              note,
              orderDate: new Date(),
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#FF4B3A" />
            <Text style={styles.addressText}>{deliveryAddress}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'card' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <MaterialCommunityIcons 
                name="credit-card" 
                size={24} 
                color={paymentMethod === 'card' ? '#FF4B3A' : '#666'} 
              />
              <Text style={styles.paymentText}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'cash' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('cash')}
            >
              <MaterialCommunityIcons 
                name="cash" 
                size={24} 
                color={paymentMethod === 'cash' ? '#FF4B3A' : '#666'} 
              />
              <Text style={styles.paymentText}>Cash</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Special instructions for delivery"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalValue}>${deliveryFee}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text style={styles.totalValue}>${tax}</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total</Text>
            <Text style={styles.finalTotalValue}>${finalTotal}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order - ${finalTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#FF4B3A',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
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
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  addressText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#FF4B3A',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentOption: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '45%',
  },
  selectedPayment: {
    borderColor: '#FF4B3A',
    backgroundColor: '#FFF5F4',
  },
  paymentText: {
    marginTop: 5,
    color: '#666',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  totalSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 80,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    color: '#666',
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  finalTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4B3A',
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF4B3A',
    padding: 20,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 