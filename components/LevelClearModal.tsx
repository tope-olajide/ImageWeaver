import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";

import LottieView from "lottie-react-native";



import { Letter } from "../types";
import  images  from "../assets/images";

interface LevelClearModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  outputLetters: Letter[];
  loadNextLevel(): void;
}

const LevelClearModal: React.FC<LevelClearModalProps> = ({
  modalVisible,
  setModalVisible,
  outputLetters,
  loadNextLevel,

}) => {
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (loadNextLevel) {
      loadNextLevel();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: -130,
              }}
            >
              <LottieView
                source={require("../assets/animations/Animation-1717670634717.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              ></LottieView>
            </View>
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 150,
              }}
            >
              <LottieView
                source={require("../assets/animations/Animation-1717670634717.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              ></LottieView>
            </View>
            <View>
              <Text
                style={{
                  color: "yellow",
                  fontSize: 30,
                  textShadowColor: "rgba(255, 215, 0, 0.75)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 15,
                  fontWeight: "bold",
                  margin: 0,
                  marginTop: 20,
                  backgroundColor: 'transparent',
                  zIndex: 2,
                  position: 'absolute'
                }}
              >
                Excellent!
              </Text>
              <View
                style={{
                  width: 180,
                  height: 180,
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  marginTop: 70,
                  zIndex: 4
                }}
              >
                <LottieView
                  source={require("../assets/animations/coins-3.json")}
                  autoPlay
                  loop={true}
                  style={{ width: "100%", height: "100%" }}
                />

                <Text
                  style={{
                    color: "yellow",
                    fontWeight: "bold",
                    fontSize: 35,
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 15,
                    marginTop: -60,
                    textShadowColor: "rgba(255, 0, 0, 1)",
                  }}
                >
                  +{outputLetters.length * 100}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.outputBox}>
                {outputLetters.map((item, index) => (
                  <View key={index} style={styles.outputButton}>
                    <ImageBackground
                      source={images.button2}
                      resizeMode="cover"
                      style={styles.outputBackgroundImage}
                    >
                      <Text style={styles.buttonText}>{item.letter}</Text>
                    </ImageBackground>
                  </View>
                ))}
              </View>
              <View style={{ width: 400, height: 400, position: "absolute" }}>
                <LottieView
                  source={require("../assets/animations/Animation - 1717673631627.json")}
                  autoPlay
                  loop={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <ImageBackground
                source={images.button2}
                resizeMode="stretch"
                style={[styles.button, { opacity: 0.8 }]}
              >
                <Text style={styles.textStyle}>{"Next"}</Text>
                
              </ImageBackground>
            </Pressable>
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
    backgroundColor: "rgba(0,0,25,0.97)",
    alignItems: "center",
    width: "100%",
    height: "100%",
    elevation: 5,
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  button: {
    width: 150,
    height: 60,
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
    fontSize: 25,
    opacity: 1,
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
    fontSize: 23,
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
});

export default LevelClearModal;
