import React, {useState} from 'react'
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {Header} from '../../components/Header/Header'
import Picker from '../../components/Picker'
import {
  Background,
  Input,
  SubmitButton,
  SubmitText,
 } from './New.styles'

const New = () => {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <Background>
      <Header />

      <SafeAreaView style={{alignItems:'center'}}>
        <Input 
          placeholder="Valor"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={valor}
          onChange={(text) => setValor(text)}
        />

        <Picker onChange={setTipo()} tipo={tipo} />

        <SubmitButton>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>
      </SafeAreaView>
    </Background>
    </TouchableWithoutFeedback>
  )
}

const NewMemo = React.memo(New)
export { NewMemo as New }