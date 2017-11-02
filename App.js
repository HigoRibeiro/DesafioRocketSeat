/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';

class ListItem extends Component {
  render() {
    const { title, description } = this.props.item;
    return (<TouchableOpacity onPress={() => {this.props.onPress && this.props.onPress(this.props.item);}}><View style={this.props.selected ? styles.listitemSelected : styles.listitem}><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text></View></TouchableOpacity>);
  }
}

export default class App extends Component<{}> {

  state = {
    places : [
      {
        key: 1,
        latitude: -20.7502164,
        longitude: -42.8720903,
        title: 'Minha casa',
        description: 'Lugar de descanso',
      },
      {
        key: 2,
        latitude: -20.7650462,
        longitude: -42.868395,
        title: 'UFV',
        description: 'Lugar de trabalho',
      },
      {
        key: 3,
        latitude: -20.7286192,
        longitude: -42.8625216,
        title: 'UNIVIÇOSA',
        description: 'Lugar de estudo',
      },
    ],
    selected: 1,
  }

  handleListItemPress = (item) => {
    const { latitude, longitude } = item;
    this.setState({selected : item.key });
    this.mapView.animateToCoordinate({latitude, longitude}, 1000);
    item.mark.showCallout();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.0567)",
        }}
      />
    );
  };

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  }

  render() {

    const { latitude, longitude } = this.state.places[0];

    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this.mapView = map }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
          }}
          style={styles.mapView}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showPointsOfInterest={false}
          showBuildings={false}
          onMapReady={this._mapReady}
          >
            {this.state.places.map( place => (
              <MapView.Marker
                ref={ mark => place.mark = mark }
                key={place.key}
                title={place.title}
                description={place.description}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude
                }}
                />
            ))}
          </MapView>
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.places}
              renderItem={({item}) => <ListItem item={item} onPress={this.handleListItemPress} />}
              ItemSeparatorComponent={this.renderSeparator}
              />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  listContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent:'center'
  },
  listitem : {
    padding: 10
  },
  listitemSelected : {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.123)'
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
  },
  description: {
    fontSize: 11
  },
  mapView: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    top: 0,
  }
});
