
import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails, addFavourite, removeFavourite } from '../features/games/gamesSlice';

// Define types for better TypeScript safety
interface GameDetails {
  id: string;
  title: string;
  bannerUrl: string;
  iconUrl: string;
  description: string;
  rating: number;
}

// @ts-ignore
const GameDetailsScreen = ({ route, navigation }) => {
  const { gameId } = route.params;
  const dispatch = useDispatch();
  const gameDetails: GameDetails | null = useSelector((state) => state.games.gameDetails);
  const favourites = useSelector((state) => state.games.favourites);
  const status = useSelector((state) => state.games.status);
  const error = useSelector((state) => state.games.error);

  useEffect(() => {
    dispatch(fetchGameDetails(gameId));
  }, [dispatch, gameId]);

  const isFavourite = (gameId: string) => {
    return favourites.some((game: { id: string }) => game.id === gameId);
  };

  const toggleFavourite = () => {
    if (gameDetails) {
      if (isFavourite(gameDetails.id)) {
        dispatch(removeFavourite(gameDetails));
      } else {
        dispatch(addFavourite(gameDetails));
      }
    }
  };

  if (status === 'loading' || !gameDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load game details: {error}</Text>
        <Button title="Retry" onPress={() => dispatch(fetchGameDetails(gameId))} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: gameDetails.bannerUrl }} style={styles.banner} />
      <View style={styles.header}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title={isFavourite(gameDetails.id) ? "Unfavourite" : "Favourite"} onPress={toggleFavourite} />
      </View>
      <Image source={{ uri: gameDetails.iconUrl }} style={styles.icon} />
      <Text style={styles.title}>{gameDetails.title}</Text>
      <Text style={styles.description}>{gameDetails.description}</Text>
      <Text style={styles.rating}>Rating: {gameDetails.rating}/5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
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
});

export default GameDetailsScreen;
