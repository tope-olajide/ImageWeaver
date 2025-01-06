import React, { useState } from "react";

import { View, Pressable, ImageBackground, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import images from "@/assets/images";
import { FontAwesome6 } from "@expo/vector-icons";
import { connectToSignalR, disconnectSignalR, onSignalREvent, userJoinedTournament } from "@/app/config/signalRService";
import * as Clipboard from 'expo-clipboard';
import { Tournament } from "@/types";
import MainTournament from "../MainTournament";

const tournamentSample: Tournament = {
  name: "",
  creatorId: "",
  players: [
    {
      userId: "",
      level: 0,
      username: "",
      coinsPerLevel: [{ level: 0, coins: 0 }],
      name: ""
    },
    
  ],
  numberOfPlayers: 0,
  status: "running",
  startDate: Date.now(),
  tournamentQuestIndexes: [1, 2, 3, 4, 5],
  winnerId: ""
};

const negotiateUrl = "http://localhost:7071/api/negotiate";  // URL to negotiate the SignalR connection 
const JoinedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [isPlayersComplete, setIsPlayersComplete] = useState(false);


  const [createdTournament, setCreatedTournament] = useState<Tournament>(tournamentSample);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(6);
  const [players, setPlayers] = useState([]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(createdTournament.name);
    alert('Copied to clipboard!');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTournament = await AsyncStorage.getItem('createdTournament');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedName = await AsyncStorage.getItem('name');

        if (storedTournament) setCreatedTournament(JSON.parse(storedTournament));
        if (storedUserId) setUserId(storedUserId);
        if (storedName) setName(storedName);
        const parsedTournament = JSON.parse(storedTournament!);
        console.log("storedTournament", parsedTournament.name);
        console.log("EVENT", "UserJoin" + "-" + parsedTournament.name)
        connectToSignalR(negotiateUrl)

          .then(() => {

            onSignalREvent(parsedTournament?.name, (data) => {
              // Check if the event is for the current tournament
              console.log("Player joined", data);
              setCreatedTournament(data)
            });
          })
          .catch((err) => console.error("Error initializing SignalR connection", err));
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (createdTournament.players.length === createdTournament.numberOfPlayers + 1) {
    
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
        >
          <View
            style={styles.modalView}
          >
            <MainTournament  userId={userId} tournament={createdTournament} />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <>
      <View style={{ width: "80%", height:300 }}>
        <Text style={styles.title}>Tournament Name:</Text>
        <View style={styles.tournamentNameView}>
          <Text style={styles.tournamentNameText}>
            {createdTournament?.name}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Pressable
            onPress={copyToClipboard}
            style={styles.button}
          >
            <ImageBackground
              source={images.button2}
              resizeMode="stretch"
              style={[styles.button, { opacity: 0.8, }]}
            >
              <Text style={styles.textStyle}>
                <FontAwesome6 name="copy" size={22} color="white" /> Copy
              </Text>
            </ImageBackground>
          </Pressable>

          {/* <Pressable
            style={styles.button}
            onPress={() => setTournamentState("NumberOfPlayersView")}
          >
            <ImageBackground
              source={images.button2}
              resizeMode="stretch"
              style={[styles.button, { opacity: 0.8, }]}
            >
              <Text style={styles.textStyle}>
                <FontAwesome6 name="share-from-square" size={22} color="white" /> Share
              </Text>
            </ImageBackground>
          </Pressable> */}
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            marginTop: 0,
          }}
        >
          {/*    {isTournamentOver   ?<TournamentWinnerModal tournamentCoins={tournamentCoins} />:""} */}
          {/*   {isTournamentOver && !iscurrentPlayerWinner  ?<RunnerUpsModal tournamentCoins={tournamentCoins} players={players}/>:""} */}
          <View>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 21,
                textAlign: "center",
                textShadowColor: "rgba(0, 0, 0, .5)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 15,
                fontWeight: 800,
                marginBottom: 0,
                marginRight: "auto",
                textTransform: "uppercase",
              }}
            >
              Joined Users:
            </Text>
          </View>

          <View style={{ marginBottom: 0, height: 120, marginTop: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {loading ? (
              <Text style={{ fontSize: 20, color: "#fff" }}>- Nobody</Text>
            ) : (
              createdTournament.players?.map((player: any, index: any) => (
                <><Text style={{ fontSize: 20, color: "#fff" }} key={index}>
                  - {player.userId === userId ? "You" : player.name}
                </Text>
                  
                </>
                
              ))
            )}
          </View>
          <View style={{ display: "flex", flexDirection: "row", }}>
          <Text
            style={{
              color: "rgba(200, 200, 0, 0.8)",
              fontSize: 20,
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 1)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 15,
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {isPlayersComplete
              ? "Tournament will start in " + count
              : "Waiting for others to join... "}
          </Text>
          <ActivityIndicator size={27} color="rgba(250, 250, 250, 0.8)" /></View>
          <View
            style={{
              display: "none",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Pressable style={[styles.button]}>
              <ImageBackground
                source={images.button4}
                resizeMode="stretch"
                style={[styles.button, { opacity: 0.8 }]}
              >
                <Text style={styles.textStyle}>Copy URL</Text>
              </ImageBackground>
            </Pressable>
            <Pressable style={[styles.button]}>
              <ImageBackground
                source={images.button4}
                resizeMode="stretch"
                style={[styles.button, { opacity: 0.8 }]}
              >
                <Text style={styles.textStyle}>Share</Text>
              </ImageBackground>
            </Pressable>
          </View>
          {/* <View style={{ display: "flex", flexDirection: "row", marginTop:40 }}>
                    
                                  <Pressable style={[styles.button]} onPress={onClose}>
                    <ImageBackground
                      source={images.button4}
                      resizeMode="stretch"
                      style={[styles.button, { opacity: 0.8 }]}
                    >
                                          <Text style={styles.textStyle}>Start</Text>
                                          
                                      </ImageBackground>
                                      
                                  </Pressable> 
                </View> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  joinedUserText: {
    marginBottom: 4,
    fontSize: 17,
    color: "#fff",
    fontWeight: "400",
  },
  title: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 17,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    marginTop: 10,
  },
  button: {
    width: 110,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: 15,
    marginTop: 10,
    marginHorizontal: "auto",
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
    padding: 10,
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },
  modalView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
  },
  tournamentNameView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
  },
  tournamentNameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 7,
    textAlign: "center",
  },
  imageButton: {
    opacity: 0.8,
  },
  loadingText: {
    color: "rgba(250, 250, 250, 0.8)",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    fontWeight: "700",
    marginRight: 5,
  },

});

export default JoinedUsers;
