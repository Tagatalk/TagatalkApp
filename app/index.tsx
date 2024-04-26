import { Stack, Link } from 'expo-router';
import { YStack } from 'tamagui';
import axios from 'axios';
import { Container, Main, Title, Subtitle, Button, ButtonText } from '../tamagui.config';
import { Input ,SizableText} from 'tamagui';
import { useEffect, useState } from 'react';
import {router} from 'expo-router';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { register } from '~/components/auth';
import {GoogleSignin, GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';



export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shouldRegister, setShouldRegister] = useState(false);
  useEffect(() => {
    const registerUser = async () => {
      if(password !== confirmPassword){
        Alert.alert('Password does not match');
        return;
      }
      const successful = await register(email, password);
      if(successful===true){
        router.push('/auth/login');
      }
    };
  
    if (shouldRegister) {
      registerUser();
      setShouldRegister(false);  // reset the trigger
    }
  }, [shouldRegister]);
  
  const handleRegistration = () => {
    setShouldRegister(true);  // trigger the registration effect
  };
  



  return (
    <Container style={{backgroundColor:"#fff"}}>
      <Main>
        <Stack.Screen options={{ title: 'Login', headerShown: false }} />
        <YStack>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Create Account</Text>
        </View> 
        <View>
          <Image source={require('./assets/logo1.png')} />
        </View>
        <View style={styles.formContainer}>
          <TextInput style={styles.textInput} onChangeText ={text=>setEmail(text)}value={email}placeholder='Email' />
          <TextInput style={styles.textInput} onChangeText={text=>setPassword(text)}value={password}placeholder='Password' secureTextEntry={true}/>
          <TextInput style={styles.textInput} onChangeText={text=>setConfirmPassword(text)}value={confirmPassword}placeholder='Confirm Password' secureTextEntry={true} />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => handleRegistration()}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.formFooter}>
            <Text style={{ color: '#fff'}}>
              Already have an account?&nbsp;
              <Link href={'/auth/login'}>
                <Text style={{color:"#FD9F10",}}>Sign in </Text>
              </Link>
            </Text>
            </View>
        </View>
        <View style={styles.afterContainer}>
          <View style={styles.line} />
            <Text style={styles.bottomText}> or continue with </Text>
          <View style={styles.line} />
        </View>
        <View style={{marginTop: 20}}>
          <View style={{flexDirection:'row', gap: 20}}>
            <TouchableOpacity style={styles.box}>
              <Image source={require('./assets/Google.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Image source={require('./assets/outlook.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Image source={require('./assets/Facebook.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>By continuing, you agree to TagaTalk’s 
        Terms of Service and acknowledge our Privacy and Policy.</Text>
        </View>
        </View>
        </YStack>
      </Main>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1, // You can adjust the border width as needed
    borderColor: 'rgba(30, 30, 30, 0.5)', // You can set the border color as needed
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 5,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
    backgroundColor: '#212121',
    flexDirection: 'column',
    borderRadius: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 45,
    paddingLeft: 20,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#FD9F10',
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  formFooter: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: 20,
    width: '70%',
  },
  bottomText: { 
    color: 'rgba(30, 30, 30, 0.5)',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  bottomImageContainer: {
  },
  bottomImage: {

    height: 110,
  },
  line: {
    width: 70,
    marginHorizontal: 15,
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#8e8e8e',
  },
  afterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 16,
  },
})