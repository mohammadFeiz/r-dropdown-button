import React,{Component,Fragment,createRef,createContext} from 'react';
import $ from 'jquery'
import './index.css';

const dpContext = createContext();
class RDropdownButton extends Component {
    constructor(props){
      super(props);
      this.state = {open:this.props.open || false,searchValue:''}
      this.dom = createRef();
      this.touch = 'ontouchstart' in document.documentElement;
    }
    toggle(state = !this.state.open){
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(()=>{
        if(state === this.state.open){return}
        this.setState({open:state,searchValue:''});
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
      if($(e.target).parents('.rdb-checkeds').length !== 0){return;}
      var {items,onClick = ()=>{}} = this.props;
      if(items){this.toggle(true);}
      else{onClick(this.props);}
    }
    showPopup(){
      var {items} = this.props;
      var {open} = this.state;
      if(!open){return false;}
      if(items !== undefined){return true;}
      return false
    }
    getIcon(icon,iconClass,iconStyle){
      if(icon){return <div className={'rdb-icon'} style={this.getValue(iconStyle)}>{this.getValue(icon)}</div>}
      if(iconClass){
        return (
         <div className={'rdb-icon ' + this.getValue(iconClass)} style={this.getValue(iconStyle)}></div>
        )
      }
      return null;
    }
    getBadge(badge){
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
    itemClick(index,e){
      if($(e.target).parents('.rdb-after').length !== 0){return;}
      var item = this.items[index];
      var {onClick,checkField} = this.props;
      var disabled = this.getValue(item.disabled);
      if(disabled){return;}
      var checked = this.getValue(item[checkField])
      if(item.onClick){item.onClick(item,index,this.context);}
      else if(onClick){onClick(item,index,this.context);} 
      if(item.close !== false && checked === undefined ){this.toggle();}
    }
    getCaret(){
      var {items,caret} = this.props;
      if(!items || !caret){return '';}
      if(caret === true){
        return <Fragment><div style={{flex:1}}></div><div className='rdb-caret default'></div></Fragment>;
      }
      if(typeof caret === 'string'){return <div className={caret}></div>}
      return caret;
    }
    render(){
        var id = this.getValue(this.props.id);
        var disabled = this.getValue(this.props.disabled);
        var title = this.getValue(this.props.title);
        var className = this.getValue(this.props.className); 
        var rtl = this.getValue(this.props.rtl); 
        var style = this.getValue(this.props.style); 
        var icon = this.getValue(this.props.icon); 
        var text = this.getValue(this.props.text); 
        var Icon = this.getIcon(icon,this.props.iconClass,this.props.iconStyle);
        var Text = this.getText(text,Icon); 
        var hover = this.getHoverEnabled();
        var badge = this.getValue(this.props.badge);
        var {items,type,onClick=()=>{},checkField,caret} = this.props;
        var {searchValue} = this.state;
        var content = typeof items === 'function'?items(this.context):items;
        var checks = [];
        var Items;
        if(!Array.isArray(content)){Items = content;}
        else{
          let filteredItems = content.filter((item)=>{
            if(item[checkField]){checks.push(item)}
            if(!searchValue){return true;}
            if(item.text === undefined){return true;}
            return item.text.indexOf(searchValue) !== -1
          });
          this.items = filteredItems;
          Items = filteredItems.map((item, i)=>{
            if(item.html){
              return <Fragment key={i}>{this.getValue(item.html)}</Fragment>;
            }
            return <ListItem key={i} item={item} index={i}/>
          })
        }
        var contextValue = {...this.props,items:Items,getIcon:this.getIcon.bind(this),getText:this.getText.bind(this)};
        contextValue.toggle = this.toggle.bind(this);
        contextValue.SetState = (obj)=>this.setState(obj);
        contextValue.getValue = this.getValue.bind(this);
        contextValue.itemClick = this.itemClick.bind(this);
        contextValue.hover = hover
        var props = {
          id,
          className:`r-dropdown-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
          style:$.extend({},{direction:rtl?'rtl':'ltr'},this.getValue(style)),
          disabled,title,
          ref:this.dom,
          onClick:this.click.bind(this),
          onMouseEnter:hover?()=>this.toggle(true):undefined,
          onMouseLeave:hover?()=>this.toggle(false):undefined,
          tabIndex:0
        }
        var Caret = this.getCaret();
        var Badge = this.getBadge(badge);
        return (
          <dpContext.Provider value={contextValue}>
              {
                type === 'multiselect' &&
                <div className='rdb-multiselect' style={{width:props.style.width}}>
                  <button {...props}>{Icon} {Text} {Caret} {Badge}</button>
                  {
                    checks.length !== 0 &&
                    <div className={'rdb-checkeds' + (rtl?' rtl':'')}>
                      {
                        checks.map((check)=>{return (
                          <div className='rdb-checked' onClick={()=>onClick(check)}>
                            <div className='rdb-checked-close'></div>
                            <div className='rdb-checked-text'>{check.text}</div>
                          </div>
                        )})}
                    </div>
                  }
                </div>
                
              }
              {type !== 'multiselect' && <button {...props}>{Icon} {Text} {Caret} {Badge}</button>}
              {this.showPopup() && <Popup ref={this.popup}/>}
              
          </dpContext.Provider>
        );
    }    
}
RDropdownButton.defaultProps = {checkField:'checked'}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
    this.activeIndex = false;
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
  update(){
    var {rtl,openRelatedTo,animate,dropdownType,type} = this.context;
    var popup = $(this.dom.current);
    var button = type === 'multiselect'?popup.prev().find('.r-dropdown-button'):popup.prev();
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
    top = buttonLimit.bottom;
    bottom = top + popupLimit.height;  
    if(dropdownType === 'fit'){
      style.left = buttonLimit.left;
      style.width = buttonLimit.width;
    }
    else if(dropdownType === 'center'){
      style.left = `calc(50% - ${popupLimit.width / 2}px)`
    }
    else if(rtl){
      right = buttonLimit.right;
      left = right - popupLimit.width;
      if(left < parentLimit.left){style.left = parentLimit.left;}
      else{style.left = left;}
    }
    else{
      left = buttonLimit.left; 
      right = left + popupLimit.width;
      if(right > parentLimit.right){style.left = parentLimit.right - popupLimit.width;}
      else{style.left = left}
    }
    if(dropdownType === 'center'){
      style.top = `calc(50% - ${popupLimit.height / 2}px)`
    }
    else if(bottom > parentLimit.bottom){
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
    popup.focus();
    $('body').addClass('rdb-open');
  }
  componentDidMount(){
    this.update();
  }
  getStyle(){
    var {rtl} = this.context;
    return {
      direction:rtl?'rtl':'ltr',
    };
  }
  getBackDropStyle(){
    var {backdropStyle} = this.context;
    return {height:'100%',width:'100%',right:0,top:0,position:'fixed',background:'rgba(0,0,0,0)',...backdropStyle}
  }
  keyDown(e){
    console.log(e.keyCode);
    if(e.keyCode === 40){
      e.preventDefault();
      var items = $(this.dom.current).find('.rdb-list-item')
      var active = items.filter('.active');
      if(active.length === 0){
        this.activeIndex = 0;
        items.eq(0).addClass('active');
      }
      else{
        let index = active.attr('dataindex');
        index++;
        if(index >= items.length){
          index = 0;
        }
        items.removeClass('active');
        this.activeIndex = index;
        items.eq(index).addClass('active').focus();
      }
    }
    else if(e.keyCode === 38){
      e.preventDefault();
      var items = $(this.dom.current).find('.rdb-list-item')
      var active = items.filter('.active');
      if(active.length === 0){
        this.activeIndex = items.length - 1;
        items.eq(items.length - 1).addClass('active');
      }
      else{
        let index = active.attr('dataindex');
        index--;
        if(index < 0){
          index = items.length - 1;
        }
        items.removeClass('active');
        this.activeIndex = index;
        items.eq(index).addClass('active').focus();
      }
    }
    else if(e.keyCode === 13){
      let {itemClick} = this.context;
      if(this.activeIndex !== false){
        itemClick(this.activeIndex);
      }
    }
    else if(e.keyCode === 27){
      let {toggle} = this.context;
      toggle();
    }
  }
  render(){
    var {search,items,toggle,getValue,rtl,hover,popupClassName,searchValue,SetState,placeHolder} = this.context;
    var popupStyle = getValue(this.context.popupStyle);
    
    
    return(
      <div className={"rdb-popup-container " + (popupClassName?' ' + popupClassName:'') + (rtl?' rtl':' ltr')} ref={this.dom} style={this.getStyle()} onMouseEnter={()=>{if(hover){toggle(true)}}} onMouseLeave={()=>{if(hover){toggle(false)}}} onKeyDown={this.keyDown.bind(this)} tabIndex={0}>
        {!hover && <div className='rdb-backdrop' onClick={()=>toggle(false)} style={this.getBackDropStyle()}></div>} 
        <div className="rdb-popup" style={popupStyle}>
          {
            search && 
            <div className='rdb-search'>
            <div className={'rdb-search-icon' + (searchValue?' rdb-search-icon-filled':'')} onClick={()=>{this.setState({searchValue:''})}}></div>
            <input type='text' value={searchValue} placeholder={placeHolder} onChange={(e)=>{
                if(typeof search === 'function'){
                  search(e.target.value);
                  return;
                }
                SetState({searchValue:e.target.value})
              }}
            />
            </div>
          }
          <div className='rdb-items'>{items}</div>
          
        </div>
      </div>
    );
  }
}
class ListItem extends Component{
  static contextType = dpContext;
  
  getText(text,icon){
      if(text === undefined || text === ''){return ''}
      if(icon === null){return <div className='rdb-text' title={text}>{text}</div>;}
      var {gap = 6} = this.props;
      return (
        <Fragment>
          <div className='rdb-gap' style={{width:gap}}></div>
          <div className='rdb-text' title={text}>{text}</div>
        </Fragment>
      )
    }
  render(){
    var {item,index} = this.props; 
    var {getValue,getIcon,itemClick,gap = 8,rtl,checkField} = this.context;
    var disabled = getValue(item.disabled);
    var text = getValue(item.text);  
    var checked = getValue(item[checkField]);
    var after = getValue(item.after);
    var After = after?<div className='rdb-after'>{after}</div>:'';
    this.checked = checked;
    var Icon = getIcon(item.icon,item.iconClass,item.iconStyle);
    var Text = this.getText(text,Icon);     
    var CheckIcon = checked !== undefined?(
      <Fragment>
        <div className={'rdb-check-icon' + (checked?' checked':'')}></div>
        <div className='rdb-gap' style={{width:gap}}></div>
      </Fragment>
    ):null;
    var href = getValue(item.href);
    var className = getValue(item.className);
    var props = {
      className:`rdb-list-item${className?' ' + className:''}${disabled?' disabled':''}`,
      style:getValue(item.style),onClick:(e)=>itemClick(index,e),title:'',dataindex:index,tabIndex:0
    }
    return(
      <Fragment>
        {item.splitter &&<div className={'rdb-splitter ' + (rtl?'rtl':'ltr')}>{item.splitter}</div>}
        {href?<a href={href} {...props}>{Icon}{Text}{After}</a>:<div {...props}>{CheckIcon}{Icon}{Text}{After}</div>}
      </Fragment>
    );
  }
}

export default RDropdownButton;