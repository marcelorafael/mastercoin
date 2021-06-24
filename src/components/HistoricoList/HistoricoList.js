import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { 
  Container,
  Tipo,
  TipoText,
  IconView,
  ValorText,
} from './HistoricoList.styles'

const HistoricoList = ({data}) => {
  return (
    <Container>
      <Tipo>
        <IconView tipo={data.tipo}>
          <Icon 
            name={data.tipo === 'despesa' ? "trending-down" : "trending-up"} 
            color="#FFF" 
            size={15}
          />
          <TipoText>{data.tipo}</TipoText>
        </IconView>
      </Tipo>
      <ValorText> R$ = {data.valor} </ValorText>
    </Container>
  )
}

const HistoricoListMemo = React.memo(HistoricoList)
export { HistoricoListMemo as HistoricoList }