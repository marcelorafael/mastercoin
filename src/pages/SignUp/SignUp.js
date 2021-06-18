import React, {useState, useContext, useEffect} from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText} from '../SignIn/SignIn.styles';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(true);
  const { signUp, signed } = useContext(AuthContext);

  function handleSignUp() {
    signUp(email, password, nome)
    setIndicator(false)
  }
  useEffect(() => {
    async function indicatorChange() {
      if(signed) {
        setIndicator(true)
      }
    }
    indicatorChange()
  },[signed])
 return (
   <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >

        <AreaInput>
          <Input
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          value={nome}
          onChangeText={ (text) => setNome(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (text) => setPassword(text) }
          secureTextEntry={true}
          />
        </AreaInput>

      <SubmitButton onPress={handleSignUp}>
        {indicator && (<SubmitText>Cadastrar</SubmitText>)}
        {indicator === false &&(<ActivityIndicator color="#FFF" size={20} />)}
      </SubmitButton>

      </Container>
   </Background>
  );
}