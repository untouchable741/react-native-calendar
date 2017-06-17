import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    highlighted: PropTypes.object,
    disabled: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    eventStyleOndate: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, highlighted, isDisabled, event, eventStyleOndate) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    if (highlighted) {
      dayCircleStyle.push(customStyle.highlightedDayCircle)
    } 
    else if (isSelected) {
        if (isToday) {
          dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
        } else {
          dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
        }
    }

    if (event) {
      if (isSelected) {
        dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
      } else {
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
      }
    }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, highlighted, isDisabled, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (highlighted) {
      dayTextStyle.push(styles.highlightedDayText, customStyle.highlightedDayText);      
    } else if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    } else if (isDisabled) {
      dayTextStyle.push(styles.disabledDayText, customStyle.disabledDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    }
    return dayTextStyle;
  }

  longPressDelay = () => {
    return Platform.OS === 'ios' ? 2000 : 5000
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      highlighted,
      disabled,
      showEventIndicators,
      disableSelectEventDate,
      eventStyleOndate
    } = this.props;

    const onPress = disableSelectEventDate && event ? null : this.props.onPress;

     if(filler) {
      return (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      if(disabled) {
        return (
          <View style={[styles.dayButton, customStyle.dayButton]}>
            <View style={this.dayCircleStyle(false, isSelected, isToday, false, disabled, event)}>
              <Text style={this.dayTextStyle(false, isSelected, isToday, false, disabled, event)}>{caption}</Text>
            </View>
            {showEventIndicators &&
              <View style={[
                styles.eventIndicatorFiller,
                customStyle.eventIndicatorFiller,
                event && styles.eventIndicator,
                event && customStyle.eventIndicator,
                event && event.eventIndicator,
                event && eventStyleOndate(this.props.date)]}
              />
            }
            </View>
        );
      } else {
        return (
         <TouchableOpacity 
          onPress={onPress}
          delayLongPress={this.longPressDelay()}
          onLongPress={this.props.onLongPress}>
          <View style={[styles.dayButton, customStyle.dayButton]}>
            <View style={this.dayCircleStyle(false, isSelected, isToday, highlighted, disabled, event)}>
              <Text style={this.dayTextStyle(false, isSelected, isToday, highlighted, disabled, event)}>{caption}</Text>
            </View>
            {showEventIndicators &&
              <View style={[
                styles.eventIndicatorFiller,
                customStyle.eventIndicatorFiller,
                event && styles.eventIndicator,
                event && customStyle.eventIndicator,
                event && event.eventIndicator,
                event && eventStyleOndate(this.props.date)]}
              />
            }
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
}
