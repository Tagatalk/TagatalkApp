import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import icons from '../../constants/icons';
import FeedbackModal from '../feedbackModal';

const ListenGame2 = () => {
  const [typedText, setTypedText] = useState('');
  const [currentItem, setCurrentItem] = useState<{ audio: any, correctText: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  // Array of audio files and their correct answers
  const items = [
    { audio: require('../assets/logo1.png'), correctText: 'Umaga' },
    { audio: require('../assets/gabi.mp3'), correctText: 'Gabi' },
    { audio: require('../assets/hapon.mp3'), correctText: 'Hapon' },
    { audio: require('../assets/tanghali.mp3'), correctText: 'Tanghali' },
    // Add more items here...
  ];

  useEffect(() => {
    // Select a random item from the array
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
  }, []);

  const playAudio = async () => {
    if (!currentItem) 
      return;

    try {
      setIsPlaying(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(currentItem.audio);
      await sound.playAsync();
      setIsPlaying(false);
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const handleTextChange = (text: any) => {
    setTypedText(text);
  };

  const checkAnswer = () => {
    if (!currentItem) return;

    if (typedText.trim().toLowerCase() === currentItem.correctText.toLowerCase()) {
      setFeedback('Correct!');
      setIsModalVisible(true);
    } else {
      setFeedback('Incorrect. Try again.');
      setIsModalVisible(true);
    }
  };

  return (
    <View style={{backgroundColor: 'white', width: '100%', flex: 1, justifyContent: 'space-between'}}>
    <Text style={styles.header}>Write what you hear.</Text>
        <View style={styles.contentContainer}>
          <TouchableOpacity 
          style={styles.speakerButton}
          onPress={playAudio}
          disabled={isPlaying}>
            <Image source={icons.speaker} style={styles.speakerIcon} />
          </TouchableOpacity>
      <TextInput
        style={styles.textBox}
        onChangeText={handleTextChange}
        value={typedText}
        placeholder="Write your answer here..."
        placeholderTextColor={'#D0D5DD'}
        autoCapitalize="none"
        autoCorrect={false}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity 
        style={[styles.continueButton, typedText.trim() === '' ? styles.disabledButton : null]}
        onPress={checkAnswer}
        disabled={typedText.trim() === ''}
      >
        <Text style={styles.continueText}>CHECK</Text>
      </TouchableOpacity>
        </View>
      <FeedbackModal visible={isModalVisible}
        feedback={feedback}
        onClose={() => setIsModalVisible(false)}
      />
      </View>
  );
};

export default ListenGame2;

const styles = StyleSheet.create({
  speakerIcon: {
    width: 43,
    height: 43,
  },
  header: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "900",
  },
  contentContainer: {
    alignItems: 'center',
  },
  speakerButton: {
    marginTop: 50,
    borderRadius: 35,
    width: '30%',
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#02B7E8",
    elevation: 5,
  },
  choicesText: {
    fontSize: 23,
    fontWeight: "600",
    color: "white",
  },
  textBox: {
    width: '100%',
    height: '45%',
    borderColor: '#D4D4D8',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 70,
    marginBottom: 30,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 20,
    fontWeight: '700',
    padding: 20,
  },
  continueButton: {
    backgroundColor: '#FD9F10',
    borderRadius: 30,
    width: '100%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,    
  },
  continueText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  success: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  matched: {
    backgroundColor: 'gray',
  },
})