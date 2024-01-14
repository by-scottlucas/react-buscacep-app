import React, { useRef, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import api from "./src/services/api";

export default function App() {
    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    function formataCep(value) {
        // Remove caracteres não numéricos
        const formatCep = value.replace(/\D/g, '');

        // Adiciona a máscara ao CEP
        return formatCep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    function handleInputChange(value) {
        const mascaraCep = formataCep(value);
        setCep(mascaraCep);
    }

    async function handleSearch() {
        if (cep === '') {
            alert('Digite um CEP válido');
            setCep('');
            return;
        }

        try {
            const response = await api.get(`/${cep}/json`);
            console.log(response.data);

            if (response.data !== false) {
                setCepUser(response.data);
                Keyboard.dismiss();
            } else {
                alert('CEP não encontrado ou inexistente.');
                setCep('');
            }


        } catch (error) {
            alert('ERROR: ' + error);
        }
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.cepBox}>

                <Image source={require('./src/assets/logo.png')} style={styles.logo} />

                <TextInput style={styles.input} placeholder='Digite o CEP...' value={cep} onChangeText={handleInputChange} keyboardType="numeric" ref={inputRef} />

            </View>

            <View style={styles.areaBtn}>

                <TouchableOpacity style={styles.botao} onPress={handleSearch}>
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>

            </View>

            {
                cepUser && (

                    <View style={styles.resultado}>

                        <View>

                            <Text style={{ fontSize: 40, fontWeight: "bold", color: '#ff0000', marginBottom: 10 }}>
                                {cepUser.cep}
                            </Text>

                            <View style={styles.item}>
                                <Text style={styles.label}>Logradouro</Text>
                                <Text style={styles.itemText}>{cepUser.logradouro}</Text>
                            </View>

                            <View style={styles.item}>
                                <Text style={styles.label}>Bairro</Text>
                                <Text style={styles.itemText}>{cepUser.bairro}</Text>
                            </View>

                            <View style={styles.item}>
                                <Text style={styles.label}>Localidade/UF</Text>
                                <Text style={styles.itemText}>{cepUser.localidade}/{cepUser.uf}</Text>
                            </View>

                            {cepUser.complemento && (
                                <View style={styles.item}>
                                    <Text style={styles.label}>Complemento</Text>
                                    <Text style={[styles.itemText, { textTransform: 'capitalize' }]}>{cepUser.complemento}</Text>
                                </View>
                            )}


                        </View>

                    </View>
                )}

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'

    },
    logo: {
        width: 290,
        height: 51,
        marginBottom: 20
    },
    cepBox: {
        alignItems: 'center'
    },
    input: {
        color: '#000',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        width: '85%',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#fff'
    },
    areaBtn: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botao: {
        width: '84%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ff0000'
    },
    botaoText: {
        color: '#fff',
        fontSize: 18
    },
    resultado: {
        margin: 32,
        padding: 25,
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    label: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemText: {
        color: '#000',
        fontSize: 20,
        marginBottom: 10
    }
});
