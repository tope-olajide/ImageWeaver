import { View, StyleSheet, Text, ImageBackground, Pressable } from 'react-native';
import images from '../../assets/images';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Dispatch, SetStateAction, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import NewOrJoinView from './NewOrJoinView';
import ConfirmTournamentView from './ConfirmTournamentView';
import NumberOfPlayersView from './NumberOfPlayersView';
import { useGameContext } from '@/contexts/GameContext';
import JoinTournament from './JoinTournament';
import JoinedUsers from './JoinedUsers';

const TournamentView = () => {
  const {switchGameState} = useGameContext()
    const [tournamentState, setTournamentState] = useState("NewOrJoinTournament")
    const toast = useToast();
    function goHome() {
        router.replace('/');
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.rowTop}>
                <ImageBackground
                    source={images.tournamentBG}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-end" }}
                >
                    <View
                        style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(0,0,20,0.5)", display: 'flex', alignItems: 'center', justifyContent: "center", }}>
                        <View>
                            <Fontisto name="world-o" size={38} color="#fff" style={{}} />
                        </View>
                        <Text style={{ fontSize: 33, color: "#fff", textTransform: "uppercase", fontWeight: "600" }}>
                            Compete Online
                        </Text>
                    </View>
                </ImageBackground>

            </View>
            <View style={styles.rowBottom}>
                <ImageBackground
                    source={images.bg5}
                    blurRadius={10}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#E62E2D",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.7,
                            shadowRadius: 4,
                            elevation: 3,
                            height: 48,
                            width: "100%",
                            zIndex: 2, display: 'flex', justifyContent: 'center',
                            paddingHorizontal: 15
                        }}
                    >
                        <Pressable onPress={() => {
                            switchGameState('mainMenu') 
                        }}>
                            <FontAwesome5 name="home" size={25} color="#fff" />
                        </Pressable> 

                    </View>
                    <View
                        style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(0,1,25,0.8)", display: 'flex', alignItems: 'center', justifyContent: "center", }}>


                        {
                            tournamentState === "NewOrJoinTournament" ? <NewOrJoinView setTournamentState={setTournamentState} /> :
                                tournamentState === "NewTournament" ? <ConfirmTournamentView setTournamentState={setTournamentState} /> : 
                                tournamentState === "NumberOfPlayersView" ? <NumberOfPlayersView setTournamentState={setTournamentState} /> :
                                        tournamentState === "JoinTournament" ? <JoinTournament setTournamentState={setTournamentState} /> :
                                        tournamentState === "JoinedUsers" ? <JoinedUsers  /> :
                                null} 
                    </View>

                </ImageBackground>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: "100%"
    },
    rowTop: {
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.95
    },
    rowBottom: {

        backgroundColor: 'lightcoral',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    button: {
        width: "auto",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginBottom: 20,
        marginTop: 15,
        marginHorizontal: "auto",
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18,
        opacity: 1,
        textTransform: "capitalize",
        padding: 0,
        paddingHorizontal: 24,
    },
    otherButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
        fontFamily: "SpaceMono",
    },
});
export default TournamentView