import { Label, Textarea } from 'flowbite-react';
import "./message.css"
import io from 'socket.io-client';
import { Button ,Spinner,FileInput ,Banner} from 'flowbite-react';
import { FaArrowCircleLeft,FaUpload } from 'react-icons/fa';
import { useEffect,useRef  ,useState} from 'react';
import { apiCall } from '../../utils/Utils';
import TypeingIcon from "../typeing-icon/TypeingIcon"
import Receivermessage from "./Receivermessage";
import { BASE_SOCKET_URL } from '../../utils/config';
import EmojiPicker from 'emoji-picker-react';
import ChatImages from './ChatImages';
var socket, selectedChatCompare;
const Message = (props)=>{
const [show, setOpenModal] = useState(false);
const [messages, setMessages] = useState([]);
const [message, setMessage] = useState('');
const [socketConnected, setSocketConnected] = useState(false);
const [istyping, setIsTyping] = useState(false);
const [userData,setUserData] = useState()
const [pages,setPages] = useState(1)
const [loader,setLoading] = useState(false)
const [images,setImage] = useState([]);

let dateTime;
let hour;
const chatContainerRef = useRef(null);
// console.log(" props",props.userId)
// io('http://localhost:4999',{ transports: ['websocket', 'polling', 'flashsocket'] }); // Replace with your server URL
useEffect(() => {
// =  JSON.parse(localStorage.getItem('getToken'));
if(props?.chatMessage){
setMessages(props?.chatMessage)
}
//192.168.1.3
//localhost
socket = io(BASE_SOCKET_URL,{ transports: ['websocket', 'polling', 'flashsocket'] })
socket.emit("setup",props.userId);
socket.on("connected", () => setSocketConnected(true));
socket.on("typing", () => setIsTyping(true));
socket.on("stop typing", () => setIsTyping(false));
const userInfo =  JSON.parse(localStorage.getItem('getToken'));
setUserData(userInfo)
// eslint-disable-next-line
}, []);
useEffect(() => {
  console.log(" preview messages",messages)
socket.on("message recieved", (newMessageRecieved) => {
 console.log(" Message recived",newMessageRecieved)
 
setMessages([...messages, newMessageRecieved]);
// console.log("  recived ked bad",messages)
});
},[messages]);



const sendMessage =async () => {
// join room 
socket.emit("stop typing",userData.id);
setIsTyping(false)
const payload = {
receiver_id:userData.id,
sender_id:props.userId,
message:message,
images:images.length > 0 ? images :[],
}

socket.emit("new message", payload);
setMessages([...messages, payload]);
const mesaageRes = await apiCall("POST",`/user/send-message`,payload,true);
setMessage('');
setImage([]);
};

const handleInputMessage = ($event)=>{
setIsTyping(true)
socket.emit("typing",userData.id);
setMessage($event.target.value)
//setMessage(message)

}
// emoji code
const onEmojiClick = ($event)=>{
  // console.log(" emoji ",$event.emoji)
    let msg  = message.concat(" ",$event?.emoji);
 //  setMessage([...message,$event.emoji])
 setMessage(msg)
 
   setOpenModal(false);
  // console.log(" emoji ",message)
}
const openModalEmoji = ()=>{
   console.log(" hello ===")
   setOpenModal(!show);
    
   //console.log(" he emoji",$event.target.value)
}

// scrolling code // 
const loadMessages = async(page) => {
  setLoading(true)
   // Implement your logic to fetch messages for the specified page
   // (e.g., from an API).
   const userInfo =  JSON.parse(localStorage.getItem('getToken'));
   const payload = {
     receiver_id:userData.id,
     sender_id:userInfo?.id,
     page:page
    }
   const userRes = await apiCall("POST",`/user/get-single-chat-message`,payload,true);
   if(userRes?.data?.status==200){
      setMessages([...messages, ...userRes?.data?.data]);
      setLoading(false)
     return userRes?.data?.data
   }else{
      return []
   }
 };
const loadMoreMessages = () => {
  // console.log(" hello loadMoreMessages")
   // Implement your logic to fetch older
   // messages here and append them to the messages state.
  // if (!loading) {
      //setLoading(true);
      const nextPage = pages + 1;
      loadMessages(nextPage)
        .then((newMessages) => {
          if (newMessages.length > 0) {
            // setMessages([...messages, ...newMessages]);
            setPages(nextPage);
          }
        })
        .finally(() => {
          setLoading(false);
        });
   // }
 };

 const handleScroll = (e) => {
   const chatBox = e.target;
    if (
      chatBox.scrollTop === 0 &&
      pages * 10 <= messages.length
    ) {
      loadMoreMessages();
    }
 };


 // images uploaded // 
 const handleImages =async ($event)=>{
  // console.log(" h",$event.target.files[0].name)
   // const files =$event.target.files[0].name
    const formData = new FormData();
    formData.append('file', $event.target.files[0]);
    formData.append('file', $event.target.files[0].name);
    setLoading(true)
 const userRes = await apiCall("POST",`/user/chat-file`,formData,true);
 //console.log(" userRes?.data? ", userRes?.data)
 //console.log(" images --------? ", userRes?.data?.data)
   if(userRes?.data?.status==200){
   // console.log("======",userRes?.data?.data)
    setImage([...images,userRes?.data?.data]);
   // console.log("======",images)
      setLoading(false)
   }else{
      return []
   }


 }

const handleRedirect = ()=>{
props.handlePages()
}
return(
<div class="grid grid-rows-2 grid-flow-col gap-1">
   <div class="row-span-6 ..."></div>
   <div class="col-span-0 disply">
      <div class="chat-containter">
         <div class="chat-header">
            <span onClick={handleRedirect}>
               <FaArrowCircleLeft className="h-7 w-7"/>
            </span>
            Chat With {props?.name}
         </div>
         <div id="chat" class="chat" ref={chatContainerRef} 
         onScroll={handleScroll}>
             { /*  loader message show code start  */ }
             {loader ? <Spinner aria-label="Default status example" /> :''}
          
          { /*  loader message show code end  */ }
           { /*  message list start  */ }
            {messages.length > 0 && messages.reverse().map((msg, index) =>
            <Receivermessage
               loginUserId={userData.id} sender_id={msg.sender_id} chat={msg} />
            )}
              { /*  message list end  */ }
         { /*  emoji show and hide code start */ }
            {show ? <EmojiPicker
             onEmojiClick = {($event)=>onEmojiClick($event)}
              />
              :''}
             { /*  emoji show and hide end  */ }
              { /*  typeing  start  */ }
            <p>
               {istyping ? 
               <TypeingIcon/>
               :'' }
            </p>
             { /*  typeing  end  */ }
         </div>
        
        <div className="mess">
        { /*  send message start  */ }
          <div>
            <div class="message-input">
                <input type="text"
                  onChange={($event)=>handleInputMessage($event)} 
                value={message}
                placeholder="Type your message..."/>
                <Button label="2" onClick={sendMessage}>Send</Button>
            </div>
          </div>
          { /*  send message end  */ }
          <div >
          <Banner>
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
        { /*  emoji code and file uploaded start  */ }
          <p className="flex items-center text-sm font-normal
           text-gray-500 dark:text-gray-400">
             <span className='cursor-pointer' onClick={openModalEmoji}  > 😀 </span>
             <span className='cursor-pointer'
               > 
              <FileInput id="file" onChange={($event)=>handleImages($event)}/></span><br/></p>
       { /*  emoji code and file uploaded end  */ }
              
        </div>
        { /*  loader images uploaded and show images component  start  */ }
        {loader ? <Spinner aria-label="Default status example" /> :''}
        <span>{images ? <ChatImages images={images} /> :''} </span>
        { /*  loader images uploaded  and show images component  end  */ }
      </div>
    </Banner>
          
          </div>   
        </div>
        { /*  send message end  */ }
         
      </div>
          
   </div>
</div>
)
}
export default Message;
