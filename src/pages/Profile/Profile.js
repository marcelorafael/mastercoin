import React, { useContext } from 'react'
import {
  Container,
  Name,
  NewLink,
  NewText,
  LogOut,
  LogOutText
} from './Profile.styles'
import { Header } from '../../components/Header/Header'

import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

const Profile = () => {
  const navigation = useNavigation()
  const { user, signOut } = useContext(AuthContext)
  return (
    <Container>
      <Header />
      <Name>
        {user && user.nome}
      </Name>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar gastos.</NewText>
      </NewLink>

      <LogOut onPress={() => signOut()}>
        <LogOutText>Sair</LogOutText>
      </LogOut>
    </Container>
  )
}

const ProfileMemo = React.memo(Profile)
export { ProfileMemo as Profile }