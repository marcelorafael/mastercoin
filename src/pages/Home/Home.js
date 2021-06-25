import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import firebase from '../../services/firebase/firebaseConnection'
import {
  Background,
  Container,
  Name,
  Saldo,
  Title,
  List,
} from './Home.styles';
import { Header } from '../../components/Header/Header';
import { HistoricoList } from '../../components/HistoricoList/HistoricoList'
import { AuthContext } from '../../contexts/auth';

const Home = () => {

  const { user } = useContext(AuthContext)
  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)

  const uid = user && user.uid

  useEffect(()=>{
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo)
      });

      await firebase.database().ref('historico').child(uid).orderByChild('date')
            .equalTo(format(new Date, 'dd/MM/yy'))
            .limitToLast(10).on('value', (snapshot) => {
              setHistorico([]);
              snapshot.forEach((childItem) => {
                let list = {
                  key: childItem.key,
                  tipo: childItem.val().tipo,
                  valor: childItem.val().valor
                };

                setHistorico(odlList => [...odlList, list].reverse())
              })
            })
    }
    loadList();
  },[saldo])

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.nome}</Name>
        <Saldo>R$ = {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <HistoricoList data={item} />
        )}
      />
    </Background>
  );
}

const HomeMemo = React.memo(Home);
export { HomeMemo as Home }