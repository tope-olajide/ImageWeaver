import React from "react";

import { View, Pressable, ImageBackground, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";


const JoinedUsers = () => {


  return (
    <>
      <View style={{ width: "80%" }}>
      
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
  joinedUsersContainer: {
    height: 100,
    display: "flex",
    flexWrap: "wrap",
  },
});

export default JoinedUsers;
