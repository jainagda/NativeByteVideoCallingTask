import React, {useState, useEffect, useRef} from 'react';

 import {
     Platform,
     SafeAreaView,
     ScrollView,
     StatusBar,
     StyleSheet,
     Text,
     useColorScheme,
     View,
     Image,
     TouchableOpacity,
 } from 'react-native';
 
 import {
     Colors,
     DebugInstructions,
     Header,
     LearnMoreLinks,
     ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
    ClientRole,
    ChannelProfile,
} from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';
 import styles from './Styles';
 
 const config = {
     token: '0064d4a074147a54c8c882fcbf31b1ac9efIAA02Um9qjtG1MTnL6V5T0zcPe2VAQbx6AgbYk/QxAJp+oIcUIMAAAAAEADLkLYo9ebMYgEAAQD05sxi',
     appId: '4d4a074147a54c8c882fcbf31b1ac9ef',
     channelName: 'nativebyteVideocalling',
 };
 const VideoCalling = (props) => {
    const TextName = props.route.params;
     const _engine = useRef<RtcEngine | null>(null);
     const [isJoined, setJoined] = useState(false);
     const [peerIds, setPeerIds] = useState([]);
     const [isHost, setHost] = useState(false);
 
     useEffect(() => {
         if (Platform.OS === 'android') {
             // Request required permissions from Android
             requestCameraAndAudioPermission().then(() => {
                 console.log('requested!');
             });
         }
     }, []);
 
     useEffect(() => {
         const init = async () => {
             const {appId} = config;
             _engine.current = await RtcEngine.create(appId);
             await _engine.current.enableVideo();
             await _engine.current.setChannelProfile(
                 ChannelProfile.LiveBroadcasting
             );
             await _engine.current.setClientRole(
                 isHost ? ClientRole.Broadcaster : ClientRole.Audience
             );
 
             _engine.current.addListener('Warning', warn => {
                 console.log('Warning', warn);
             });
 
             _engine.current.addListener('Error', err => {
                 console.log('Error', err);
             });
 
             _engine.current.addListener('UserJoined', (uid, elapsed) => {
                 console.log('UserJoined', uid, elapsed);
                 // If new user
                 if (peerIds.indexOf(uid) === -1) {
                     // Add peer ID to state array
                     setPeerIds(prev => [...prev, uid]);
                 }
             });
 
             _engine.current.addListener('UserOffline', (uid, reason) => {
                 console.log('UserOffline', uid, reason);
                 // Remove peer ID from state array
                 setPeerIds(prev => prev.filter(id => id !== uid));
             });
 
             // If Local user joins RTC channel
             _engine.current.addListener(
                 'JoinChannelSuccess',
                 (channel, uid, elapsed) => {
                     console.log('JoinChannelSuccess', channel, uid, elapsed);
                     // Set state variable to true
                     setJoined(true);
                 }
             );
         };
         init();
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
 
     const startCall = async () => {
         console.log('hello');
         // Join Channel using null token and channel name
         await _engine.current?.joinChannel(
             config.token,
             config.channelName,
             null,
             0
         );
     };
     const endCall = async () => {
         await _engine.current?.leaveChannel();
         setPeerIds([]);
         setJoined(false);
     };
 
     const _renderVideos = () => {
         return isJoined ? (
             <View style={styles.fullView}>
                 {isHost && (
                     <RtcLocalView.SurfaceView
                         style={styles.max}
                         channelId={config.channelName}
                         renderMode={VideoRenderMode.Hidden}
                     />
                 )}
                 {_renderRemoteVideos()}
             </View>
         ) : null;
     };
 
     const toggleRoll = async () => {
         await _engine.current
             ?.setClientRole(
                 isHost ? ClientRole.Audience : ClientRole.Broadcaster
             )
             .then(() => {
                 setHost(prev => !prev);
             });
     };
 
     const _renderRemoteVideos = () => {
         return (
             <ScrollView
                 style={styles.remoteContainer}
                 contentContainerStyle={styles.remoteContainerContent}
                 horizontal={true}>
                 {peerIds.map(value => {
                     return (
                         <RtcRemoteView.SurfaceView
                             style={styles.remote}
                             uid={value}
                             key={value}
                             channelId={config.channelName}
                             renderMode={VideoRenderMode.Hidden}
                             zOrderMediaOverlay={true}
                         />
                     );
                 })}
             </ScrollView>
         );
     };
     return (
         <View style={styles.max}>
             <View style={{position:"absolute",top:"1%",width:'100%',zIndex:9}}>
                 <Text style={styles.roleText}>
                 {TextName.TextName} {isHost ? 'a broadcaster' : 'the audience'}
                 </Text>
             </View>
             <View style={styles.videoscreenStyle}>{_renderVideos()}</View>
             <View style={styles.buttonControl}>
                 <View style={styles.buttonHolder}>
                     <TouchableOpacity onPress={startCall} style={styles.button}>
                         {/* <Text style={styles.buttonText}> Start Call </Text> */}
                         <Image
                             style={styles.tinyLogo}
                             source={require('../image/_Pick.png')}
                         />
                     </TouchableOpacity>
                     <TouchableOpacity
                         onPress={toggleRoll}
                         style={styles.button}>
                               <Image
                             style={styles.tinyLogo}
                             source={require('../image/_Role.png')}
                         />
                         {/* <Text style={styles.buttonText}> Toggle Role </Text> */}
                     </TouchableOpacity>
                     <TouchableOpacity onPress={endCall} style={styles.button}>
                     <Image
                             style={styles.tinyLogo}
                             source={require('../image/_End.png')}
                         />
                         {/* <Text style={styles.buttonText}> End Call </Text> */}
                     </TouchableOpacity>
                 </View>
             </View>
         </View>
     );
 };
 
 export default VideoCalling;
 

 