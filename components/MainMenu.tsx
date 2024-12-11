import images from "@/assets/images";
import { ImageBackground, View, Text, Pressable, StyleSheet } from "react-native";

import Animated, { LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
const MainMenu = () => {

  return (
    <Animated.View
    entering={LightSpeedInRight.springify()
      .damping(30)
      .mass(5)
      .stiffness(10)
      .overshootClamping(0)
      .restDisplacementThreshold(0.1)
      .restSpeedThreshold(5)} exiting={LightSpeedOutLeft.springify()
        .damping(30)
        .mass(5)
        .stiffness(10)
        .overshootClamping(0)
        .restDisplacementThreshold(0.1)
        .restSpeedThreshold(5)} 
      style={styles.container}> 
    <ImageBackground
      source={images.bg5}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
    
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>
            Image
          </Text>
          <Text style={styles.subtitleText}>
            Weaver
          </Text>
          <Text style={styles.descriptionText}>
            Create Words from Pictures
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable  style={styles.otherButton}>
              <ImageBackground
                source={images.button2}
                resizeMode="contain"
                style={styles.button3image}
              >
                <Text style={styles.otherButtonText}>Play</Text>
              </ImageBackground>
            </Pressable>
          </View>
        </View>       
      
    </ImageBackground></Animated.View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.9
  },
  container: {
    padding: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,0,0,0.95)",
  },
  contentContainer: {
    display: "flex", 
    alignItems: "center"
  },
  titleText: {
    fontSize: 55,
    textTransform: "uppercase",
    color: "rgba(255,255,255, 1)",
    fontFamily: "HungryBeast",
    textShadowColor: "blue",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    marginTop: 50
  },
  subtitleText: {
    fontSize: 70,
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: "JungleAdventurer", 
    textShadowColor: "blue",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15
  },
  descriptionText: {
    color: "yellow",
    fontFamily: "Assassin",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    fontSize: 22
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: "auto",
    marginTop: 25
  },
  buttonText: {
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff"
  },
  button3image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  otherButton: {
    margin: 5,
    borderRadius: 5,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    opacity: 0.85,
    width: "100%"
  },
  otherButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    fontFamily: "SpaceMono"
  }
});

export default MainMenu;
