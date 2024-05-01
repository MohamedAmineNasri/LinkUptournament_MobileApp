import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import MaskedView from '@react-native-community/masked-view';

import { Fonts, Images, Metrics, Colors } from 'Constants';
import { McText, McImage } from 'Components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MatchDetails = ({ navigation, route }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    let { selectedMatch } = route.params;
    setSelectedMatch(selectedMatch);
  }, []);

  return (
    <Container>
    {selectedMatch && (
      <View style={{ flex: 1 }}>
        {/* Header image and buttons */}
        <HeaderImage>
          <TeamLogo source={{ uri: selectedMatch.team1.TeamLogo }} />
          <TeamLogo source={{ uri: selectedMatch.team2.TeamLogo }} />
        </HeaderImage>
        <HeaderButtonSection>
  <TouchableOpacity
    onPress={() => {
      navigation.goBack();
    }}
  >
    <McImage source={Images.Back} />
  </TouchableOpacity>
  <ShareCircle>
    <McImage source={Images.Share} />
  </ShareCircle>
</HeaderButtonSection>
{/* Remove the extra space by setting marginBottom to 0 */}
<ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, marginBottom: 0 }}>
  {/* Match location */}
  <McText size={14} color="#EAEBFF">
    <McText bold>Match location:</McText> {selectedMatch.location}
  </McText>
  {/* Team names */}
  <McText size={16} style={{ marginTop: 10 }}><McText bold> Teams :</McText> {selectedMatch.team1.TeamName} Vs {selectedMatch.team2.TeamName}</McText>
  {/* Date and time */}
  <McText size={16} style={{ marginTop: 10 }}><McText bold>Match Date :</McText>{moment(`${selectedMatch.date} ${selectedMatch.startingtime}`).format('MMMM Do YYYY, h:mm a')}</McText>
  {/* Additional details */}
  {selectedMatch.price && (
    <AdditionalDetail>
      <McText size={14} color="#EAEBFF"><McText bold>Ticket Price: </McText>{selectedMatch.price}</McText>
    </AdditionalDetail>
  )}
  {selectedMatch.referee && (
    <AdditionalDetail>
      <McText size={14} color="#EAEBFF"><McText bold>Referee: </McText>{selectedMatch.referee}</McText>
    </AdditionalDetail>
  )}
  {selectedMatch.matchtype && (
    <AdditionalDetail>
      <McText size={14} color="#EAEBFF"><McText bold>Match Type: </McText>{selectedMatch.matchtype}</McText>
    </AdditionalDetail>
  )}
</ScrollView>

        {/* Bottom button section */}
        <BottomButton onPress={() => {}}>
          <View style={{ flexDirection: 'row' }}>
            <McText size={18} style={{ fontFamily: 'Inter-SemiBold' }}>Read More</McText>
            <McImage source={Images.Down} style={{ marginLeft: 8 }} />
          </View>
        </BottomButton>
      </View>
    )}
  </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${Colors.background};
`;

const HeaderImage = styled.View`
  width: 100%;
  height: 342px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const TeamLogo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

const HeaderButtonSection = styled.View`
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
`;

const ShareCircle = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${Colors.blue};
  justify-content: center;
  align-items: center;
`;

const TitleSection = styled.View`
  margin: 0px 16px 16px;
`;

const AuthorSection = styled.View`
  height: 38px;
  margin: 0px 16px 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const AdditionalDetail = styled.View`
  margin-top: 10px;
`;

const BottomButton = styled.TouchableOpacity`
  width: 262px;
  height: 56px;
  border-radius: 27.5px;
  background-color: ${Colors.blue};
  margin: 0px 56px;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
`;

export default MatchDetails;
