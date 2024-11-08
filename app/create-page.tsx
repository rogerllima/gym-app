import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Alert, Image, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import BackButton from '@/components/navigation/BackButton';

const CreateClientForm = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useRouter();

  const handleBirthDateChange = (text: string) => {
    let formatted = text.replace(/[^0-9]/g, '');

    if (formatted.length >= 2 && formatted.length <= 4) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    } else if (formatted.length > 4) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}/${formatted.slice(4, 8)}`;
    }

    setBirthDate(formatted);
  };

  const saveClient = async () => {
    // Validação dos campos obrigatórios
    if (!name || !birthDate || !height || !weight || !phone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

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

      // Limpar campos após salvar
      setName('');
      setBirthDate('');
      setHeight('');
      setWeight('');
      setPhone('');

      navigate.navigate('/list-page');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o cliente.');
    }
  };

  return (
    <LinearGradient
      colors={['black', 'gray']}
      style={styles.container}
    >
      <Image
        source={require('@/assets/images/tipos-de-academia-1.jpeg')}
        style={styles.headerImage}
      />

      <KeyboardAvoidingView
        style={{ flex: 1, height: '100%', width: '100%', marginLeft: 20 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS has a specific behavior and Android needs 'height'
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <ThemedView style={styles.card}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <BackButton />
              </View>
              <ThemedText type="title" style={styles.titleText}>Criar Cliente</ThemedText>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              keyboardType='numeric'
              value={birthDate}
              onChangeText={(text) => handleBirthDateChange(text)}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 90,
    width: '100%',
    marginBottom: 20,
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