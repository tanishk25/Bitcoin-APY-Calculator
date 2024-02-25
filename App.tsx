/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  
  Image,
  
} from 'react-native';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Calculator' component={Calculator} />
        
      
        
        

      </Stack.Navigator>
    </NavigationContainer>

  );
}
const Login = (props:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <Text style={styles.main}>login  page</Text>
      <TextInput placeholder="username" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,backgroundColor:"red"
      }}
        value={password}
        onChangeText={(text) => setUsername(text)} />

      <Text style={styles.main}>login  page</Text>
      <TextInput placeholder="password" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,
        backgroundColor:"red"
      }}
        value={password}
        onChangeText={(text) => setPassword(text)} />


      <Button title='sign in' onPress={() => props.navigation.navigate("HomeScreen")}></Button>
    </View>
  )
}

const HomeScreen = (props:any) => {
  const [data, setData] = useState([])
  const getAPIData = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false";
    let result: any = await fetch(url);
    result = await result.json();
    console.warn(result)
    setData(result);
  }

  useEffect(() => {

    getAPIData()

  }, [])


  return (
<View>
    <Text style={{ fontSize: 30 ,color:"red",textAlign:'center'}} >List of Bitcon</Text>

  
  {
      data.length ?
          data.map((item:any) => <View style={styles.dataWrapper}>
              {/* <Text style={{ fontSize: 30 ,color:"red"}} >{item.symbol}</Text>*/}
            <Text style={{ fontSize: 30 ,color:"red"}} >{item.symbol}</Text>  
            <Text style={{ fontSize: 30 ,color:"red"}} >{item.current_price}</Text> 
            <Button title='update' onPress={() => props.navigation.navigate("Calculator" ,item.current_price)}></Button>
          
          </View>
          )
          : null
  }
  

        
</View>
    

  )
}


const Calculator = (props: any) => {
  const current_price = props.route.params
  const [amount, setAmount] = useState('')
  const [time, setTime] = useState('')
  const [percentage, setPercentage] = useState('')
  const [interest, setInterest] = useState('')
  const [result, setResult] = useState(0)

  const fruit=()=>{
    let a = parseFloat(amount)
    let t = parseFloat(time)
    let p = parseFloat(percentage)
    let re = a * t * p / 100
    let ress = 0.1 * re
    let resi = a + ress
    console.warn(resi)
    setResult(resi)
    }
  

  return (
    <View>
      <TextInput placeholder="Amount" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,
        backgroundColor:'red'
      }}
        value={amount}
        onChangeText={(text) => setAmount(text)} />

      <TextInput placeholder="Time" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,
        backgroundColor:'red'
      }}
        value={time}
        onChangeText={(text) => setTime(text)} />

      <TextInput placeholder="percentage" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,
        backgroundColor:'red'
      }}
        value={percentage}
        onChangeText={(text) => setPercentage(text)} />


      <TextInput placeholder="interest" style={{
        borderColor: "red",
        borderWidth: 1,
        margin: 15,
        fontSize: 20,
        backgroundColor:'red'
      }}
        value={interest}
        onChangeText={(text) => setInterest(text)} />

      <Text style={{color:'black',margin:20}}>Currency value:{current_price}</Text>
      <Text style={{color:'black',margin:20}}>Result:{result}</Text>


      <Text style={{color:'black'}}>Convert amount result:{current_price*42985}</Text>

      <Button title='result' onPress={fruit} />
     
    </View>

  )
};




const styles = StyleSheet.create({
  main: {
    fontSize: 20,
  },
  container: {
    flex: 1
  },
  dataWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'orange',
    margin: 5,
    padding: 8
  }
  

});




export default App;
