import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import React from 'react';

const Dashboard = props => {
    const [textInputValue, setTextInputValue] = React.useState('');

    const onTextChange = text => {
        // if (text.length !=0 ){
        setTextInputValue(text);

        // }
    };
    console.log('jhcbjashas', textInputValue);
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../image/background.jpg')}
                resizeMode="cover"
                style={{
                    flex: 1,
                }}>
                <View style={{flex: 1}}>
                    <View
                        style={{
                            marginTop: '10%',
                            width: '100%',
                            borderWidth: 0,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../image/group.png')}
                        />
                      
                        <Text style={{fontWeight:'bold',color:'#393178',fontSize:25}}>Welcome to NativeByte</Text> 
                 
                             
                    </View>
             
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 0,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: 0,
                            marginBottom: 30,
                            borderWidth: 0,
                        }}>
                        <TextInput
                            style={{
                                height: 50,
                                width: '70%',
                                borderColor: 'gray',
                                borderWidth: 2,
                                color:"#0192df",
                                borderColor: '#0192df',
                                borderRadius: 20,
                                paddingHorizontal:15,
                                placeholderTextColor: 'black',
                            }}
                            onChangeText={text => onTextChange(text)}
                            value={textInputValue}
                            placeholder="Enter the Name"
                        />

                        <TouchableOpacity
                            style={{
                                padding: 15,
                                paddingHorizontal: 60,
                                backgroundColor: '#0192df',
                                borderRadius: 10,
                            }}
                            onPress={() => {
                                textInputValue
                                    ? props.navigation.navigate('Details',{ TextName:textInputValue})
                                    : Alert.alert("Please Enter The Name");
                            }}>
                            <Text style={{fontWeight: '900', color: 'white'}}>
                                Make a Call
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    tinyLogo: {
        width: 230,
        height: 230,
    },
});
