import React, { useRef, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from "./src/services/api";

export default function App() {

    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    async function buscar() {
        if (cep == '') {
            alert('Digite um CEP válido');
            setCep('');
            return;
        }

        try {
            const response = await api.get(`/${cep}/json`);
            console.log(response.data);
            setCepUser(response.data);
            Keyboard.dismiss();

        } catch (error) {
            console.log('ERROR: ' + error);
        }
    }

    function limpar() {
        setCep('');
        setCepUser('');
        inputRef.current.focus();
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cepBox}>

                <Text style={styles.texto}>Digite o CEP desejado</Text>

                <TextInput style={styles.input} placeholder='Ex.: 00000-000' value={cep} onChangeText={(texto) => setCep(texto)} keyboardType="numeric" ref={inputRef} />

            </View>

            <View style={styles.areaBtn}>

                <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={buscar}>
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]} onPress={limpar}>
                    <Text style={styles.botaoText}>Limpar</Text>
                </TouchableOpacity>

            </View>

            {
                cepUser &&

                <View style={styles.resultado}>
                    <Text style={styles.itemText}>{cepUser.cep}</Text>
                    <Text style={styles.itemText}>{cepUser.logradouro}</Text>
                    <Text style={styles.itemText}>{cepUser.bairro}</Text>
                    <Text style={styles.itemText}>{cepUser.localidade}</Text>
                    <Text style={styles.itemText}>{cepUser.uf}</Text>
                </View>
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cepBox: {
        alignItems: 'center'
    },
    texto: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        width: '90%',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#fff'
    },
    areaBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingRight: 22,
        paddingLeft: 22
    },
    botao: {
        width: 140,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 4
    },
    botaoText: {
        color: '#fff',
        fontSize: 18
    },
    resultado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 22
    }
})