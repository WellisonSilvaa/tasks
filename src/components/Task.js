import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import 'react-native-gesture-handler/Swipeable';
import { Icon } from "@rneui/themed";
import commonStyles from '../commonStyles'

import moment from "moment";
import 'moment/locale/pt-br'
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default props => {

    const doneOrNotStyle = props.doneAt != null 
    ? { textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <View style={styles.right}>
                <Icon
                    name="trash"
                    type="ionicon"
                    size={20}
                    color='#FFF'
                />
            </View>
        )
    }

    const getLeftContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon
                    name="trash"
                    type="ionicon"
                    size={30}
                    color='#FFF'
                />
            </TouchableOpacity>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable 
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}>
            <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
        </Swipeable>
        </GestureHandlerRootView>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon
                    name="check"
                    size={20}
                    color='#FFF'
                ></Icon>
            </View>
        )
    }else {
        return (
            <View style={styles.pending}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        
    },
    checkContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: "center"
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    }
})