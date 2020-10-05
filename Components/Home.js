import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      activePokemon: {},
      PokeComponents: [],
      offset: 0,
      ImgDim: {}
    }
    this.getPokemon();
  }
  getPokemon = async () => {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${this.state.offset}`);
    if (res) {
      this.setState({ pokemon: res.data.results });
      this.renderPokemon();

    }
  }
  setActivePokemon = async (url) => {
    let res = await axios.get(url);
    if (res) {
      this.setState({ activePokemon: res.data });
      this.renderActivePokemon();
    }
  }
  cyclePokemon = async (offset) => {
    let newOffset = this.state.offset + offset;
    if (newOffset < 0) {
      newOffset = 0;
    }
    await this.setState({ offset: newOffset });
    this.getPokemon();
  }
  renderActivePokemon = () => {
    console.log(this.state.activePokemon.sprites.front_default)
    let component = [<View><Image style={this.state.ImgDim} source={{ uri: this.state.activePokemon.sprites.front_default }} /></View>]
    this.setState({ PokeComponents: component });
    Image.getSize(this.state.activePokemon.sprites.front_default, (width, height) => {
      console.log(height);
      this.setState({ ImgDim: { width, height } });
    })
  }
  renderPokemon = () => {
    let newComponents = [];
    this.state.pokemon.forEach(pokemon => {
      pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      newComponents.push(<TouchableOpacity key={pokemon.name} onPress={this.setActivePokemon.bind(this, pokemon.url)} ><View style={styles.pokemonCard}><Text>{pokemon.name}</Text></View></TouchableOpacity>)
    });
    this.setState({ PokeComponents: newComponents });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {this.state.PokeComponents}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.cyclePokemon.bind(this, -10)} style={styles.cycleButton}><Text>Prev</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.cyclePokemon.bind(this, 10)} style={styles.cycleButton}><Text>Next</Text></TouchableOpacity>
        </View>
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
  pokemonCard: {
    backgroundColor: "#fad61d",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    minWidth: "50%"
  },
  cycleButton: {
    minWidth: '27%',
    height: 50,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3%'
  },
  buttons: {
    flexDirection: 'row'
  },
  pokeImage: {
    resizeMode: 'contain'
  }
});
