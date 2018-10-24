/**
 * Created by liuyu on 2017/1/18.
 */
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    Animated,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

/**
 * 定义类型
 * @type {string}
 */
export const HUD_TYPE_DEFAULT = 'default';//默认loading..
export const HUD_TYPE_TEXT = 'text';//纯文本,toast
export const HUD_TYPE_INFO = 'info';
export const HUD_TYPE_SUCCESS = 'success';
export const HUD_TYPE_ERROR = 'error';
const hudTypes = [HUD_TYPE_DEFAULT, HUD_TYPE_TEXT, HUD_TYPE_INFO, HUD_TYPE_SUCCESS, HUD_TYPE_ERROR];


export default class Hud extends PureComponent {
    mount = false;

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hudType: this.props.hudType,
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        };
    }

    componentDidMount() {
        this.mount = true;
    }

    componentWillUnmount() {
        this.mount = false;
    }

    show(hudType = HUD_TYPE_DEFAULT, text = '', after = null) {
        this.setState({
            isShow: true,
            hudType: hudType,
            text: text,
        });
        this.isShow = true;
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start();
        if (after !== null) {
            this.close(after)
        }
    }


    close(after = null) {
        if (!this.isShow) return;
        let animate = () => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.mount && this.setState({
                    isShow: false,
                });
                this.isShow = false;
            })
        };

        if (after != null) {
            setTimeout(animate, after);
        } else {
            animate();
        }

    }

    /**
     * 带图标的
     * @param text_numberOfLines
     * @param iconSource
     * @returns {XML}
     * @private
     */
    __renderIcon(iconSource) {
        return <Image style={styles.image} source={iconSource}/>;
    }

    /**
     * 带loading转圈
     * @param text_numberOfLines
     * @returns {XML}
     * @private
     */
    __renderSpinner(text_numberOfLines) {
        return <ActivityIndicator style={styles.image} animating={this.state.isShow}
                                  size={'large'}/>;
    }

    /**
     * 设置纯text布局
     * @param numberOfLines
     * @returns {XML}
     * @private
     */
    __renderText(numberOfLines, width=60) {
        return <Text numberOfLines={numberOfLines}
                     style={{
                         color: '#ffffff',
                         width: width,
                     }}>{this.state.text}</Text>
    }

    render() {
        let icon = null;
        let text = null;
        switch (this.state.hudType) {
            case HUD_TYPE_DEFAULT:
                icon = this.__renderSpinner(2);
                text = this.__renderText(2);
                break;
            case HUD_TYPE_TEXT:
                icon = null;
                text = this.__renderText(2,120);
                break;
            case HUD_TYPE_INFO:
                icon = this.__renderIcon(require('./src/info.png'));
                text = this.__renderText(2);
                break;
            case HUD_TYPE_SUCCESS:
                icon = this.__renderIcon(require('./src/success.png'));
                text = this.__renderText(2);
                break;
            case HUD_TYPE_ERROR:
                icon = this.__renderIcon(require('./src/error.png'));
                text = this.__renderText(2);
                break;
            default:
                icon = this.__renderSpinner(2);
                text = this.__renderText(2);
                break
        }


        let view = this.state.isShow ?
            <View ref="container" pointerEvents={this.props.backgroundTouchable ? 'none' : 'auto'}
                  style={[styles.container, {paddingTop: this.props.positionValue}]}>
                <Animated.View
                    style={[styles.content, {opacity: this.state.opacityValue}, this.props.style]}>
                    {icon}
                    {text}
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 40,
        height: 40,
        tintColor: 'white',
    }
});

Hud.propTypes = {
    style: PropTypes.any,
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number,
    positionValue: PropTypes.number,
    hudType: PropTypes.oneOf(hudTypes),
    backgroundTouchable: PropTypes.bool,
};

Hud.defaultProps = {
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1,
    positionValue: 0,
    backgroundTouchable: true,
    hudType: HUD_TYPE_TEXT,
};


