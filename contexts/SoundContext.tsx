import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SoundContext = createContext<any>(null);

const SOUND_PLAYING_KEY = 'isPlaying';

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Function to load the playing state from storage
  const loadIsPlayingFromStorage = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(SOUND_PLAYING_KEY);
      if (storedValue !== null) {
        const wasPlaying = JSON.parse(storedValue);
        setIsPlaying(wasPlaying);

        if (wasPlaying) {
          const { sound: newSound } = await Audio.Sound.createAsync(
            require('../assets/sounds/Background-Music-1.mp3'),
            { shouldPlay: true, isLooping: true }
          );
          setSound(newSound);
        }
      }
    } catch (e) {
      console.log('Failed to load sound state from storage', e);
    }
  };

  // Save the isPlaying state to storage
  const saveIsPlayingToStorage = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(SOUND_PLAYING_KEY, JSON.stringify(value));
    } catch (e) {
      console.log('Failed to save sound state to storage', e);
    }
  };

  // Toggle sound function
  const toggleSound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/Background-Music-1.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      saveIsPlayingToStorage(true);
    } else if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      saveIsPlayingToStorage(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
      saveIsPlayingToStorage(true);
    }
  };

  // Function to play the button sound
  const playButtonSound = async () => {
    if (!isPlaying) return; 

    const { sound: buttonSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/button.mp3')
    );
    await buttonSound.playAsync();
    };
    const playPartialButton2Sound = async () => {
       /*  if (!isPlaying) return; */
    
        const { sound: button2Sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/button-2.mp3')
        );
    
      
        await button2Sound.playFromPositionAsync(7500); // Start from 3000 milliseconds (3 seconds)
    
        // Schedule to stop the sound after 2 seconds (i.e., stop at 5000 milliseconds or 5 seconds)
        setTimeout(async () => {
          await button2Sound.pauseAsync(); // Stop playing after 2 seconds
         
        }, 1000); // 2 seconds = 2000 milliseconds
    };
    const playPartialButton3Sound = async () => {
        /*  if (!isPlaying) return; */
     
         const { sound: button2Sound } = await Audio.Sound.createAsync(
           require('../assets/sounds/button-2.mp3')
         );
     
       
         await button2Sound.playFromPositionAsync(4000); // Start from 3000 milliseconds (3 seconds)
     
         // Schedule to stop the sound after 2 seconds (i.e., stop at 5000 milliseconds or 5 seconds)
         setTimeout(async () => {
           await button2Sound.pauseAsync(); // Stop playing after 2 seconds
          
         }, 2000); // 2 seconds = 2000 milliseconds
    };
    const playPartialButton4Sound = async () => {
        /*  if (!isPlaying) return; */
     
         const { sound: button2Sound } = await Audio.Sound.createAsync(
           require('../assets/sounds/button-2.mp3')
         );
     
       
         await button2Sound.playFromPositionAsync(19300); // Start from 3000 milliseconds (3 seconds)
     
         // Schedule to stop the sound after 2 seconds (i.e., stop at 5000 milliseconds or 5 seconds)
         setTimeout(async () => {
           await button2Sound.pauseAsync(); // Stop playing after 2 seconds
          
         }, 2000); // 2 seconds = 2000 milliseconds
    };
    const playPartialButton5Sound = async () => {
        /*  if (!isPlaying) return; */
     
         const { sound: button2Sound } = await Audio.Sound.createAsync(
           require('../assets/sounds/button-2.mp3')
         );
     
       
         await button2Sound.playFromPositionAsync(11600); // Start from 3000 milliseconds (3 seconds)
     
         // Schedule to stop the sound after 2 seconds (i.e., stop at 5000 milliseconds or 5 seconds)
         setTimeout(async () => {
           await button2Sound.pauseAsync(); // Stop playing after 2 seconds
          
         }, 2000); // 2 seconds = 2000 milliseconds
       };
       const playFanFareSound = async () => {
       /*  if (!isPlaying) return;  */
    
        const { sound: buttonSound } = await Audio.Sound.createAsync(
          require('../assets/sounds/level-up-47165.mp3')
        );
        await buttonSound.playAsync();
    };
    
    const playSwitchSound = async () => {
        if (!isPlaying) return; 

        const { sound: button2Sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/switch-150130.mp3')
          );
      
        
          await button2Sound.playFromPositionAsync(20); // Start from 3000 milliseconds (3 seconds)
      
          // Schedule to stop the sound after 2 seconds (i.e., stop at 5000 milliseconds or 5 seconds)
          setTimeout(async () => {
            await button2Sound.pauseAsync(); // Stop playing after 2 seconds
           
          }, 1500); // 2 seconds = 2000 milliseconds
        };
    
    
  useEffect(() => {
    loadIsPlayingFromStorage();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SoundContext.Provider value={{ toggleSound, isPlaying, playButtonSound, playPartialButton2Sound, playPartialButton3Sound, playFanFareSound, playPartialButton4Sound, playPartialButton5Sound, playSwitchSound}}>
      {children}
    </SoundContext.Provider>
  );
};


export const useSound = () => useContext(SoundContext);
