import React, { useState, useContext } from 'react'
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import { Header } from '../../components/Header/Header'
import Picker from '../../components/Picker'
import firebase from '../../services/firebase/firebaseConnection'
import { format } from 'date-fns'
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native'
import {
  Background,
  Input,
  SubmitButton,
  SubmitText,
} from './styles'

const New = () => {
  const navigation = useNavigation();
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  const { user: usuario } = useContext(AuthContext)

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos.')
      return;
    }

    Alert.alert(
      'Confirmar dados',
      `Tipo ${tipo} - Valor ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleApp()
        }
      ]
    )
  }

  const handleApp = async () => {
    setValor('')
    navigation.navigate('Home')
    let uid = usuario.uid;
    let key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy')
    })

    let user = await firebase.database().ref('historico').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
    });
    Keyboard.dismiss()
    
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={() => handleSubmit()}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>

      </Background>
    </TouchableWithoutFeedback>
  );
}

const NewMemo = React.memo(New)
export { NewMemo as New }