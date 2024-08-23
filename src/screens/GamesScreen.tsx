
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Button, Text, View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchGames, addFavourite, removeFavourite } from '../features/games/gamesSlice';

// Define types for better TypeScript safety
interface Game {
  id: string;
  title: string;
  iconUrl: string;
  rating: number;
}

// @ts-ignore
const GamesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.gamesList);
  const favourites = useSelector((state) => state.games.favourites);
  const status = useSelector((state) => state.games.status);
  const error = useSelector((state) => state.games.error);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const isFavourite = (gameId: string) => {
    return favourites.some((game: Game) => game.id === gameId);
  };

  const toggleFavourite = (game: Game) => {
    if (isFavourite(game.id)) {
      dispatch(removeFavourite(game));
    } else {
      dispatch(addFavourite(game));
    }
  };

  const renderItem = ({ item }: { item: Game }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.iconUrl }} style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating}/5</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => toggleFavourite(item)} style={styles.favouriteButton}>
          <Text style={{ color: isFavourite(item.id) ? 'red' : 'gray' }}>❤️</Text>
        </TouchableOpacity>
        <Button title="Details" onPress={() => navigation.navigate('GameDetails', { gameId: item.id })} />
      </View>
    </View>
  );

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load games: {error}</Text>
        <Button title="Retry" onPress={() => dispatch(fetchGames())} />
      </View>
    );
  }

  if (games.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No games available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favouriteButton: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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

export default GamesScreen;
