import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
const { width } = Dimensions.get('window');
// TODO: add firebase?

function App() {
  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'GiftedChat',
        avatar: 'https://placeimg.com/140/140/any',
      },
      video: 'https://vimeo.com/311983548',
    },
  ]);
  const onSend = (newMessages: IMessage[] = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  const getVimeoId = (url: string) => {
    const regExp = /^.*(vimeo\.com\/)([0-9]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length >= 9) {
      return match[2];
    }
    return null;
  };

  const renderMessageVideo = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.video.includes('vimeo')) {
      if(Platform.OS === 'web') {
        return null
      } 
      // return (
      //   <View style={styles.video}>
      //     <WebView
      //       style={{ borderRadius: 13 }}
      //       source={{
      //         uri: `https://player.vimeo.com/video/${getVimeoId(
      //           currentMessage!.video!
      //         )}`,
      //       }}
      //     />
      //   </View>
      // );
    }
    return (
      <Video
        Readonly
        source={{ uri: currentMessage!.video! }}
        style={styles.video}
        resizeMode="cover"
      />
    );
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        {...{ messages, onSend, renderMessageVideo }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: width / 1.5,
    height: 150,
    margin: 13,
    borderRadius: 13,
  },
});

export default App;
