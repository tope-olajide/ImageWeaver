
import {
    Modal,
    StyleSheet,
    View,
    ImageBackground, Text,
    Pressable
} from "react-native";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import images from "@/assets/images";
interface SpinnerModalProps {
    alertModalVisible: boolean;
    setAlertModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToPlay: React.FC<SpinnerModalProps> = ({
    alertModalVisible,
    setAlertModalVisible,
}) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={alertModalVisible}
            >
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(15,0,0,0.8)",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.8)",
                            width: "80%",
                            minHeight: "55%",
                         

                        }}
                    >
                        <ImageBackground
                            source={images.bg5}
                            blurRadius={40}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#E62E2D",
                                position: "relative", borderRadius: 10,
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 20,
                            }}>
                            <Pressable onPress={() => { setAlertModalVisible(false) }} style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: "(rgba(255,255,255,0.2))", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", margin: 6 }}>
                                <AntDesign name="close" size={24} color="(rgba(255,255,255,0.8))" />
                            </Pressable>
                            <View>
                                <Text style={{ textAlign: "center", color: "#000", fontSize: 20, fontWeight: "700" }}>How to Play Image Weaver 🎮</Text>
                            </View>
                            <View style={{ width: 15, height: 15, borderRadius: 40, backgroundColor: "rgba(205,0,0,0.7)", alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: 8 }}>
                                <FontAwesome name="exclamation" size={10} color="white" />
                            </View>
                            <Text style={styles.instruction}>
        1️⃣ <Text style={styles.bold}>Observe the Image:</Text> Look at the picture containing four collages. Each collage is a clue to a single word.
      </Text>

      <Text style={styles.instruction}>
        2️⃣ <Text style={styles.bold}>Form the Correct Word:</Text> Use the 12 letter buttons below the image to spell the word that matches the collages.
      </Text>

      <Text style={styles.instruction}>
        3️⃣ <Text style={styles.bold}>Use Hints if Needed:</Text> Stuck? Use hints or unlock a random letter to help you find the answer.
      </Text>

      <Text style={styles.instruction}>
        4️⃣ <Text style={styles.bold}>Shuffle the Letters:</Text> Tap the shuffle button to rearrange the letters for a fresh perspective.
      </Text>

      <Text style={styles.instruction}>
        5️⃣ <Text style={styles.bold}>Win and Level Up:</Text> Solve puzzles, earn coins, and advance! In tournament mode, the first to complete 5 puzzles wins!
      </Text>

      <Text style={styles.footer}>🎉 Have fun and test your word skills!</Text>
                            <View style={{ marginBottom: 30 }}>
                                <Pressable onPress={()=>setAlertModalVisible(false)} style={{
                                    backgroundColor: 'rgba(175,155,0,0.8)',
                                    paddingVertical: 10,
                                    paddingHorizontal: 24,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: "auto",
                                    width: "80%",

                                }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", textTransform: "uppercase" }}>Close</Text>
                                </Pressable>
                            </View>
                        </ImageBackground>

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
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
    },
    instruction: {
        fontSize: 16,
        color: "rgba(0,0,0,0.9)",
        textAlign: "left",
        marginBottom: 8,
      },
      bold: {
        fontWeight: "bold",
        color: "#222",
      },
      footer: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
          marginTop: 10,
          textAlign: "center",
        marginBottom:10
      },
});

export default HowToPlay;
