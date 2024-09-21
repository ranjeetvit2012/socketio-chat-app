import "./message.css"
import { useState,useEffect } from "react"
import SenderMessage from "./SenderMessage"
import ChatImages from "./ChatImages"
const Receivermessage = (props)=>{

    console.log("receiver message",props.chat.images)
    return(
        <div>
      {props.sender_id==props.loginUserId?<SenderMessage images = {props.chat.images} chat={props.chat.message} />:
      <div class="message right">
        <p class="message-text">{props?.chat?.message}
        <p>
        {props.chat.images && <ChatImages images={props.chat.images} /> } 
        </p>
      </p></div>
}
      
        </div>
    )
}

export default Receivermessage;