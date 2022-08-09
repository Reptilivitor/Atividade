import React, {useState, useEffect} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  MeuEstiloheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import { auth,firestore } from '../firebase'
import MeuEstilo from '../meuestilo';

const ListaComFiltro = () => {
  const [search, setSearch] = useState('');
  const [dadosFiltrados, setdadosFiltrados] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    const subscriber = firestore.collection('User').doc(auth.currentUser.uid).collection('Endereco')
      .onSnapshot(querySnapshot => {
        const endereco = [];
        querySnapshot.forEach(documentSnapshot => {
          endereco.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.endereco,
          });
        });
        setdadosFiltrados(endereco);
        setEndereco(endereco);
        setLoading(false);
      });
   
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = endereco.filter(
        function (item) {
          if (item.endereco) {
            const itemData = item.endereco.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
      });
      setdadosFiltrados(newData);
      setSearch(text);
    } else {
      setdadosFiltrados(endereco);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text
        style={MeuEstilo.item}
        onPress={() => getItem(item)}>
        {/* {item.id}
        {' - '} */}
        {item.endereco.toUpperCase()}
      </Text>
    );
  };

  const getItem = (item) => {
    
    alert('Endereço : ' + item.endereco);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={MeuEstilo.containerlistarcomfiltro}>
        <TextInput
          style={MeuEstilo.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <FlatList
          data={dadosFiltrados}
          keyExtractor={item => item.endereco}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};


export default ListaComFiltro;