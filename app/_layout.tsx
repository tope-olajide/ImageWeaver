import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Assassin: require('../assets/fonts/Assassin.ttf'),
    CANDSB: require('../assets/fonts/CANDSB.ttf'),
    HungryBeast: require('../assets/fonts/HungryBeast.ttf'),
    JungleAdventurer: require('../assets/fonts/JungleAdventurer.ttf'),
    Snowcandycandy: require('../assets/fonts/Snowcandycandy.otf'),
    Bastinsondemo: require('../assets/fonts/Bastinsondemo-MV57n.otf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack>
 <Stack.Screen options={{ headerShown: false }} name="index" />
    </Stack>
  );
}
