import React from 'react'
import { Container, ButtonMenu } from './Header.styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

const Header: React.FC = () => {
  const navigation = useNavigation()
  return (
    <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" color="#FFF" size={30} />
      </ButtonMenu>
    </Container>
  )
}

const HeaderMemo = React.memo(Header);
export { HeaderMemo as Header }
