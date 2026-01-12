import React from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Appbar, Text, Surface, Chip } from "react-native-paper";

const { width } = Dimensions.get("window");

export default function MovieDetailScreen({ route, navigation }: any) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Movie Details" />
      </Appbar.Header>

      <ScrollView>
        <Image
          source={
            movie?.posterURL
              ? { uri: movie?.posterURL }
              : require("../../assets/noImage.png")
          }
          style={styles.poster}
          resizeMode="cover"
        />

        <Surface style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {movie?.title}
          </Text>

          <View style={styles.chipContainer}>
            <Chip icon="movie" mode="outlined" style={styles.chip}>
              Drama
            </Chip>
            <Chip icon="star" mode="outlined" style={styles.chip}>
              IMDB: {movie?.imdbId}
            </Chip>
          </View>

          <Text variant="bodyLarge" style={styles.description}>
            This is a compelling drama that explores deep human emotions and
            relationships. The story unfolds with powerful performances and
            stunning cinematography that captures the essence of the narrative.
          </Text>

          <View style={styles.infoSection}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Additional Information
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID:</Text>
              <Text style={styles.infoValue}>{movie?.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>IMDB ID:</Text>
              <Text style={styles.infoValue}>{movie?.imdbId}</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  poster: {
    width: width,
    height: width * 1.5,
  },
  content: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  description: {
    lineHeight: 24,
    color: "#666",
    marginBottom: 20,
  },
  infoSection: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "600",
    width: 100,
  },
  infoValue: {
    flex: 1,
    color: "#666",
  },
});
