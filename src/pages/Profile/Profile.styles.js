import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #131313;
align-items: center;
`;

export const  Name = styled.Text`
text-align: center;
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
color: #FFF;
`;

export const  NewLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
align-items: center;
justify-content: center;
background-color: #00B94A;
width: 90%;
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
`;

export const  NewText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight: bold;
`;

export const  LogOut = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
align-items: center;
justify-content: center;
background-color: #C62C36;
width: 90%;
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
`;

export const  LogOutText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight: bold;
`;