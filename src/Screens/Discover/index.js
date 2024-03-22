import React from "react";
import { StatusBar, Text, View, FlatList } from 'react-native'
import { Colors, Fonts, Images } from "Constants";
import styled from "styled-components/native";
import {McText, McImage} from 'Components';
import {LinearGradient} from 'expo-linear-gradient'
import { dummyData } from 'Mock'

const _renderTeamsItem = ({item, index}) => {
    return (
        <TeamItemBox 
            style={{
                marginLeft: index === 0 ? 16 : 0,
                marginRight: index === dummyData.Teams.length - 1 ? 0 : 10,
            }}
        >
            <BigTeamLogo source={item.logo} />
        </TeamItemBox>
    )
}
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
        <BannerSection>
            <LinearGradient 
            colors={['#4C4478', '#0C0C69']}
            start={{x:0, y:0}}
            end={{x:1, y:0}}
            style={{
                height: 200,
                borderRadius:1,
                backgroundColor: 'green',
                justifyContent:'space-between',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}>
                <View style={{
                    width: 175,
                    margin: 20,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: 79,
                        height: 23,
                        borderRadius: 12,
                        backgroundColor: Colors.white,
                        flexDirection: 'row',
                        justifyContent:'space-around',
                        alignItems: 'center'
                    }}>
                        <McImage source={Images.Soccer}></McImage>
                        <McText size={12} color="#181829" style={{
                            fontFamily: 'Inter-SemiBold'
                        }}>Football</McText>
                    </View>
                    <McText size={17} style={{
                        fontFamily: 'Inter-SemiBold'
                    }}>Zidane and Real Madrid: When it went wrong and what's next</McText>
                    <McText size={12} style={{
                        fontFamily: 'Inter-Regular'
                    }}>Tommorw, 06.30 PM</McText>
                </View>
            </LinearGradient>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <McImage source={require('Assets/images/Zidane.png')}/>
            </View>
        </BannerSection>
        <Header2Section>
            <McText semi size={18}>
                Popular Teams
            </McText>
            <McText semi size={9} color='#A0A3BD'>
                View All
            </McText>
        </Header2Section>
        <View>
            <FlatList 
                keyExtractor={(item)=> '_team' + item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                data={dummyData.Teams}
                renderItem={_renderTeamsItem}
            ></FlatList>
        </View>
    </Container>
)


const Container = styled.SafeAreaView`
    flex: 1;
    background: ${(props) => Colors.background}

` 
const BannerSection = styled.View`
    height: 200px;
    margin: 25px 16px 0px;
    /*background: red*/
` 

const HeaderSection = styled.View`
    height: 90px;
    margin: 0px 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
` 
const Header2Section = styled.View`
    height: 40px;
    margin: 23px 16px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
` 
const TeamItemBox = styled.View`
    width: 70px;
    height: 65px;
    border-radius: 10px;
    background-color: #222232;
    align-items: center;
    margin-top: 20px;
` 
const BigTeamLogo = styled.Image`
    width: 50px;
    height: 55px;

` 
export default Discover