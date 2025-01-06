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



import { router } from "expo-router";

import {  Player, Tournament } from "../types";
import images from "@/assets/images";
import LeaderBoard from "./LeaderBoard";
import CoinsEarned from "./CoinsEarned";

interface LevelClearModalProps {
  tournamentCoins: any;
  players?: Player[];
  userId: string;
  tournament: Tournament
}

const TournamentWinnerModal: React.FC<LevelClearModalProps> = ({
  tournamentCoins,
  players,
  userId,
  tournament
}) => {
  const animationRef = useRef<LottieView>(null);
  const [count, setCount] = useState(4);

  const [isLeaderBoardView, setIsLeaderBoardView] = useState(false);
  function goHome() {
    router.replace('/');
  }
  const currentPlayer = tournament?.players.filter((eachPlayers) => {
    return (eachPlayers.userId === userId);
  })
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.pause
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
              <LottieView
                source={require("../assets/animations/Animation-1717670634717.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              ></LottieView>

              <LottieView
                source={require("../assets/animations/Animation-1717670634717.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              ></LottieView>
            </View>
            <View
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Text
                style={{
                  color: "rgb(219, 177, 74)",
                  fontSize: 30,
                  textShadowColor: "purple",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 15,
                  fontWeight: "bold",
                  margin: 0,
                  marginTop: 20,
                  backgroundColor: "transparent",
                  zIndex: 2,
                  position: "absolute",
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginHorizontal: "auto",
                  marginVertical: "auto",
                }}
              >
                You Win!
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 160,
              }}
            >
              <View style={{ width: 270, height: 270, position: "absolute" }}>
                <LottieView
                  source={require("../assets/animations/Winner.json")}
                  autoPlay
                  loop
                  ref={animationRef}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            <View
              style={{ width: "90%", marginTop: 120, alignItems: "center" }}
            >
              {
                isLeaderBoardView ? <LeaderBoard players={tournament.players} /> :
                  <CoinsEarned tournamentCoins={currentPlayer[0].coinsPerLevel} />
              }
              {/* {isLeaderBoardView ? "" : <Pressable
                style={[styles.button, styles.buttonClose]}

              >
                <ImageBackground
                  source={images.button4}
                  resizeMode="stretch"
                  style={[styles.button, { opacity: 0.8 }]}
                >
                  <Text style={styles.textStyle}>Double up </Text>
                </ImageBackground>
              </Pressable>} */}

            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                              width: "90%",
                marginTop:0
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
                  <Text style={styles.textStyle}>{isLeaderBoardView ? "Coins Earned" : "Runner-ups"}</Text>
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
    marginBottom: 0,
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

export default TournamentWinnerModal;
