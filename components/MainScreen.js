import React , {Component} from 'react';
import { StyleSheet,View,Text,FlatList,KeyboardAvoidingView,Animated} from 'react-native';
import { NavigationActions ,SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo'

import WordRow from './wordRowComponent';
import AddWordForm from './addWordFormComponent';
import data from '../fakedata.js'

export default class MainScreen extends React.Component {
  state = {
    isFormOpen:false,
    data: data,
    wordUp:'',
    wordDown:'dd',
    animation: new Animated.Value(0),
  }
  static navigationOptions = {
    drawerLabel: '单词本',
  };

  keyExtractor = (item,index)=>`${index}`
  renderItem = ({item,index})=><WordRow item={item} index={index} slideUp={this.slideUp} slideDown={this.slideDown} updateHandler={this.updateHandler} deleteHandler={this.deleteHandler}/>
  onViewableItemsChanged = (info) => {this.setState({wordUp:`${info.viewableItems[0].item.date}`})}

  addHandler = (newItem) => this.setState({data:[...this.state.data,newItem]})
  updateHandler = (newItem,index) => {
  let newData = this.state.data.slice();
  newData[index] = newItem;
  this.setState({data:newData});
  }
  deleteHandler =(index) => {
  let newData = this.state.data;
  newData.splice(index,1);
  this.setState({data:[...newData]});
  }

  toggleForm = () => this.setState({isFormOpen:!this.state.isFormOpen})

  slideDown = (view) =>{
    //设置上层和下层文字
    this.setState({wordUp:'4月7号',wordDown:view});
    //向下滑动动画
    this.state.animation.setValue(-30);
    Animated.timing(this.state.animation, {toValue: 0,duration:400,delay:400}).start();
  }
  slideUp = (view1 ,view2 ,callback) =>{
    //设置上层和下层文字
    this.setState({wordUp:view1,wordDown:view2});
      //向上滑动动画
    this.state.animation.setValue(0);
    Animated.timing(this.state.animation, {toValue: -30,duration:400}).start(callback);
  }

  render() {
    let toggleIcon, animation, view, view2;
    view1 = this.state.wordUp;
    view2 = this.state.wordDown;
    toggleIcon = this.state.isFormOpen?'cross':'plus';
    animation = this.state.animation;
    return (
    <KeyboardAvoidingView style={{ flex: 1}} behavior='padding'>
      <SafeAreaView>
        <View style={{zIndex:1,}}>
          <View style={styles.header}>
            <Icon style={styles.headerIcon} name={'menu'} size={35} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
            <View style={[styles.center,]}>
              <Animated.View style={[{transform:[{translateY:animation}],opacity:animation.interpolate({inputRange: [-30,0],outputRange: [0,1]})},styles.center]}>
                <Text style={styles.text}>{view1}</Text>
              </Animated.View>
              <Animated.View style={[{transform:[{translateY:animation}],opacity:animation.interpolate({inputRange: [-30,0],outputRange: [1,0]})},{flex:1},styles.notification]}>
                <Text style={styles.text}>{view2}</Text>
              </Animated.View>
            </View>
            <Icon style={styles.headerIcon} name={toggleIcon} size={35} onPress={this.toggleForm}/>
          </View>
          <AddWordForm slideUp={this.slideUp} slideDown={this.slideDown} toggle={this.toggleForm} isOpen={this.state.isFormOpen} addHandler={this.addHandler}/>
        </View>
        <FlatList
          style={styles.container}
          renderItem={this.renderItem}
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          onViewableItemsChanged = {this.onViewableItemsChanged}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  center: {
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  notification: {
    position:'absolute',
    height:'100%',
    top:'100%',
  },
  text:{
    fontStyle:'italic',
    fontSize:20,
    color:'#ae3fee',
  },
  header: {
    zIndex:3,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#cd8dd9',
    height:37
  },
  headerIcon: {
    color:'#ad51e2'
  }
});
