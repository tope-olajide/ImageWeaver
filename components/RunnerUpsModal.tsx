import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";

import LottieView from "lottie-react-native";



import CoinsEarned from "./CoinsEarned";
import { router } from 'expo-router';

import {  Tournament } from "../types";
import LeaderBoard from "./LeaderBoard";
import images from "@/assets/images";
interface LevelClearModalProps {

  tournament: Tournament
  userId: string;

}

const RunnerUpsModal: React.FC<LevelClearModalProps> = ({

  tournament,
  userId
}) => {

  const animationRef = useRef<LottieView>(null);
  const [count, setCount] = useState(4);
//  const [isHome, setIsHome] = useState(false);
  const [isLeaderBoardView, setIsLeaderBoardView] = useState(false);
  // const totalCoins = tournamentCoins.reduce((total, entry) => total + entry.coins, 0);
  const currentPlayer = tournament?.players.filter((eachPlayers) => {
    return (eachPlayers.userId === userId);
  })
  function goHome() {
    router.replace('/');
  }

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.pause
  }, []);
  useEffect(() => {
    // Or set a specific startFrame and endFrame with:
    // coinAnimationRef.current?.play();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
      if (count <= 0) {
        animationRef.current?.pause();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

            </View>
            <View
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Text
                style={{
                  color: "rgb(219, 177, 74)",
                  fontSize: 23,
                  textShadowColor: "purple",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 15,
                  fontWeight: "bold",
                  margin: 0,
                  marginTop: 60,
                  backgroundColor: "transparent",
                  zIndex: 2,
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginHorizontal: "auto",
                  marginVertical: "auto",
                }}
              >
                The tournament is over!
              </Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>You finished as a runner-up</Text>

            {isLeaderBoardView ? <View style={{ width: "90%", marginTop: 0 }}>
              <Text
                style={{
                  color: "rgb(219, 177, 74)",
                  fontSize: 22,
                  textShadowColor: "purple",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 15,
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginHorizontal: "auto",
                  marginVertical: "auto",
                  paddingBottom: 9,
                }}
              >
                Leader Board
              </Text>
              <View>
                <LeaderBoard players={tournament.players} />
              </View>
            </View> : <View
              style={{ width: "90%", marginTop: 0, alignItems: "center" }}
            >

              <CoinsEarned tournamentCoins={currentPlayer[0].coinsPerLevel} />
              {isLeaderBoardView ? "" : <Pressable
                style={[styles.button, styles.buttonClose]}
                
              >
                <ImageBackground
                  source={images.button4}
                  resizeMode="stretch"
                  style={[styles.button, { opacity: 0.8 }]}
                >
                  <Text style={styles.textStyle}>Double up </Text>
                </ImageBackground>
              </Pressable>}

            </View>}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsLeaderBoardView(!isLeaderBoardView)}
              >
                <ImageBackground
                  source={images.button4}
                  resizeMode="stretch"
                  style={[styles.button, { opacity: 0.8 }]}
                >
                  <Text style={styles.textStyle}>{isLeaderBoardView ? "Leaderboard" : "Runner-ups"}</Text>
                </ImageBackground>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                 onPress={goHome} 
              >
                <ImageBackground
                  source={images.button4}
                  resizeMode="stretch"
                  style={[styles.button, { opacity: 0.8 }]}
                >
                  <Text style={styles.textStyle}>Home</Text>
                </ImageBackground>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "rgba(5,5,5,0.97)",
    alignItems: "center",
    width: "100%",
    height: "100%",
    elevation: 5,
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  button: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: 10,
  },
  buttonClose: {},
  textStyle: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
    opacity: 1,
    textTransform: "uppercase",
    lineHeight: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  outputButton: {
    margin: 5,
    borderRadius: 0,
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "nowrap",
  },
  outputBackgroundImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
  },
  outputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    zIndex: 3,
    shadowColor: "#52006A",
    elevation: 1,
    backgroundColor: "rgba(255,256,256,0.8)",
    padding: 5,
  },

  headerCell: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 9,
  },
  row:
  {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(192,146,35)",
    textAlign: "center",

  },
  cell: {
    color: "#fff",
    fontSize: 18,
    padding: 4,
    textAlign: "center",
  },
  footerCell: {

    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 9,
  },

  footerRow: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(77,57,10)",
  }
});

export default RunnerUpsModal;
