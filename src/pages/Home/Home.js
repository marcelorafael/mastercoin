import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';

const Home = () => {

  const { user, signOut } = useContext(AuthContext)
  console.log(user)
  return (
    <View>
      <Text style={{color:'#000'}}>{user ? user.nome : 'None'}</Text>
      <Text style={{color:'#000'}}>{user ? user.email : 'None'}</Text>
      <Button
        title="sair"
        onPress={() => signOut()}
      />
    </View>
  );
}

const HomeMemo = React.memo(Home);
export { HomeMemo as Home }