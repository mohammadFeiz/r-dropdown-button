import React,{Component,Fragment,createRef,createContext} from 'react';
import $ from 'jquery'
import './index.css';

const dpContext = createContext();
class RDropdownButton extends Component {
    constructor(props){
      super(props);
      this.state = {open:this.props.open || false}
      this.dom = createRef();
      this.touch = 'ontouchstart' in document.documentElement;
    }
    toggle(state = !this.state.open){
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(()=>{
        if(state === this.state.open){return}
        this.setState({open:state});
        if(state){
          $('body').addClass('rdb-open'); 
        }
        else{
          $('body').removeClass('rdb-open'); 
        }
        var {onBackdropClick} = this.props;
        if(onBackdropClick){onBackdropClick(this.props)}
      },100)
    }
    getValue(value){return typeof value === 'function' ? value(this.props):value;}
    click(e){
      var parent = $(e.target).parents('.rdb-popup');
      if(parent.length !== 0 ){return;}
      var {items,onClick = ()=>{}} = this.props;
      if(items){this.toggle(true);}
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
    getIcon(icon,iconClass,iconStyle){
      if(icon){return <div className={'rdb-icon'} style={iconStyle}>{icon}</div>}
      if(iconClass){
        return (
         <div className={'rdb-icon ' + iconClass} style={iconStyle}></div>
        )
      }
      return null;
    }
    getBadge(){
      if(badge === undefined){return null;}
      var badge = parseInt(this.getValue(this.props.badge));  
      if(isNaN(badge)){console.error('RDropdownButton => badge props is not an number'); return null;}
      if(badge < 1){return null;}
      if(badge > 99){badge = '+99';}
      var badgeStyle = this.getValue(this.props.badgeStyle);  
      return <div className='rdb-badge' style={badgeStyle}>{badge}</div>
    }
    getText(text,icon){
      if(text === undefined || text === ''){return ''}
      if(icon === null){return text;}
      var {gap = 6} = this.props;
      return (
        <Fragment>
          <div className='rdb-gap' style={{width:gap}}></div>
          {text}
        </Fragment>
      )
    }
    getHoverEnabled(){
      if(this.touch){return false}
      return this.getValue(this.props.hover);
    }
    render(){
        var id = this.getValue(this.props.id);
        var disabled = this.getValue(this.props.disabled);
        var title = this.getValue(this.props.title);
        var className = this.getValue(this.props.className); 
        var rtl = this.getValue(this.props.rtl); 
        var style = this.getValue(this.props.style); 
        var icon = this.getValue(this.props.icon); 
        var iconClass = this.getValue(this.props.iconClass); 
        var iconStyle = this.getValue(this.props.iconStyle); 
        var text = this.getValue(this.props.text); 
        var Icon = this.getIcon(icon,iconClass,iconStyle);
        var Text = this.getText(text,Icon); 
        var hover = this.getHoverEnabled();
        var contextValue = {...this.props,getIcon:this.getIcon.bind(this),getText:this.getText.bind(this)};
        contextValue.toggle = this.toggle.bind(this);
        contextValue.getValue = this.getValue.bind(this);
        contextValue.hover = hover
        var props = {
          id,
          className:`r-dropdown-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
          style:$.extend({},{direction:rtl?'rtl':'ltr'},this.getValue(style)),
          disabled,title,
          ref:this.dom,
          onClick:this.click.bind(this),
          onMouseEnter:hover?()=>this.toggle(true):undefined,
          onMouseLeave:hover?()=>this.toggle(false):undefined
        }
        return (
          <dpContext.Provider value={contextValue}>
              <button {...props}>{this.getBadge()}{Icon}{Text}</button>
              {this.showPopup() && <Popup />}
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
  getLimit(dom){
    var offset = dom.offset();
    var left = offset.left - window.pageXOffset;
    var top = offset.top - window.pageYOffset;
    var width = dom.outerWidth();
    var height = dom.outerHeight();
    var right = left + width;
    var bottom = top + height;
    return {left,top,right,bottom,width,height};
  }
  preventScroll(e){
    e.preventDefault();
  }
  update(){
    var {rtl,openRelatedTo,close,animate} = this.context;
    var popup = $(this.dom.current);
    var button = popup.prev();
    var parent = openRelatedTo?popup.parents(openRelatedTo):undefined;
    parent = Array.isArray(parent) && parent.length === 0?undefined:parent;
    var bodyWidth = window.innerWidth;
    var bodyHeight = window.innerHeight;
    var parentLimit = parent?this.getLimit(parent):{left:0,top:0,right:bodyWidth,bottom:bodyHeight};
    if(parentLimit.left < 0){parentLimit.left = 0;}
    if(parentLimit.right > bodyWidth){parentLimit.right = bodyWidth;}
    if(parentLimit.top < 0){parentLimit.top = 0;}
    if(parentLimit.bottom > bodyHeight){parentLimit.bottom = bodyHeight;}
    
    var buttonLimit = this.getLimit(button);
    var popupLimit = this.getLimit(popup); 
    var left,right,top,bottom,style = {};
    if(rtl){
      right = buttonLimit.right;
      top = buttonLimit.bottom;
      left = right - popupLimit.width;
      bottom = top + popupLimit.height;
      if(left < parentLimit.left){style.left = parentLimit.left;}
      else{style.left = left;}
    }
    else{
      left = buttonLimit.left; 
      top = buttonLimit.bottom;
      right = left + popupLimit.width;
      bottom = top + popupLimit.height;
      if(right > parentLimit.right){style.left = parentLimit.right - popupLimit.width;}
      else{style.left = left}
    }
    if(bottom > parentLimit.bottom){
      if(popupLimit.height > buttonLimit.top - parentLimit.top){style.top = parentLimit.bottom - popupLimit.height;}  
      else{style.top = buttonLimit.top - popupLimit.height;}
    }
    else{
      style.top = buttonLimit.bottom;
    }
    if(animate){
      popup.css({...style,opacity:0,top:style.top + 60})
      popup.animate({top:style.top,opacity:1},{duration:150})
    }
    else{
      popup.css(style)
    }
    $('body').addClass('rdb-open');
  }
  // update(){
  //   return;
  //   var {rtl,openRelatedTo} = this.context;
  //   var popup = $(this.dom.current);
  //   var popupWidth = popup.width();
  //   var popupHeight = popup.height();
  //   var parent = openRelatedTo?popup.parents(openRelatedTo):undefined;
  //   parent = Array.isArray(parent) && parent.length === 0?undefined:parent;
  //   var bodyWidth = parent?parent.width():window.innerWidth;
  //   var bodyHeight = parent?parent.height():window.innerHeight;
  //   var offset = popup.offset();
  //   var popupLeft = offset.left;
  //   var popupRight = popupLeft + popupWidth;
  //   var popupTop = offset.top;
  //   var popupBottom = popupTop + popupHeight;
  //   if(parent){
  //     var parentOffset = parent.offset();
  //     popupLeft -= parentOffset.left;
  //     popupRight = popupLeft + popupWidth;
  //     popupTop -= parentOffset.top;
  //     popupBottom = popupTop + popupHeight;
  //   }
  //   if(rtl && popupLeft < 0){
  //     popup.css('right',popupLeft - 36);
  //   }
  //   else if(!rtl && popupRight > bodyWidth){
  //     popup.css('left', bodyWidth - popupRight - 36);
  //   }
  //   if(popupBottom > bodyHeight){
  //     popup.css({'bottom':'100%','top':'unset'});
  //   }
  // }
  componentDidMount(){
    this.update();
  }
  componentDidUpdate(){
    this.update();
  }
  getStyle(){
    var {rtl} = this.context;
    return {
      zIndex:1000,
      direction:rtl?'rtl':'ltr',
    };
  }
  getBackDropStyle(){
    return {height:'100%',width:'100%',right:0,top:0,position:'fixed',background:'rgba(0,0,0,0)'}
  }
  render(){
    var {search,items,toggle,getValue,rtl,hover,popupClassName} = this.context;
    var popupStyle = getValue(this.context.popupStyle);
    var {searchValue} = this.state;
    var Items = typeof items === 'function'? items(this.context):items.filter((item)=>{
      if(!searchValue){return true;}
      return item.text.indexOf(searchValue) !== -1
    }).map((item, i)=><ListItem key={i} item={item} index={i}/>)
    return(
      <div className={"rdb-popup " + (popupClassName?' ' + popupClassName:'') + (rtl?' rtl':' ltr')} ref={this.dom} style={this.getStyle()} onMouseEnter={()=>{if(hover){toggle(true)}}} onMouseLeave={()=>{if(hover){toggle(false)}}}>
        {!hover && <div onClick={()=>toggle(false)} style={this.getBackDropStyle()}></div>} 
        <div className="rdb-for-drop" style={popupStyle}>
          {
            search && 
            <div className='rdb-search'>
            <div className='rdb-search-icon'></div>
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
  render(){
    var {item} = this.props; 
    var {getValue,getIcon,getText,itemStyle,gap = 6,rtl} = this.context;
    var disabled = getValue(item.disabled);
    var text = getValue(item.text);  
    var checked = getValue(item.checked);
    var Icon = getIcon(item.icon,item.iconClass,item.iconStyle);
    var Text = getText(text,Icon);     
    var CheckIcon = checked !== undefined?(
      <Fragment>
        <div className='rdb-check-icon' style={{opacity:checked?1:0}}></div>
        <div className='rdb-gap' style={{width:gap}}></div>
      </Fragment>
    ):null;
    var href = getValue(item.href);
    var className = getValue(item.className);
    var props = {
      className:`rdb-list-item${className?' ' + className:''}${disabled?' disabled':''}`,
      style:getValue(itemStyle),onClick:this.click.bind(this),
    }
    return(
      <Fragment>
        {item.splitter &&<div className={'rdb-splitter ' + (rtl?'rtl':'ltr')}>{item.splitter}</div>}
        {href?<a href={href} {...props}>{Icon}{Text}</a>:<div {...props}>{CheckIcon}{Icon}{Text}</div>}
      </Fragment>
    );
  }
}

export default RDropdownButton;