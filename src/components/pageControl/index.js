import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';


/**
 * @description: Page indicator, typically used in paged scroll-views
 * @image: https://user-images.githubusercontent.com/33805983/34663655-76698110-f460-11e7-854b-243d27f66fec.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.js
 */
export default class PageControl extends BaseComponent {
  static displayName = 'PageControl';
  
  static propTypes = {
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Total number of pages
     */
    numOfPages: PropTypes.number,
    /**
     * Zero-based index of the current page
     */
    currentPage: PropTypes.number,
    /**
     * Action handler for clicking on a page indicator
     */
    onPagePress: PropTypes.func,
    /**
     * Color of the selected page dot and, if inactiveColor not passed, the border of the not selected pages
     */
    color: PropTypes.string,
    /**
     * Color of the unselected page dots and the border of the not selected pages
     */
    inactiveColor: PropTypes.string,
    /**
     * The size of the page indicator
     */
    size: PropTypes.number,
    /**
     * Whether to enlarge the active page indicator
     */
    enlargeActive: PropTypes.bool,
    /**
     * The space between the siblings page indicators
     */
    spacing: PropTypes.number
  };

  static defaultProps = {
    size: 10,
    spacing: 4,
    enlargeActive: false
  };

  getColorStyle(index) {
    const {color, inactiveColor, currentPage} = this.props;
    const compColor = color || ThemeManager.primaryColor;

    return {
      borderColor: index === currentPage ? compColor : inactiveColor || compColor,
      backgroundColor: index === currentPage ? compColor : inactiveColor || 'transparent'
    };
  }
  
  getSizeStyle(index) {
    const {size, enlargeActive, currentPage} = this.props;
    const temp = enlargeActive ? (index === currentPage ? size + 2 : size) : size;

    return {
      width: temp, 
      height: temp, 
      borderRadius: temp / 2
    };
  }

  onPagePress = (index) => {
    _.invoke(this.props, 'onPagePress', index);
  }

  renderItem(item, index) {
    const {onPagePress, spacing} = this.props;

    return (
      <TouchableOpacity
        disabled={_.isUndefined(onPagePress)}
        onPress={() => this.onPagePress(index)}
        key={index}
        style={[
          styles.pageIndicator,
          {marginRight: spacing / 2, marginLeft: spacing / 2},
          this.getColorStyle(index),
          this.getSizeStyle(index)
        ]}
      />
    );
  }

  render() {
    const {numOfPages, containerStyle} = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        {_.map([...new Array(numOfPages)], (item, index) => this.renderItem(item, index))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageIndicator: {
    backgroundColor: 'transparent',
    borderWidth: 1
  }
});
