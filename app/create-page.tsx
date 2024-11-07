import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const CreateClientForm = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');

  const saveClient = async () => {
    try {
      const newClient = {
        id: uuid.v4().toString(),
        name,
        birthDate,
        height,
        weight,
        phone,
      };

      const storedClients = await AsyncStorage.getItem('clients');

      const clients = storedClients ? JSON.parse(storedClients) : [];
      clients.push(newClient);

      await AsyncStorage.setItem('clients', JSON.stringify(clients));

      Alert.alert('Cliente Criado', `Nome: ${name}\nNascimento: ${birthDate}\nAltura: ${height}\nPeso: ${weight}\nTelefone: ${phone}`);

      setName('');
      setBirthDate('');
      setHeight('');
      setWeight('');
      setPhone('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/tipos-de-academia-1.jpeg')}
        style={styles.headerImage}
      />
      <ThemedView style={styles.card}>
        <ThemedText type="title" style={styles.titleText}>Criar Cliente</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={birthDate}
          onChangeText={(text) => setBirthDate(text.replace(/[^0-9/]/g, ''))}
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (em cm)"
          value={height}
          onChangeText={(text) => setHeight(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={3}
        />

        <TextInput
          style={styles.input}
          placeholder="Peso (em kg)"
          value={weight}
          onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))}
          maxLength={5}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9()-\s]/g, ''))}
          maxLength={15}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={saveClient}>
          <ThemedText style={styles.buttonText}>Salvar Cliente</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#c53030',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateClientForm;