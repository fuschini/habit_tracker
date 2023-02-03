import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

export function Routes() {
    return (
        // This view outside AppRoutes keeps the background consistent when changing screens
        // Prevents bg white glitch
        <View className='flex-1 bg-background'>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}