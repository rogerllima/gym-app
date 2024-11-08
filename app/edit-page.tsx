import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Alert, Image, Dimensions, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '@/components/navigation/BackButton';

interface Client {
    id: string;
    name: string;
    birthDate: string;
    height: string;
    weight: string;
    phone: string;
}

const EditClientForm = () => {
    const navigate = useRouter();
    const [client, setClient] = useState<Client>({} as Client);

    useEffect(() => {
        const loadClientData = async () => {
            try {
                const storedClient = await AsyncStorage.getItem('selectedClient');
                const client: Client = storedClient ? JSON.parse(storedClient) : {} as Client;
                setClient(client);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do cliente.');
            }
        };

        loadClientData();
    }, []);

    // Função de validação de campos obrigatórios
    const validateFields = (): boolean => {
        if (!client.name || !client.birthDate || !client.height || !client.weight || !client.phone) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return false;
        }
        return true;
    };

    const saveClient = async (updatedClient: Client) => {
        if (!validateFields()) return;

        try {
            const storedClients = await AsyncStorage.getItem('clients');
            const clients: Client[] = storedClients ? JSON.parse(storedClients) : [];

            const updatedClients = clients.map((client) =>
                client.id === updatedClient.id ? updatedClient : client
            );

            await AsyncStorage.setItem('clients', JSON.stringify(updatedClients));

            Alert.alert('Cliente Atualizado', `Nome: ${updatedClient.name}\nNascimento: ${updatedClient.birthDate}\nAltura: ${updatedClient.height}\nPeso: ${updatedClient.weight}\nTelefone: ${updatedClient.phone}`);

            navigate.navigate('/list-page');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados do cliente.');
        }
    };

    return (
        <LinearGradient colors={['black', 'gray']} style={styles.container}>
            <Image source={require('@/assets/images/tipos-de-academia-1.jpeg')} style={styles.headerImage} />
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
                            <ThemedText type="title" style={styles.titleText}>
                                Editar Cliente
                            </ThemedText>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={client.name}
                            onChangeText={(text) => setClient({ ...client, name: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Data de Nascimento (DD/MM/AAAA)"
                            value={client.birthDate}
                            onChangeText={(text) => setClient({ ...client, birthDate: text.replace(/[^0-9]/g, '') })}
                            maxLength={10}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Altura (em cm)"
                            value={client.height}
                            onChangeText={(text) => setClient({ ...client, height: text.replace(/[^0-9]/g, '') })}
                            keyboardType="numeric"
                            maxLength={3}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Peso (em kg)"
                            value={client.weight}
                            onChangeText={(text) => setClient({ ...client, weight: text.replace(/[^0-9.]/g, '') })}
                            maxLength={5}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            value={client.phone}
                            onChangeText={(text) => setClient({ ...client, phone: text.replace(/[^0-9]/g, '') })}
                            maxLength={15}
                            keyboardType="phone-pad"
                        />

                        <TouchableOpacity style={styles.button} onPress={() => saveClient(client)}>
                            <ThemedText style={styles.buttonText}>Salvar Alterações</ThemedText>
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
        alignItems: 'center',
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

export default EditClientForm;
