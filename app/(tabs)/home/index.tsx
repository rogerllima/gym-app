import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
// Tipagem para a navegação

const HomeScreen: React.FC = () => {

  const navigate = useRouter();
  // Função para navegar para a tela de criação de cliente
  // const handleCreateClient = () => {
  //   navigate.navigate('/(tabs)/home/create');
  // };

  // Funções para os outros botões
  const handleUpdateClient = () => {
    console.log('Atualizar Cliente');
  };

  const handleListClients = () => {
    console.log('Listar Clientes');
  };

  const handleDeleteClient = () => {
    console.log('Excluir Cliente');
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo!</ThemedText>
      </ThemedView>

      {/* Botões de navegação */}
      <ThemedView style={styles.buttonContainer}>
        {/* Botão Criar Cliente */}
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <ThemedText style={styles.buttonText}>Criar Cliente</ThemedText>
        </TouchableOpacity>

        {/* Botão Atualizar Cliente */}
        <TouchableOpacity style={styles.button} onPress={handleUpdateClient}>
          <ThemedText style={styles.buttonText}>Atualizar Cliente</ThemedText>
        </TouchableOpacity>

        {/* Botão Listar Todos os Clientes */}
        <TouchableOpacity style={styles.button} onPress={handleListClients}>
          <ThemedText style={styles.buttonText}>Listar Clientes</ThemedText>
        </TouchableOpacity>

        {/* Botão Excluir Cliente */}
        <TouchableOpacity style={styles.button} onPress={handleDeleteClient}>
          <ThemedText style={styles.buttonText}>Excluir Cliente</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;