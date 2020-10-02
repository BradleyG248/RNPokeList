import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      activePokemon: {},
      PokeComponents: []
    }
    this.getPokemon();
  }
  getPokemon = async () => {
    let res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
    this.setState({ pokemon: res.data.results });
    this.renderPokemon();
  }
  renderPokemon = () => {
    let newComponents = [];
    this.state.pokemon.forEach(pokemon => {
      pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      newComponents.push(<View style={styles.pokemonCard}><Text>{pokemon.name}</Text></View>)
    })
    this.setState({ PokeComponents: newComponents })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        {this.state.PokeComponents}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
