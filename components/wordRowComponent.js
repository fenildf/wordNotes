import React , {Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,LayoutAnimation,Animated} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'

import IconButton from './iconButtonComponent'


export default class WordRow extends Component {
  state = {
    word : this.props.item.word ,
    meaning : this.props.item.meaning,
    text : '',
    isEditable : false,
    animation: new Animated.Value(0)
  }
  onResponderTerminationRequest = evt => false
  onMoveShouldSetResponder = evt => true

  onResponderGrant = evt => {
    this._root.setNativeProps({opacity: 0.4});
    //设置初始坐标
    this.startX = evt.nativeEvent.pageX;
  }
  onResponderMove = evt =>{
    if(!this.startX) return;
    //计算偏移长度
    let offsetX = evt.nativeEvent.pageX - this.startX;
    let initNum = this.props.item.familiarity;
    let baseX = 70 ;
    let times = parseInt(offsetX/baseX) ;
    this._root.setNativeProps({transform:[{translateX:offsetX}]});
  }
  onResponderRelease = evt => {
    this._root.setNativeProps({opacity: 1});
    //回位动画
    this.state.animation.setValue(evt.nativeEvent.pageX-this.startX);
    Animated.spring(this.state.animation, {toValue: 0}).start();//使用useNativeDriver: true,会不更新this.state.animation
    if(!this.startX) return;
    //计算偏移长度 更新的倍数
    let offsetX = evt.nativeEvent.pageX - this.startX;
    let initNum = this.props.item.familiarity;
    let baseX = 70 ;
    let times = parseInt(offsetX/baseX) ;
    //在范围内则更新
    let newNum = initNum + times;
    if( (1<=newNum) && (newNum<=5) && newNum!==initNum ){
      const {word,meaning,date} = this.props.item;
      const index = this.props.index;
      const newItem = {word,meaning,familiarity:newNum,date};
      this.props.updateHandler(newItem,index);
      this.props.slideUp('4月7号','修改成功',()=>{this.props.slideDown('修改成功')})
    }
  }
  //表单绑定state
  onChangeWord = (word) => this.setState({word})
  onChangeMeaning = (meaning) => this.setState({meaning})
  onSubmitEditing = () => {this.meaningInput.focus();}

  textOnPress= (evt) => {
    const currentTime = evt.nativeEvent.timestamp;
    if(this.lastTime&&( (currentTime-this.lastTime)<300 ) ){
      //触发双击
      this.setState({word:this.props.item.word});
      this.setState({meaning:this.props.item.meaning});
      LayoutAnimation.spring();
      this.setState({isEditable:true});
      this.lastTime = null ;
    }else{
      this.lastTime = currentTime ;
    }
  }
  // textOnPress= () => {
  //   this.props.slideUp((<IconEntypo name={'menu'} size={35} />),'sssadadad')
  // }
  close = () =>{
    LayoutAnimation.spring();
    this.setState({isEditable:false});
  }
  delete = () =>{
    const index = this.props.index;
    this.props.deleteHandler(index);
    this.props.slideUp('4月7号','删除成功',()=>{this.props.slideDown('删除成功')})
    this.close();
  }
  onPress = (familiarity) => {
    const {word,meaning} = this.state;
    const date = this.props.item.date;
    const index = this.props.index;
    const newItem = {word,meaning,familiarity,date};
    this.props.updateHandler(newItem,index);
    this.props.slideUp('4月7号','修改成功',()=>{this.props.slideDown('修改成功')})
    this.close();
  }
  render() {
    const animation = this.state.animation;
    const familiarityIcons =["ios-sad","emoji-sad","emoji-neutral","emoji-flirt",'emoji-happy'];
    const iconIndex = this.props.item.familiarity - 1 ;
    const familiarityIconView = this.props.item.familiarity == 1
      ?(<IconIonicons style={{paddingTop: 3,paddingRight:5}} name='ios-sad' size={30} color='#9d5eff'/>)
      :(<IconEntypo style={{paddingTop: 3,paddingRight:5}} name={familiarityIcons[iconIndex]} size={25} color='#9d5eff'/>);
    const currentView = this.state.isEditable
      //编辑状态下的组件
    ?(<View  style={styles.formView}>
      <TextInput style={[styles.textInput,{borderBottomWidth:1}]} returnKeyType='next' placeholder="输入单词" onChangeText={this.onChangeWord} onSubmitEditing={this.onSubmitEditing} value={this.state.word}/>
      <TextInput ref={component => this.meaningInput = component} style={styles.textInput} multiline={true} blurOnSubmit={true} returnKeyType='done' onChangeText={this.onChangeMeaning} placeholder="输入释义" value={this.state.meaning}/>
      <View style={styles.footContainer}>
        <IconIonicons.Button name="ios-trash" backgroundColor="red" color='#e9e9e9' size={30} iconStyle={{marginRight: 0,paddingHorizontal:5}} onPress={this.delete}></IconIonicons.Button>
        <View style={styles.iconContainer}>
          <IconButton type={1} onPress={()=>this.onPress(1)}/>
          <IconButton type={2} onPress={()=>this.onPress(2)}/>
          <IconButton type={3} onPress={()=>this.onPress(3)}/>
          <IconButton type={4} onPress={()=>this.onPress(4)}/>
        </View>
        <IconIonicons.Button name="ios-arrow-up-outline" backgroundColor="#f4edee" color='#8868b8' size={30} iconStyle={{marginRight: 0,paddingHorizontal:10}} onPress={this.close}></IconIonicons.Button>
      </View>
    </View>)
      //文本状态时的组件
    :(<Animated.View
      ref= {component => this._root = component}
      style={[styles.container,{transform:[{translateX:animation}]}]}
      onResponderGrant ={this.onResponderGrant}
      onMoveShouldSetResponder = {this.onMoveShouldSetResponder}
      onResponderMove = {this.onResponderMove}
      onResponderTerminationRequest= {this.onResponderTerminationRequest}
      onResponderRelease= {this.onResponderRelease}
      >
      {familiarityIconView}
      <Text
        ref= {component => this._text = component}
        onPress={this.textOnPress}
        suppressHighlighting={true}
        style={styles.text}
        >{`${this.props.item.word} ${this.props.item.meaning}`}</Text>
    </Animated.View>)

    return (
      currentView
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height:40,
    borderColor:'#e2e2e2',
    borderWidth: .5,
    alignItems:'center',
    flexDirection: 'row',
  },
  text:{
    fontStyle:'italic',
    alignItems:'center',
    flex:1,
    fontSize:20,
  },
  formView: {
  },
  iconContainer:{
    flex: 1,
    justifyContent: 'space-around',
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
