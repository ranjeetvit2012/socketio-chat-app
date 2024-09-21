import "./message.css"
import ChatImages from "./ChatImages";
const SenderMessage = (props)=> {
  //console.log("Sender message",props)
    return(<div>
        <div class="message left">
      <p class="message-text">{props.chat}
      <p>
      {props?.images ? <ChatImages images={props.images} /> :''} 
      </p>
      </p>
      </div>
    </div>)
}

export default SenderMessage;