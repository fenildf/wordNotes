import React ,{Component} from 'react';
import { StyleSheet,Animated, View,Button,Text,TextInput} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'

import IconButton from './iconButtonComponent'

export default class addWordForm extends Component {
  state = {
    word : '' ,
    meaning : '',
    myHeight: 0,
    isOpen:false,
    animation: new Animated.Value(0),
  }
  componentWillReceiveProps(nextProps) {
    const currentStatus = this.state.isOpen;
    if(nextProps.isOpen&&!currentStatus){
      this.slideDown();
    }
    else if(!nextProps.isOpen&&currentStatus){
      this.slideUp();
    }
  }
  slideDown = () =>{
    //向下滑动动画
    this.state.animation.setValue(0);
    Animated.spring(this.state.animation, {toValue: 1}).start();
    this.setState({isOpen:true});
  }
  slideUp = () =>{
    //向上滑动动画
    this.state.animation.setValue(1);
    Animated.spring(this.state.animation, {toValue: 0}).start();
    this.setState({isOpen:false});
  }

  onLayout = event => {
    //获得组件高度
    const { height } = event.nativeEvent.layout;
    this.setState({ myHeight: height });
  };

  onSubmitEditing = () => {this.meaningInput.focus();}
  onPress = (familiarity) => {
    const {word,meaning} = this.state;
    const newItem = {word,meaning,familiarity,date:'4月12号'};
    this.setState({word:'',meaning:''});
    this.props.addHandler(newItem);
    this.props.slideUp('4月12号','添加成功',()=>{this.props.slideDown('添加成功')})
  }
  onChangeWord = (word) => this.setState({word})
  onChangeMeaning = (meaning) => this.setState({meaning})

  render() {
    let animation, height ;
    animation = this.state.animation;
    height = -this.state.myHeight;
    return (
      <Animated.View onLayout={this.onLayout} style={[{transform:[{translateY:animation.interpolate({inputRange: [0, 1],outputRange: [height, 0]}),}],opacity:animation},styles.animatedView]}>
        <TextInput style={[styles.textInput,{borderBottomWidth:1}]} returnKeyType='next' placeholder="输入单词" onChangeText={this.onChangeWord} onSubmitEditing={this.onSubmitEditing} value={this.state.word}/>
        <TextInput ref={component => this.meaningInput = component} style={styles.textInput} multiline={true} blurOnSubmit={true} returnKeyType='done' placeholder="输入释义" onChangeText={this.onChangeMeaning} value={this.state.meaning}/>
        <View style={styles.footContainer}>
          <View style={styles.iconContainer}>
            <IconButton type={1} onPress={()=>this.onPress(1)}/>
            <IconButton type={2} onPress={()=>this.onPress(2)}/>
            <IconButton type={3} onPress={()=>this.onPress(3)}/>
            <IconButton type={4} onPress={()=>this.onPress(4)}/>
          </View>
          <IconIonicons.Button name="ios-arrow-up-outline" backgroundColor="#f4edee" color='#8868b8' size={30} iconStyle={{marginRight: 0,paddingHorizontal:10}} onPress={this.props.toggle}></IconIonicons.Button>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  animatedView: {
    zIndex:2,
    position: 'absolute',
    top:'100%',
    width:'100%',
  },
  iconContainer:{
    paddingRight: 40,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footContainer:{
    flex: 1,
    backgroundColor:'#f6f6f6',
    flexDirection: 'row',
  },
  textInput: {
    borderColor: '#dbdfdb',
    height:40,
    fontSize:18,
    backgroundColor: '#f6f6f6',
    textAlign: 'center'
  }
});
