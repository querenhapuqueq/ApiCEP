import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Keyboard } from 'react-native';
import api from './src/servicos/api';

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser ] = useState(null);

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar(){
    if(cep == ''){
      alert("Digite o CEP!");
      setCep('');
      return;
    }
    try{
      const response = await api.get(`/ws/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();
    }
    catch(error){
      console.log('ERROR: '+ error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center' }}>  
        <Text style={styles.texto}>Digite seu CEP</Text>
        <TextInput
          style={styles.input}
          placeholder='ex: 50000'
          value={String(cep)}
          onChange={(evento) => setCep(evento.nativeEvent.text)} 
          keyboardAppearance='dark'
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>
      
      <View style ={styles.areaBnt}> 
        <TouchableOpacity style = {[styles.botao, {backgroundColor: '#f00000'}]}
        onPress={buscar}
        >

          <Text style = {styles.botaoText}>Buscar</Text>

        </TouchableOpacity>

        <TouchableOpacity style ={[styles.botao, {backgroundColor: '#1d75cd'}]}
        onPress={limpar}
        >

          <Text style = {styles.botaoText}>Limpar</Text>

        </TouchableOpacity>
      </View>

        { cepUser &&
            <View style= {styles.resultado}>
              <Text style= {styles.itemText}> CEP: {cepUser.cep} </Text>
              <Text style= {styles.itemText}> Logradouro: {cepUser.logradouro} </Text>
              <Text style= {styles.itemText}> Bairro: {cepUser.bairro} </Text>
              <Text style= {styles.itemText}> Cidade: {cepUser.localidade} </Text>
              <Text style= {styles.itemText}> Estado: {cepUser.uf} </Text>
            </View>
        }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texto: {
    textAlign: 'center',
    fontSize: 50,
    marginTop: 23,
    marginBottom: 20,  
    fontWeight: "bold",
  },
  input: {
    width: '90%',
    height: 60,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#ddd",
    borderColor: "#ddd",
    paddingHorizontal: 15,
    fontSize: 50,
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f00000'
  },
  botaoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  areaBnt: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
});

