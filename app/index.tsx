import { StyleSheet, Text, View} from "react-native";
import { Link } from "expo-router";

const DexiaHome = () => {
  return (
    <View>
        <Text>DexiaHome</Text>
        <Link href="/onBoarding">
          <Text>Go to Onboarding</Text>
        </Link>
    </View>  
  )
}

export default DexiaHome
const styles = StyleSheet.create({})