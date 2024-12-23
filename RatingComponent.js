import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RatingComponent({ rating, totalRatings, onPress, size = 'medium' }) {
  const stars = [];
  const starSize = size === 'small' ? 12 : size === 'medium' ? 16 : 20;
  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <MaterialCommunityIcons
        key={i}
        name={i <= rating ? "star" : i - rating < 1 ? "star-half-full" : "star-outline"}
        size={starSize}
        color="#FFD700"
      />
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.starsContainer}>
        {stars}
      </View>
      <Text style={[styles.ratingText, size === 'small' && styles.smallText]}>
        {rating.toFixed(1)} ({totalRatings})
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingText: {
    color: '#666',
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
  },
}); 