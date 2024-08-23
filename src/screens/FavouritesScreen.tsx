
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, Text, Button, Image, StyleSheet } from 'react-native';

// Define types for better TypeScript safety
interface Game {
  id: string;
  title: string;
  iconUrl: string;
  rating: number;
}

// @ts-ignore
const FavouritesScreen = ({ navigation }) => {
  const favourites = useSelector((state) => state.games.favourites);

  const renderItem = ({ item }: { item: Game }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.iconUrl }} style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating}/5</Text>
      </View>
      <Button title="Details" onPress={() => navigation.navigate('GameDetails', { gameId: item.id })} />
    </View>
  );

  if (favourites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favourites added</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favourites}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 18,
  },
});

export default FavouritesScreen;
