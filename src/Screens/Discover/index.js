import React, { useState, useEffect } from "react";
import { StatusBar, ScrollView, View, FlatList, Image,Text } from 'react-native';
import { Colors, Fonts, Images } from "Constants";
import styled from "styled-components/native";
import {McText, McImage} from 'Components';
import {LinearGradient} from 'expo-linear-gradient'
import { dummyData } from 'Mock'
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';




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


const NewsItem = ({ item, index }) => (
    <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <McImage source={item.thumbnail} style={{
                width:120,
                height: 93,
                borderRadius: 10,
                marginRight: 10
            }}/>
            <View style={{
                width: 189,
                justifyContent: 'space-between'
            }}>
                <McText medium size={14} numberOfLines={2}>{item.title}</McText>
                <McText regular size={11} color="#808191">
                    {item.views} views - {moment(item.date).fromNow()}
                </McText>
                <McText regular size={12}>{item.author.name}</McText>
            </View>
        </View>
    </View>
)

const Discover = ({ navigation }) => {
    const [matches, setMatches] = useState([]);
  
    useEffect(() => {
        // Fetch data from your Node.js API
        const fetchData = async () => {
          try {
            const response = await axios.get('http://192.168.1.17:8000/match/getAllematchByNameTeam');
            setMatches(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []); // Empty array as second parameter ensures useEffect runs only once
      
    const _renderTeamsItem = ({ item, index }) => {
      return (
        <TeamItemBox 
            style={{
                marginLeft: index === 0 ? 16 : 0,
                marginRight: index === dummyData.Teams.length - 1 ? 0 : 10,
            }}
        >
            <BigTeamLogo source={item.logo} />
        </TeamItemBox>
      );
    };
  
    const renderMatchesItem = ({ item, index }) => {
      return (
        <View
          style={{
            marginLeft: index === 0 ? 16 : 0,
            marginRight: index === matches.length - 1 ? 0 : 10,
            backgroundColor: '#FFFFFF',
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={{ uri: item.team1.TeamLogo }} style={{ width: 50, height: 50 }} />
          <Image source={{ uri: item.team2.TeamLogo }} style={{ width: 50, height: 50 }} />
          <Text style={{ marginTop: 5, fontWeight: 'bold', fontSize: 14 }}>{item.team1.TeamName} vs {item.team2.TeamName}</Text>
          <Text style={{ fontSize: 12 }}>Match Status: {item.matchstatus}</Text>
        </View>
      );
    };
  
    const NewsItem = ({ item, index }) => (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <McImage source={item.thumbnail} style={{
              width:120,
              height: 93,
              borderRadius: 10,
              marginRight: 10
          }}/>
          <View style={{
              width: 189,
              justifyContent: 'space-between'
          }}>
              <McText medium size={14} numberOfLines={2}>{item.title}</McText>
              <McText regular size={11} color="#808191">
                  {item.views} views - {moment(item.date).fromNow()}
              </McText>
              <McText regular size={12}>{item.author.name}</McText>
          </View>
        </View>
      </View>
    );
  
    return (
        <Container>
        <ScrollView contentContainerStyle={{}} style={{}}>
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
        {/*  Matches Section */}
        <Header2Section>
            <McText semi size={18}>
                Upcoming Matches
            </McText>
            <McText semi size={9} color='#A0A3BD'>
                View All
            </McText>
        </Header2Section>
        <View>
            <FlatList
                keyExtractor={(item) => '_match' + item._id} // Assuming `_id` is the unique identifier
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                data={matches}
                renderItem={renderMatchesItem}
            ></FlatList>
        </View>
        {/* News Section */}
        <Header2Section>
            <McText semi size={18}>
                Latest News
            </McText>
            <McText semi size={9} color='#A0A3BD'>
                View All
            </McText>
        </Header2Section>
        <View>
            <FlatList 
                keyExtractor={(item)=> '_news' + item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                data={dummyData.News}
                renderItem={ ( {item, index} ) =>  (
                    <TouchableOpacity
                        onPress={
                            () => {
                                navigation.navigate('ArticleDetail', {selectedArticle: item})
                            }
                        }
                        style={{
                        width: 319,
                        height: 93,
                        marginTop: 15,
                        marginLeft: index === 0 ? 16 :0,
                        marginRight: index === dummyData.length - 1 ? 0 : 10,

                    }}>
                        <NewsItem item={item}/>
                    </TouchableOpacity>
                )}
            ></FlatList>
        </View>
        <View style={{marginTop: 20}}></View>
        </ScrollView>
    </Container>
    );
  };

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
const MatchItemBox = styled.View`
    width: 112px;
    height: 156px;
    border-radius: 10px;
    background-color: #222232;
    align-items: center;
    margin-top: 10px;
    background-color: ${(props)=> Colors.blue};
` 
const MediumTeamLogo = styled.Image`
    width: 40px;
    height: 43px;
    
` 
export default Discover