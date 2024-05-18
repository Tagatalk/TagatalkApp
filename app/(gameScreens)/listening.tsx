import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import icons from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../components/ProgressBar'; 
import { Container } from '../../tamagui.config';
import ListenGame2 from '../listeningGames/listenGame2';

const Listening = () => {
    const navigation = useNavigation();
    
    const handleGoBack = () => {
        navigation.goBack();
    };
    
    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <Stack.Screen options={{headerShown: false }} />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={icons.modbackarrow} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={styles.progressBarContainer}>
                    <ProgressBar value={0} indicatorColor={'#FD9F10'}/>
                </View>              
            </View>
            <Container style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                   {/* //TODO: Map the 3 gametypes of Listening skill here */}
                   <Text>
                        Sample Content
                     </Text>
            </Container>
        </SafeAreaView>
    )
}

export default Listening

const styles = StyleSheet.create({
    backArrow: {
        resizeMode: 'cover',
        width: 34,
        height: 34,
        borderColor: 'white',
        borderWidth: 1,
      },
      headerContainer: {
        height: '5%',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
      },
      progressBarContainer: {
        marginLeft: 20,
        alignSelf: 'center',
        width: '80%',
      },
      buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        margin: 20,
      },
})