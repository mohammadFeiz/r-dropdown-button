import React,{Component,Fragment,createRef,createContext} from 'react';
import $ from 'jquery'
import './index.css';

const dpContext = createContext();
class RDropdownButton extends Component {
    constructor(props){
      super(props);
      this.state = {open:this.props.open || false}
      this.dom = createRef();
    }
    toggle(){this.setState({open:!this.state.open});}
    getValue(value){return typeof value === 'function' ? value(this.props):value;}
    click(e){
      var parent = $(e.target).parents('.r-dropdown-button-popup');
      if(parent.length !== 0 ){
        return;
      }
      var {items = [],callback = ()=>{}} = this.props;
      if(Array.isArray(items) && items.length){this.toggle();}
      else if(typeof items === 'function'){this.toggle();}
      else{callback(this.props);}
    }
    render(){
        var {items} = this.props;
        var disabled = this.getValue(this.props.disabled);
        var title = this.getValue(this.props.title);
        var text = this.getValue(this.props.text); 
        var iconClass = this.getValue(this.props.iconClass); 
        var className = this.getValue(this.props.className); 
        var badge = this.getValue(this.props.badge);  
        var badgeStyle = this.getValue(this.props.badgeStyle);  
        var rtl = this.getValue(this.props.rtl); 
        var style = this.getValue(this.props.style); 
        var {open} = this.state;
        var contextValue = {...this.props};
        contextValue.toggle = this.toggle.bind(this);
        contextValue.getValue = this.getValue.bind(this);
        var props = {
          className:`r-dropdown-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
          style:$.extend({},{direction:rtl?'rtl':'ltr'},this.getValue(style)),
          disabled,title,
          ref:this.dom,
          onClick:this.click.bind(this)
        }
        return (
          <dpContext.Provider value={contextValue}>
            <button {...props}>
              {parseInt(badge) > 0 && <div className='badge' style={badgeStyle}>{badge> 99 ?'+99':badge}</div>}
              {iconClass && <div className={'icon ' + iconClass} style={{margin:text === undefined?0:undefined}}></div>}
              {text !== undefined && text}
              {open && Array.isArray(items) && items.length > 0 && <Popup />}
              {open && typeof items === 'function' && <Popup />}
            </button>
          </dpContext.Provider>
        );
    }    
}
RDropdownButton.defaultProps = {items:[]}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  update(){
    var {rtl} = this.context;
    var popup = $(this.dom.current);
    var popupWidth = popup.width();
    var popupHeight = popup.height();
    var bodyWidth = window.innerWidth;
    var bodyHeight = window.innerHeight;
    var offset = popup.offset();
    var popupLeft = offset.left;
    var popupRight = popupLeft + popupWidth;
    var popupTop = offset.top;
    var popupBottom = popupTop + popupHeight;
    if(rtl && popupLeft < 0){
      popup.css('right',popupLeft - 36);
    }
    else if(!rtl && popupRight > bodyWidth){
      popup.css('left', bodyWidth - popupRight - 36);
    }
    if(popupBottom > bodyHeight){
      popup.css({'bottom':'100%','top':'unset'});
    }
  }
  componentDidMount(){
    this.update();
  }
  componentDidUpdate(){
    this.update();
  }
  getStyle(style){
    var {rtl} = this.context;
    return $.extend({},{
      position: 'absolute',
      zIndex:1000,
      top:'100%',
      direction:rtl?'rtl':'ltr',
      [rtl?'right':'left']:0,
    },style);
  }
  getBackDropStyle(){
    return {height:'100%',width:'100%',right:0,top:0,position:'fixed'}
  }
  render(){
    var {items,toggle,getValue} = this.context;
    var popupStyle = getValue(this.context.popupStyle);
    var Items = typeof items === 'function'? items(this.context):items.map((item, i)=><ListItem key={i} item={item}/>)
    return(
      <div className="r-dropdown-button-popup" ref={this.dom} style={this.getStyle(popupStyle)}>
        <div className='back-drop' onClick={toggle} style={this.getBackDropStyle()}></div> 
        <div className="for-drop" style={popupStyle}>{Items}</div>
      </div>
    );
  }
}
class ListItem extends Component{
  static contextType = dpContext;
  click(){
    var {item} = this.props;
    var {toggle,callback,getValue} = this.context;
    var disabled = getValue(item.disabled);
    if(disabled){return;}
    if(item.callback){item.callback(item,this.context);}
    else if(callback){callback(item,this.context);} 
    if(item.close !== false){toggle();}
  }
  render(){
    var {item} = this.props;
    var {checkable,rtl,getValue} = this.context;
    var disabled = getValue(item.disabled);
    var iconClass = getValue(item.iconClass);
    var href = getValue(item.href);
    var checked = getValue(item.checked);
    var className = getValue(item.className);
    var text = getValue(item.text);
    var Item = href?
    (
      <a 
        className={`list-item${className?' ' + className:''}${disabled?' disabled':''}`} 
        href={href}
        style={{
          textAlign:rtl?'right':'left',
        }}
      >
        {iconClass && <div className={'icon ' + iconClass} style={{margin:text === undefined?0:undefined}}></div>}
        {text}
      </a>
    )
    :
    (
      <div 
        className={`list-item${className?' ' + className:''}${disabled?' disabled':''}`} 
        onClick={this.click.bind(this)}
        style={{
          textAlign:rtl?'right':'left',
        }}
      >
        {checked !== undefined && <div className='icon check-icon' style={{opacity:checked?1:0}}></div>}
        {iconClass && <div className={'icon ' + iconClass} style={{margin:text === undefined?0:undefined}}></div>}
        {text}
      </div>
    );
    return(
      <Fragment>
        {item.splitter &&<div className='splitter'>{item.splitter}</div>}
        {Item}
      </Fragment>
    );
  }
}

export default RDropdownButton;