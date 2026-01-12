import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SearchBarProps } from '../types';

export default function SearchBar({ value, onChangeText, onClear }: SearchBarProps){
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search movies..."
        onChangeText={onChangeText}
        value={value}
        style={styles.searchbar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 2,
  },
});