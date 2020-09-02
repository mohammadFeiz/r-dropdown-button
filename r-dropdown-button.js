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
    toggle(){
      this.setState({open:!this.state.open});
      var {onBackdropClick} = this.props;
      if(onBackdropClick){onBackdropClick(this.props)}
    }
    getValue(value){return typeof value === 'function' ? value(this.props):value;}
    click(e){
      var parent = $(e.target).parents('.r-dropdown-button-popup');
      if(parent.length !== 0 ){
        return;
      }
      var {items,onClick = ()=>{}} = this.props;
      if(items){this.toggle();}
      else{onClick(this.props);}
    }
    showPopup(){
      var {items} = this.props;
      var {open} = this.state;
      if(!open){return false;}
      if(Array.isArray(items)){return true;}
      if(typeof items === 'function'){return true;} 
      return false
    }
    render(){
        var {items} = this.props;
        var disabled = this.getValue(this.props.disabled);
        var title = this.getValue(this.props.title);
        var text = this.getValue(this.props.text); 
        var iconClass = this.getValue(this.props.iconClass); 
        var iconStyle = this.getValue(this.props.iconStyle); 
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
              {iconClass && <div className={'button-icon ' + iconClass} style={{margin:text === undefined?0:undefined,...iconStyle}}></div>}
              {text !== undefined && text}
              {this.showPopup() && <Popup />}
            </button>
          </dpContext.Provider>
        );
    }    
}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
    this.state = {searchValue:''}
  }
  update(){
    var {rtl,openRelatedTo} = this.context;
    var popup = $(this.dom.current);
    var popupWidth = popup.width();
    var popupHeight = popup.height();
    var parent = openRelatedTo?popup.parents(openRelatedTo):undefined;
    parent = Array.isArray(parent) && parent.length === 0?undefined:parent;
    var bodyWidth = parent?parent.width():window.innerWidth;
    var bodyHeight = parent?parent.height():window.innerHeight;
    var offset = popup.offset();
    var popupLeft = offset.left;
    var popupRight = popupLeft + popupWidth;
    var popupTop = offset.top;
    var popupBottom = popupTop + popupHeight;
    if(parent){
      var parentOffset = parent.offset();
      popupLeft -= parentOffset.left;
      popupRight = popupLeft + popupWidth;
      popupTop -= parentOffset.top;
      popupBottom = popupTop + popupHeight;
    }
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
  getStyle(){
    var {rtl} = this.context;
    return {
      position: 'absolute',
      zIndex:1000,
      top:'100%',
      direction:rtl?'rtl':'ltr',
      [rtl?'right':'left']:0,
    };
  }
  getBackDropStyle(){
    return {height:'100%',width:'100%',right:0,top:0,position:'fixed'}
  }
  render(){
    var {search,items,toggle,getValue} = this.context;
    var popupStyle = getValue(this.context.popupStyle);
    var {searchValue} = this.state;
    var Items = typeof items === 'function'? items(this.context):items.filter((item)=>{
      if(!searchValue){return true;}
      return item.text.indexOf(searchValue) !== -1
    }).map((item, i)=><ListItem key={i} item={item} index={i}/>)
    return(
      <div className="r-dropdown-button-popup" ref={this.dom} style={this.getStyle(popupStyle)}>
        <div className='back-drop' onClick={toggle} style={this.getBackDropStyle()}></div> 
        <div className="for-drop" style={popupStyle}>
          {
            search && 
            <div className='r-dropdown-search'>
            <div className='search-icon'></div>
            <input type='text' value={searchValue} onChange={(e)=>{
                if(typeof search === 'function'){
                  search(e.target.value);
                  return;
                }
                this.setState({searchValue:e.target.value})
              }}
            />
            </div>
          }
          {Items}
        </div>
      </div>
    );
  }
}
class ListItem extends Component{
  static contextType = dpContext;
  click(){
    var {item,index} = this.props;
    var {toggle,onClick,getValue} = this.context;
    var disabled = getValue(item.disabled);
    if(disabled){return;}
    if(item.onClick){item.onClick(item,index,this.context);}
    else if(onClick){onClick(item,index,this.context);} 
    if(item.close !== false){toggle();}
  }
  getStyle(){
    var {itemStyle = {},rtl} = this.context;
    var ItemStyle = {...itemStyle};
    ItemStyle.textAlign = rtl?'right':'left';
    return ItemStyle;
  }
  render(){
    var {item} = this.props;
    var {checkable,rtl,getValue} = this.context;
    var disabled = getValue(item.disabled);
    var iconClass = getValue(item.iconClass);
    var iconStyle = getValue(item.iconStyle);   
    var href = getValue(item.href);
    var checked = getValue(item.checked);
    var className = getValue(item.className);
    var text = getValue(item.text);
    var Item = href?
    (
      <a 
        className={`list-item${className?' ' + className:''}${disabled?' disabled':''}`} 
        href={href}
        style={this.getStyle()}
      >
        {iconClass && <div className={'popup-icon ' + iconClass} style={{margin:text === undefined?0:undefined,...iconStyle}}></div>}
        {text}
      </a>
    )
    :
    (
      <div 
        className={`list-item${className?' ' + className:''}${disabled?' disabled':''}`} 
        onClick={this.click.bind(this)}
        style={this.getStyle()}
      >
        {checked !== undefined && <div className='check-icon' style={{opacity:checked?1:0}}></div>}
        {iconClass && <div className={'popup-icon ' + iconClass} style={{margin:text === undefined?0:undefined,...iconStyle}}></div>}
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