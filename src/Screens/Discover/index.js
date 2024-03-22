import React from "react";
import { StatusBar, Text, View } from 'react-native'
import { Colors, Fonts, Images } from "Constants";
import styled from "styled-components/native";
import {McText, McImage} from 'Components';
const Discover = ( {
    params,
}) => (
    <Container>
        <StatusBar hidden={true}/>
        {/* Header Section */}
        <HeaderSection >
            <McText semi size={30} style={{lineHeight:35}}>Discover</McText>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <McImage source={Images.Search} style={{marginRight:20}}/>
                <McImage source={Images.Notification}/>
                <View style={{width:10, height:10, borderRadius:10, backgroundColor:Colors.primary, alignItems:'center', justifyContent:'center',position:'relative', top:-5, right:5}}>
                    <McText size={10} style={{fontFamily: 'SourceSansPro-Regular'}}>3</McText>
                </View>
            </View>
        </HeaderSection >
    </Container>
)


const Container = styled.SafeAreaView`
    flex: 1;
    background: ${(props) => Colors.background}

` 

const HeaderSection = styled.View`
    height: 90px;
    margin: 0px 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
` 
export default Discover