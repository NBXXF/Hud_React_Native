import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Hud,
{
    HUD_TYPE_DEFAULT,
    HUD_TYPE_TEXT,
    HUD_TYPE_INFO,
    HUD_TYPE_ERROR,
    HUD_TYPE_SUCCESS
} from 'xxf_hud';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        alignItems: 'center'
    },
    text: {
        padding: 8
    }
});

export default class Examples extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hudType: HUD_TYPE_DEFAULT,
        }
    }

    // componentDidUpdate() {
    //     console.log('update');
    //     this.hud.show('custom hud');
    //     this.hud.close(2000);
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    onPress={() => {
                        this.hud.show(HUD_TYPE_INFO, 'info hud', 2000)
                    }}
                    style={styles.text}
                >
                    info hud
                </Text>
                <Text
                    onPress={() => {
                        this.hud.show(HUD_TYPE_SUCCESS, 'success hud', 2000);
                    }}
                    style={styles.text}>
                    success hud
                </Text>
                <Text
                    onPress={() => {
                        this.hud.show(HUD_TYPE_ERROR, 'error hud', 2000);
                    }}
                    style={styles.text}>
                    error hud
                </Text>
                <Text
                    onPress={() => {
                        this.hud.show(HUD_TYPE_DEFAULT, 'default hud', 2000)
                    }}
                    style={styles.text}>
                    default hud
                </Text>
                <Text
                    style={styles.text}
                    onPress={() => {
                        this.hud.show(HUD_TYPE_TEXT, 'text toast', 2000);
                    }}
                >
                    text toast
                </Text>
                <Text onPress={() => {
                    this.hud.close()
                }}
                      style={styles.text}>
                    close
                </Text>
                <Hud source={this.state.source} ref={r => {
                    this.hud = r
                }} hudType={this.state.hudType} textOnly={this.state.textOnly}/>
            </View>
        )
    }
}