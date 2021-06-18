import React, {useState, useContext, useEffect} from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText, Link, LinkText} from './SignIn.styles';

export default function SignIn() {
  const navigation = useNavigation();

  const [indicator, setIndicator] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signed, signIn } = useContext(AuthContext);

  function handleLogin(){
    signIn(email, password)
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
        <Logo source={require('../../assets/Logo.png')}/>
        
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

      <SubmitButton onPress={handleLogin}>
        {indicator && (<SubmitText>Acessar</SubmitText>)}
        {indicator === false &&(<ActivityIndicator color="#FFF" size={20} />)}
      </SubmitButton>

      <Link onPress={ () => navigation.navigate('SignUp')}>
        <LinkText>Criar uma conta!</LinkText>
      </Link>

      </Container>
   </Background>
  );
}