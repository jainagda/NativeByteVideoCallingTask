import {Dimensions, StyleSheet} from 'react-native';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
// https://www.youtube.com/watch?v=1cYKoSe3MN4

// https://www.youtube.com/results?search_query=agora+react+native
export default StyleSheet.create({
    max: {
        flex: 1,
    
    },
    buttonHolder: {
        // height: 100,
        // width:'80%',      
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor:'#000'
    },
    button: {
        // paddingHorizontal: 20,
        paddingVertical: 0,
        // backgroundColor: '#0093E9',
        borderRadius: 25,
      
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height-70,
        // marginRight:5 
    },
    tinyLogo:{
        width:40,
        height:40
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5,
    },
    remoteContainerContent: {
        paddingHorizontal: 2.5,
    },
    remote: {
        width: 150,
        height: 150,
        marginHorizontal: 2.5,
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
    roleText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        color:'black'
    },
    buttonControl:{
    //    backgroundColor:'#fff'
    borderWidth:0.5,
    padding:2,
    borderColor:'orange',
    borderRadius:10,
    marginTop:40,
    margin:5
    
    },
    videoscreenStyle:{
        width: dimensions.width-2,
     

height: dimensions.height-100,
     
    }
    
});
