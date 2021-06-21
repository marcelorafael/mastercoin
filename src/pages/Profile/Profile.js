import React, { useContext } from 'react'
import {
  Container,
  Name,
  NewLink,
  NewText,
  LogOut,
  LogOutText
} from './Profile.styles'

import { AuthContext } from '../../contexts/auth'

const Profile = () => {
  const { user, signOut } = useContext(AuthContext)
  return (
    <Container>
      <Name>Profile</Name>
      <NewLink>
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