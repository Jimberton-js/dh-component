import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Radio from '../radio';
import { Icon } from '../index.js';

class ListItem extends React.Component {
  static contextTypes = {
    animation: PropTypes.bool
  }
  // static defaultProps = {
  //   icon: false
  // }
  static propTypes = {
    prefix: PropTypes.element,
    suffix: PropTypes.element,
    eventKey: PropTypes.string,
    onSuffixClick: PropTypes.func, // 如果选取默认的icon 时点击回调 将要移除
    onClick: PropTypes.func,
    icon: PropTypes.string, // 后缀图标， 如果设置false 则不显示
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSuffixClick = this.handleSuffixClick.bind(this);
  }
  componentWillMount() {
    if (this.props.selected) {
      this.state. selected = this.props.selected;
    }
  }
  componentDidMount() {
    // this.element = ReactDOM.findDOMNode(this);
    // this.staticEventManger();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.state.selected = nextProps.selected;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.selected !== nextProps.selected
  }
  handleClick() {
    const selected = !this.state.selected;
    const eventKey = this.props.eventKey;
    this.setState({ selected });
    if (this.props.onClick) {
      this.props.onClick(selected, eventKey);
    }
  }
  handleSuffixClick() {
    if (this.props.onSuffixClick) {
      this.props.onSuffixClick(this.props.eventKey);
    }
  }
  renderSuffixElement() {
    const { suffix, icon} = this.props;
    let element = null;
    if (suffix || icon) {
      if (React.isValidElement(suffix)) {
        element = suffix
      } else if (typeof icon === 'string') {
        element = (
          <span className="dh-list-info"> 
            <Icon type={icon}/>
          </span>
        )
      }
    }
    return element;
  }
  render() {
    const { selected } = this.state;
    const { prefix, suffix, eventKey } = this.props;
    const borderStyle = {
      transform: selected ? 'scaleY(1)' : ' scaleY(0)'
    }
    return (
      <li 
        className="dh-list-child"
        data-selected={selected}>
        <div className="dh-list-child__inner">
          {
            prefix ? (<div className="dh-list-inner__avatar">{prefix}</div>) : null
          }
          <div className="dh-list-inner__title" onClick={this.handleClick}>
            {this.props.children}
          </div>
          {
            React.isValidElement(this.renderSuffixElement()) ? (
              <div className="dh-list-inner__suffix">
                {this.renderSuffixElement()}
              </div>
            ) : null      
          }

        </div>
        {
          typeof this.context.animation === 'boolean' && this.context.animation ? 
          (<div style={borderStyle} className="dh-list-child__border" />) : null 
        }      
      </li>
    )
  }
}
export default ListItem;
