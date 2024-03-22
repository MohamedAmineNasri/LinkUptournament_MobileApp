import React from "react";
import { Text, View } from 'react-native'
import { Colors, Fonts, Images } from "Constants";
import styled from "styled-components/native";
import {McText, McImage} from 'Components';
const Discover = ( {
    params,
}) => (
    <Container>
        <McText size={24}>Discover Screenn</McText>
    </Container>
)


const Container = styled.SafeAreaView`
    flex: 1;
    background: ${(props) => Colors.background}
    justify-content: center;
    align-items: center
` 
export default Discover