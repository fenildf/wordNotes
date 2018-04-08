import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import GroupScreen from './components/GroupScreen';
import MainScreen from './components/MainScreen';


const RootStack = DrawerNavigator({
  Home: {
    screen: MainScreen,
  },
  GroupScreen: {
    screen: GroupScreen,
  },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
