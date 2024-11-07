import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Alert, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Client = {
    id: string;
    name: string;
    birthDate: string;
    height: string;
    weight: string;
    phone: string;
};

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([])

    const navigate = useRouter();

    const listClients = async () => {
        const storedClients = await AsyncStorage.getItem('clients');
        const clients = storedClients ? JSON.parse(storedClients) : [];
        setClients(clients);
    }

    const editClient = async (client: Client) => {
        await AsyncStorage.setItem('selectedClient', JSON.stringify(client));
        navigate.navigate('/edit-page');
    }

    const removeCliente = async (id: string) => {
        const storedClients = await AsyncStorage.getItem('clients');
        const clients = storedClients ? JSON.parse(storedClients) : [];
        const newClients = clients.filter((client: Client) => client.id !== id);
        await AsyncStorage.setItem('clients', JSON.stringify(newClients));
        setClients(newClients);
    }

    useEffect(() => {
        listClients();
    }, [clients]);

    const handleDeleteClient = (id: string) => {
        Alert.alert(
            "Excluir Cliente",
            "Tem certeza que deseja excluir este cliente?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => removeCliente(id) },
            ]
        );
    };

    const renderClient = ({ item }: { item: Client }) => (
        <ThemedView style={styles.clientCard}>
            <ThemedText style={styles.clientName}>Nome: {item.name}</ThemedText>
            <ThemedText style={styles.clientName}>Data de Nascimento: {item.birthDate}</ThemedText>
            <ThemedText style={styles.clientName}>Altura: {item.height} cm</ThemedText>
            <ThemedText style={styles.clientName}>Peso: {item.weight} kg</ThemedText>
            <ThemedText style={styles.clientName}>Telefone: {item.phone}</ThemedText>

            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editClient(item)}
                >
                    <Ionicons name="settings" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteClient(item.id)}
                >
                    <Ionicons name="trash" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/tipos-de-academia-1.jpeg')}
                style={styles.headerImage}
            />
            <ThemedText style={styles.title}>Lista de Clientes</ThemedText>

            <FlatList
                data={clients}
                keyExtractor={(item) => item.id}
                renderItem={renderClient}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<ThemedText style={styles.emptyText}>Nenhum cliente cadastrado.</ThemedText>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    headerImage: {
        width: Dimensions.get('window').width,
        height: 250,
        resizeMode: 'cover',
    },
    listContent: {
        paddingBottom: 20,
    },
    clientCard: {
        flex: 1,
        gap: 5,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#c53030',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    editButton: {
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
    },
    logo: {
        height: '100%',
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});

export default ClientList;
