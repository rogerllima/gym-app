import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigate = useRouter();

  const handleCreateClient = () => {
    navigate.navigate('/create-page');
  };

  const handleListClients = () => {
    navigate.navigate('/list-page');
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
      <ThemedView style={styles.card}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>F&S Academia</ThemedText>
          <ThemedText style={styles.subtitleText}>Gerencie seus clientes com facilidade</ThemedText>
        </View>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreateClient}>
          <ThemedText style={styles.buttonText}>Criar Cliente</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.listButton]} onPress={handleListClients}>
          <ThemedText style={styles.buttonText}>Listar Clientes</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#e74c3c',
  },
  listButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
