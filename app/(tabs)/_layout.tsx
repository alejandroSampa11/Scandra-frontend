import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import HomeScreen from './index';
import ProfileScreen from './profile';
import SearchScreen from './search';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'search' },
    { key: 'profile', title: 'Profile', icon: 'person' },
  ]);

  const renderScene = SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    profile: ProfileScreen,
  });

  const renderTabBar = (props: any) => {
    return (
      <View style={[styles.tabBar, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const isActive = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Ionicons
                name={route.icon as any}
                size={20}
                color={
                  isActive
                    ? isDark ? '#6dd0c6' : '#273b7f'
                    : isDark ? '#888' : '#999'
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isActive
                      ? isDark ? '#6dd0c6' : '#273b7f'
                      : isDark ? '#888' : '#999',
                  },
                ]}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        tabBarPosition="bottom"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    gap: 4,
    paddingBottom: 15,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

