import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trang Chủ</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePhoneNumber = (phone, navigation) => {
    // Biểu thức Regex kiểm tra số điện thoại Việt Nam
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

    if (phoneRegex.test(phone)) {
      setErrorMessage('Số điện thoại hợp lệ!');
      navigation.navigate('Home');
    } else {
      setErrorMessage('Số điện thoại không hợp lệ!, Vui lòng nhập lại');
    }
  };

  const getErrorMessageStyle = () => {
    return errorMessage.includes('không hợp lệ')
      ? { color: 'red' }
      : { color: 'green' };
  };

  const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 40, fontWeight: "600" }}>Đăng nhập</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>Nhập số điện thoại</Text>
          <Text style={styles.text}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OnHousing Pro</Text>
          <TextInput
            style={styles.text}
            placeholder="Nhập số điện thoại của bạn "
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText= {setPhoneNumber}
              
          />
          {errorMessage && (
            <Text style={getErrorMessageStyle()}>{errorMessage}</Text>
          )}
          <Button
            title="Tiếp Tục"
            onPress={() => validatePhoneNumber(phoneNumber, navigation)}
          />
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  header: {
    backgroundColor: '#fff',
    display: 'flex',
    top: 20,
    paddingTop: 20,
    marginBottom: 80,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  body: {
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});
