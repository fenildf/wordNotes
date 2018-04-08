import React , {Component} from 'react';
import {Button} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'

export default class iconButton extends Component {
  render (){
    const Icons =["ios-sad","emoji-sad","emoji-neutral","emoji-flirt"];
    const iconIndex = this.props.type - 1 ;
    const View = this.props.type == 1
      ?(<IconIonicons.Button name="ios-sad" backgroundColor="#e6e2e2" color='#8868b8' size={30} iconStyle={{marginRight: 0}} onPress={this.props.onPress}></IconIonicons.Button>)
      :(<IconEntypo.Button name={Icons[iconIndex]} backgroundColor="#e6e2e2" color='#8868b8' size={30} iconStyle={{marginRight: 0}} onPress={this.props.onPress}></IconEntypo.Button>);
    return (View)
  }
}
