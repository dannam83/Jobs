import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import registerForNotifications from './services/push_notifications';
import factory from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            }, {
              navigationOptions: ({ navigation }) => {
                return {
                  title: "Review Jobs",
                  tabBarIcon: ({ tintColor }) => {
                    return <Icon name="favorite" size={30} color={tintColor} />;
                  }
                }
              }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      },
    }, {
      defaultNavigationOptions: {
        tabBarVisible: false
      }
    });

    const { store, persistor } = factory();
    const AppContainer = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
