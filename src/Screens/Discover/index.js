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




const Discover = ({ navigation }) => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.17:8000/match/getAllematchByNameTeam');
                // Ensure each match has a valid _id property
                const matchesData = response.data.map(match => ({ ...match, _id: match._id || Math.random().toString() }));
                setMatches(matchesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.17:8000/team');
                // Ensure each team has a valid id property
                const teamsData = response.data.map(team => ({ ...team, id: team.id || Math.random().toString() }));
                setTeams(teamsData);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchData();
    }, []);
        

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://192.168.1.17:8000/news');
                    setNews(response.data);
                } catch (error) {
                    console.error('Error fetching news data:', error);
                }
            };

            fetchData();
        }, []);
    const _renderTeamsItem = ({item, index}) => {
        return (
            <TeamItemBox 
                style={{
                    marginLeft: index === 0 ? 16 : 0,
                    marginRight: index === teams.length - 1 ? 0 : 10,
                }}
            >
                <BigTeamLogo source={item.TeamLogo ? { uri: item.TeamLogo } : require('../../../assets/images/Team1.png')}/>
            </TeamItemBox>
        )
    }
    

    const renderMatchesItem = ({ item, index }) => {
        if (item.matchstatus !== "Starting Soon") {
            return null; 
        }
    
        // Format the date and starting time using moment.js
        const formattedDateTime = moment(`${item.date} ${item.startingtime}`).format('MMMM Do YYYY, h:mm a');
    
        return (
            <MatchItemBox
                style={{
                    marginLeft: index === 0 ? 16 : 0,
                    marginRight: index === matches.length - 1 ? 0 : 10,
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 6,
                        backgroundColor: 'white',
                        borderRadius: 30,
                    }}
                >
                    <McText bold size={9} color="#2648D1">{item.location}</McText>
                </View>
                <View style={{
                    width: 90,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 9,
                }}>
                    {item.team1.TeamLogo && (
                        <MediumTeamLogo
                            source={{ uri: item.team1.TeamLogo }}
                            style={{ resizeMode: 'cover' }}
                        />
                    )}
                    {item.team2.TeamLogo && (
                        <MediumTeamLogo
                            source={{ uri: item.team2.TeamLogo }}
                            style={{ resizeMode: 'cover' }}
                        />
                    )}
                </View>
                <McText bold size={10} style={{ marginTop: 9 }}>{item.team1.TeamName}</McText>
                <McText bold size={8}>Vs</McText>
                <McText bold size={10}>{item.team2.TeamName}</McText>
                <McText bold size={10} style={{ marginLeft: 5 , backgroundColor: 'white',color:"#2648D1"}}>{formattedDateTime}</McText>
            </MatchItemBox>
        );
    };
    const renderMatchesScoreItem = ({ item, index }) => {
        if (item.matchstatus !== "Finished") {
            return null; 
        }
    
        const team1Goals = item.goal1.filter(Boolean).length; 
        const team2Goals = item.goal2.filter(Boolean).length; 
    
        return (
            <MatchItemBox
                style={{
                    marginLeft: index === 0 ? 16 : 0,
                    marginRight: index === matches.length - 1 ? 0 : 10,
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 6,
                        backgroundColor: 'white',
                        borderRadius: 30,
                    }}
                >
                    <McText bold size={9} color="#2648D1">{item.location}</McText>
                </View>
                <View style={{
                    width: 90,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 9,
                }}>
                    {item.team1.TeamLogo && (
                        <MediumTeamLogo
                            source={{ uri: item.team1.TeamLogo }}
                            style={{ resizeMode: 'cover' }}
                        />
                    )}
                    {item.team2.TeamLogo && (
                        <MediumTeamLogo
                            source={{ uri: item.team2.TeamLogo }}
                            style={{ resizeMode: 'cover' }}
                        />
                    )}
                </View>
                <McText bold size={10} style={{ marginTop: 9 }}>{item.team1.TeamName}</McText>
                <McText bold size={8}>Vs</McText>
                <McText bold size={10}>{item.team2.TeamName}</McText>
                <McText bold size={10} style={{ marginLeft: 5 , backgroundColor: 'white',color:"#2648D1"}}>{team1Goals} : {team2Goals}</McText>
            </MatchItemBox>
        );
    };
    
    

    const renderNewsItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('ArticleDetail', {
                    selectedArticle: {
                        title: item.newsTitle,
                        detail: item.article,
                        author: {
                            name: item.author,
                            avatar: item.avatar ? { uri: item.avatar } : require('../../../assets/images/Avatar1.png')
                        },
                        date: item.date,
                        thumbnail: item.image ? { uri: item.image } : require('../../../assets/images/News1.png')
                    }
                });
            }}
            style={{
                width: 319,
                height: 93,
                marginTop: 15,
                marginLeft: index === 0 ? 16 : 0,
                marginRight: index === news.length - 1 ? 0 : 10,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <McImage
                    source={item.image ? { uri: item.image } : require('../../../assets/images/News1.png')}
                    style={{
                        width: 120,
                        height: 93,
                        borderRadius: 10,
                        marginRight: 10
                    }}
                />
                <View style={{ width: 189, justifyContent: 'space-between' }}>
                    <McText medium size={14} numberOfLines={2}>{item.newsTitle}</McText>
                    <View style={{ flexDirection: 'column' }}>
                        <McText regular size={12}>{item.author}</McText>
                        <McText regular size={11} color="#808191">
                            {moment(item.date).fromNow() } 
                        </McText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
                        , marginRight: 4
                    }}>LinkUpTournament :Football Tournament Management System</McText>
                    <McText size={12} style={{ fontFamily: 'Inter-Regular' }}>
                        First Edition
                    </McText>
                </View>
            </LinearGradient>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <McImage source={require('Assets/images/soccerteam.png')} style={{width: 250, height: 300, marginTop: -20, marginRight: -5}}/>
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
            keyExtractor={(item) => '_team' + item.id} // Assuming `id` is the unique identifier
            horizontal
            showsHorizontalScrollIndicator={false}
            data={teams}
            renderItem={_renderTeamsItem}
        />


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


        {/*  Matches Score Section */}
        <Header2Section>
            <McText semi size={18}>
                Matches Score
            </McText>
            <McText semi size={9} color='#A0A3BD'>
                View All
            </McText>
        </Header2Section>
        <View>
        <FlatList
            keyExtractor={(item) => '_match' + item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            data={matches}
            renderItem={renderMatchesScoreItem}
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
                        keyExtractor={(item) => '_news' + item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{}}
                        data={news}
                        renderItem={renderNewsItem}
                    />
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