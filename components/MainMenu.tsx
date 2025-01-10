import images from "@/assets/images";
import { ImageBackground, View, Text, Pressable, StyleSheet } from "react-native";
import { useGameContext } from "@/contexts/GameContext";
import Animated, { LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { useIsAuthenticated } from "@azure/msal-react";

import { useMsal } from "@azure/msal-react";
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectToSignalR } from "@/app/config/signalRService";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSound } from "@/contexts/SoundContext";
import HowToPlay from "./HowToPlay";

const storeIdToken = async (idToken: string) => {
  try {
    await AsyncStorage.setItem('idToken', idToken)
  } catch (e) {
    console.error(e)
  }
}
export const getIdToken = async () => {
  try {
    const value = await AsyncStorage.getItem('idToken')
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.error(e)
  }
}

const loginRequest = { scopes: ["user.read"] };

const MainMenu = () => {
  const { playButtonSound, isPlaying, toggleSound, playSwitchSound } = useSound();
  const { switchGameState } = useGameContext()
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [howToPlayModalVisible, setHowToPlayModalVisible] = useState(false);
  console.log({ isAuthenticated })
  useEffect(() => {
    // Establish the connection to SignalR
    connectToSignalR()
      .then(() => {
        console.log("connected successully")
      })
      .catch((err) => console.error("Error initializing SignalR connection", err));


  }, []);
  const handleLogin = () => {
    console.log("Login clicked")
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        // Extract user info from the authentication response
        const userId = response.account.homeAccountId; // Unique user ID
        const username = response.account.username; // User's email/username
        const name = response.account.name; // Full name (if available)
        const idToken = response.idToken; // ID token JWT string
        storeIdToken(idToken)
        console.log("Response:", response);
        console.log("User ID:", userId);
        console.log("Username:", username);
        console.log("Name:", name);
        // You can use the user ID or other details as needed
      })
      .catch((e) => {
        console.error("Login failed:", e);
      });
  };
  const [isNewGame, setIsNewGame] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchIsNewGame = async () => {
      try {
        const value = await AsyncStorage.getItem('isNewGame');
        if (value === 'false') {
          setIsNewGame(false)
        }
        else {
          setIsNewGame(true)
        }
        
        console.log({ value });
      } catch (e) {
        console.error(e);
      }
    };

    fetchIsNewGame();
  }, []);
  const handleLogout = () => {
    instance
      .logoutPopup()
      .then(() => {
        console.log("User logged out successfully.");
        // Perform any additional cleanup actions here
      })
      .catch((e) => {
        console.error("Logout failed:", e);
      });
  };

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
            <Pressable onPress={() => { playSwitchSound(); switchGameState("mainGame"); }} style={styles.otherButton}>
              <ImageBackground
              source={images.button2}
              resizeMode="contain"
              style={styles.button3image}
              >

              <Text style={styles.otherButtonText}>{isNewGame ?"Play" :"Continue"  }</Text>
              </ImageBackground>
            </Pressable>
            <Pressable onPress={() => switchGameState("tournament")} style={styles.otherButton}>
              <ImageBackground
                source={images.button4}
                resizeMode="contain"
                style={styles.button3image}
              >
                <Text style={styles.otherButtonText}>Tournament</Text>
              </ImageBackground>
            </Pressable>

            <Pressable onPress={()=>setHowToPlayModalVisible(!howToPlayModalVisible)} style={styles.otherButton}>
              <ImageBackground
                source={images.button2}
                resizeMode="contain"
                style={styles.button3image}
              >
                <Text style={styles.otherButtonText}>How To Play</Text>
              </ImageBackground>
            </Pressable>

            <Pressable style={styles.otherButton}>
              <ImageBackground
                source={images.button4}
                resizeMode="contain"
                style={styles.button3image}
              >
                <Text style={styles.otherButtonText}>Highscores</Text>
              </ImageBackground>
            </Pressable>
          </View>

        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Pressable style={{ margin: 5 }} onPress={toggleSound} >
            <ImageBackground
              source={images.button1}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPlaying ? <MaterialCommunityIcons name="music-off" size={24} color="white" /> : <MaterialCommunityIcons name="music" size={24} color="white" />}
            </ImageBackground>
          </Pressable>
          {isAuthenticated ?
            <Pressable
              style={{ margin: 10 }}
              onPress={handleLogout}
            >
              <ImageBackground
                source={images.button3}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.otherButtonText}>
                  <Feather name="log-out" size={21} color="white" /></Text>
              </ImageBackground>
            </Pressable> :

            <Pressable
              style={{ margin: 10 }}
              onPress={handleLogin}
            >
              <ImageBackground
                source={images.button3}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.otherButtonText}>👤</Text>
              </ImageBackground>
            </Pressable>
          }
        </View>
        <HowToPlay alertModalVisible={howToPlayModalVisible} setAlertModalVisible={setHowToPlayModalVisible} />
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
