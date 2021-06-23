import styled from 'styled-components/native';

export const Container = styled.View`
justify-content: flex-start;
align-items: flex-start;
margin-top: 5px;
margin-left: 15px;
margin-bottom: 15px;
width: 100%;
height: 50px;
`;

export const ButtonMenu = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
justify-content: center;
align-items: center;
`;