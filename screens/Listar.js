import React ,{useState, useEffect} from 'react'
import {ActivityIndicator, SafeAreaView, View, FlatList, MeuEstiloheet, Text, StatusBar } from 'react-native';
import { auth,firestore } from '../firebase'
import MeuEstilo from '../meuestilo';

const Listar = () => {
  const [loading, setLoading] = useState(true); 
  const [endereco, setEndereco] = useState([]);

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
        setEndereco(endereco);
        setLoading(false);
      });
    
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

const Item = ({ endereco }) => (
  <View style={MeuEstilo.item}>
    <Text style={MeuEstilo.title}>{endereco}</Text>
  </View>
);

 

  const renderItem = ({ item }) => <Item endereco={item.endereco} />;


  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList 
      data={endereco} 
      renderItem={renderItem} 
      keyExtractor={item => item.endereco} 

      />
    </SafeAreaView>
  );
};


export default Listar;
