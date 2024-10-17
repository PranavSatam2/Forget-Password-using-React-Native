import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import {Register, Login, Verification, ForgetPassword, PasswordResetSuccessfully} from "../screens";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function Index() {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/static/Sen-Regular.ttf"),
    bold: require("../assets/fonts/static/Sen-Bold.ttf"),
    extraBold: require("../assets/fonts/static/Sen-ExtraBold.ttf")
  });

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded])

  if(!fontsLoaded){
    return null
  }

  return(
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown: false}} />
          <Stack.Screen name="PasswordResetSuccessfully" component={PasswordResetSuccessfully} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
