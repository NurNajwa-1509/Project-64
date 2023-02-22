import { StatusBar } from 'expo-status-bar';
import React, {Component} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Header} from "react-native-elements";
import dictionary from './database';

export default function App() {
  return (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
      Word:{""}
    </Text>
    <Text style={{fontSize:18}}>
      {this.state.word}
    </Text>
  
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
      Type:{""}
    </Text>
    <Text style={{fontSize:18}}>
      {this.state.lexicalCategory}
    </Text>
  </View>

  <View style={{flexDirection:"row",flexWrap:"wrap"}}>
    <Text style={styles.detailsTitle}>
      Definition:{" "}
    </Text>
    <Text style={{fontSize:18}}>
      {this.state.definition}
    </Text>
  </View>
      

      <TextInput
    style={styles.inputBox}
    onChangeText={text => {
      this.setState({
        text: text,
        isSearchPressed: false,
        word: "Loading...",
        lexicalCategory: '',
        examples : [],
        defination: ""
      });
    }}
    value={this.state.text}
    />

    <TouchableOpacity
    style={styles.searchButton}
    onPress={() => {
      this.setState({ isSearchPressed: true });
      this.getWord(this.state.text)
    }}>
    </TouchableOpacity>
    </View>
  );

  getWord=(word)=>{
    var searchKeyword=word.tolowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject)
      {
        var wordData = responseObject.definition[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype

        this.setState({
          "word": this.state.text,
          "definition" :definition,
          "lexicalCategory": lexicalCategory

        })
      }
      else
      {
        this.setState({
          "word":this.state.text,
          "definition": "Not Found",
        })
      }
    })
  }

  getWord=(text)=>{

    var text = tolowerCase()
    try
    {
        var word = dictionary[text]["word"]
        var lexicalCategory = dictionary[text]["lexicalCategory"]
        var definition = dictionary[text]["definition"]
        this.setState({
           "word" : word,
           "lexicalCategory" : lexicalCategory,
           "definition" : definition
        })
    }
    catch(err){
      alert("sorry This word is not available for now")
      this.setState({
        "text":"",
        "isSearchPressed": false
      })
    }
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxContainer:{
    flex:0.3,
    alignItems:"center",
    justifyContent:"center"
  },
  inputBox:{
    width:"80%",
    alignSelf:"center",
    height:40,
  }
});
