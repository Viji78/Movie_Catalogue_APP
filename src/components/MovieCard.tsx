import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MovieCardProps } from '../types';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MovieCard({ movie, onPress }: MovieCardProps){
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image
             source={
    movie.posterURL
      ? { uri: movie?.posterURL }
      : require('../../assets/noImage.png')
  }
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
              {movie?.title}
            </Text>
            <Text variant="bodySmall" style={styles.imdb}>
              IMDB: {movie?.imdbId}
            </Text>
          </View>
          <MaterialCommunityIcons
              name={"information"}
              size={22}
              color="#666"
            />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize:20,
    marginBottom: 8,
  },
  imdb: {
    color: '#666',
  },
});