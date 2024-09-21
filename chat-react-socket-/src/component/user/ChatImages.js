
import "./message.css"
const ChatImages = ({images})=>{
  //  console.log(" hello images ",images)
    return(
        <div>
            {images && images.map((data)=><img src={data}  className="chat-images" alt="Avatar" />)} 
        </div>
    )
}


export default ChatImages