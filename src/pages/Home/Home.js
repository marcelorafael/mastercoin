import React, { useContext, useState } from 'react';
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
  const [historico, setHistorico] = useState([
    { key: '1', tipo: 'receita', valor: 1200 },
    { key: '2', tipo: 'despesa', valor: 600 },
    { key: '3', tipo: 'receita', valor: 100 },
    { key: '4', tipo: 'receita', valor: 1200 },
    { key: '5', tipo: 'despesa', valor: 12 },
    { key: '6', tipo: 'despesa', valor: 150 },
  ])

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.nome}</Name>
        <Saldo>R$=123,00</Saldo>
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