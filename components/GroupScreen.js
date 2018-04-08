import React , {Component} from 'react';
import { StyleSheet, View,Button,Text,AsyncStorage} from 'react-native';
import { NavigationActions } from 'react-navigation';

import WordRow from './wordRowComponent'
const navigateAction = NavigationActions.init('NavModal');

export default class NavModalScreen extends Component {
  static navigationOptions = {
    drawerLabel: '单词分组',
  };
  state = {
    bb:'aaaa'
  }
  componentDidMount () {
    AsyncStorage.getAllKeys().then(
    value => value.toString()
  ).then(value => this.setState({bb:value}))
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title={this.state.bb}
        />
        <WordRow item={{name:'sss',meaning:'sdfaf'}} />
      </View>
    );
  }
}
