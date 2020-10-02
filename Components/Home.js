import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default class Home extends Component {
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
    this.setState({ pokemon: res.data });
    this.renderPokemon();
  }
  renderPokemon = () => {
    let newComponents = [];
    this.pokemon.forEach(pokemon => {
      console.log(pokemon.name);
      newComponents.push(<View style={styles.pokemonCard}>{pokemon.name}</View>)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
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
