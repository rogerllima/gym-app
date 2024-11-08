import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Alert, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '@/components/navigation/BackButton';

type Client = {
    id: string;
    name: string;
    birthDate: string;
    height: string;
    weight: string;
    phone: string;
};

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const navigate = useRouter();

    const listClients = async () => {
        const storedClients = await AsyncStorage.getItem('clients');
        const clients = storedClients ? JSON.parse(storedClients) : [];
        setClients(clients);
    };

    const editClient = async (client: Client) => {
        await AsyncStorage.setItem('selectedClient', JSON.stringify(client));
        navigate.navigate('/edit-page');
    };

    const removeClient = async (id: string) => {
        const storedClients = await AsyncStorage.getItem('clients');
        const clients = storedClients ? JSON.parse(storedClients) : [];
        const newClients = clients.filter((client: Client) => client.id !== id);
        await AsyncStorage.setItem('clients', JSON.stringify(newClients));
        setClients(newClients);
    };

    useEffect(() => {
        listClients();
    }, [clients]);

    const handleDeleteClient = (id: string) => {
        Alert.alert(
            "Excluir Cliente",
            "Tem certeza que deseja excluir este cliente?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => removeClient(id) },
            ]
        );
    };

    const renderClient = ({ item }: { item: Client }) => (
        <ThemedView style={styles.clientCard}>
            <ThemedText style={styles.clientName}>{item.name}</ThemedText>
            <ThemedText style={styles.clientInfo}>Data de Nascimento: {item.birthDate}</ThemedText>
            <ThemedText style={styles.clientInfo}>Altura: {item.height} cm</ThemedText>
            <ThemedText style={styles.clientInfo}>Peso: {item.weight} kg</ThemedText>
            <ThemedText style={styles.clientInfo}>Telefone: {item.phone}</ThemedText>

            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editClient(item)}
                >
                    <Ionicons name="settings" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteClient(item.id)}
                >
                    <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

    return (
        <LinearGradient
            colors={['#4c4c4c', '#333']}
            style={styles.container}
        >
            <Image
                source={require('@/assets/images/tipos-de-academia-1.jpeg')}
                style={styles.headerImage}
            />

            <ThemedView style={styles.card}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <BackButton />
                    </View>
                    <ThemedText type="title" style={styles.cardTitle}>Listar Clientes</ThemedText>
                </View>

                {/* FlatList dentro do card */}
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id}
                    renderItem={renderClient}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<ThemedText style={styles.emptyText}>Nenhum cliente cadastrado.</ThemedText>}
                    style={styles.flatList} // Adicionei o estilo aqui para garantir que o FlatList ocupe todo o espaço
                />
            </ThemedView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerImage: {
        width: Dimensions.get('window').width,
        height: 250,
        resizeMode: 'cover',
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
        gap: 70,
        width: '100%',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        width: '90%',
        flex: 1, // Certifique-se de que o card ocupe o espaço restante
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    listContent: {
        paddingBottom: 20,
    },
    clientCard: {
        backgroundColor: '#f9f9f9',
        padding: 18,
        marginVertical: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    clientInfo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#5bc0de',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        elevation: 3,
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        elevation: 3,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
    },
    flatList: {
        flex: 1, // Isso garante que o FlatList ocupe todo o espaço disponível
    },
});

export default ClientList;
