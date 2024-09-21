import { Table,Tooltip  } from 'flowbite-react';
import { useEffect,useState } from 'react';
import { Pagination } from 'flowbite-react';
import { FaRocketchat } from "react-icons/fa6";
import { apiCall } from '../../utils/Utils';
import Message from './Message';
const UserList = ()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount,setPagesCount] = useState(0)
    const [userData,SetUserData] = useState()
    const [chat,setChat] = useState(false);
    const [propsData,setPropsData] = useState();
    const [messages, setMessages] = useState();
    const onPageChange = (page) => setCurrentPage(page);
       
    useEffect( ()=>{
        fetchTitle();
     },[currentPage])

  const fetchTitle = async () => {
    const userInfo =  JSON.parse(localStorage.getItem('getToken'));
    const userRes = await apiCall("GET",`/user/user-list/${currentPage}/${userInfo?.id}`,'',true);
        if(userRes?.data?.status==200){
            SetUserData(userRes?.data?.data)
            setPagesCount(userRes?.data.totalCount)
        }
  };
     const handleMessage =async (id,name)=>{
      
      setPropsData({name:name,id:id})
     // console.log(" id",id,"propsData",propsData)
      const userInfo =  JSON.parse(localStorage.getItem('getToken'));
      const payload = {
        receiver_id:id,
        sender_id:userInfo?.id,
        page:1
       }
       setMessages()
      const userRes = await apiCall("POST",`/user/get-single-chat-message`,payload,true);
      if(userRes?.data?.status==200){
        setPropsData({name:name,id:id})
        setMessages(userRes?.data?.data)
          // console.log(" userRes?.data?.data mesaage ",userRes?.data?.data)
       
        setChat(true)
       
      }else{
        setChat(true)
      }
        
     }
const handlePages = ()=>{
    setChat(false)
}
    return(
  <> {
    chat ? <Message
     name={propsData.name}
      userId={propsData.id}
      chatMessage = {messages}
      handlePages = {handlePages}
      /> :

  
  
    <div class="grid grid-rows-2 grid-flow-col gap-1">
       
  <div class="row-span-6 ..."></div>
  <div class="col-span-0" style={{ marginTop: -88,marginRight:-54}}>
  <Table>
          
          <Table.Head>
            <Table.HeadCell>
               name
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userData?.map((data)=>(
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell 
              className="whitespace-nowrap font-medium
               text-gray-900 dark:text-white" >
                <p onClick={()=>{handleMessage(data._id,data.name)}}>
                {data.name}
                </p>
               
              </Table.Cell>
             
            </Table.Row>
            ))}
            
            
            
          </Table.Body>
         
         
          <Pagination
            currentPage={currentPage}
            layout="pagination"
            nextLabel="Go forward"
            onPageChange={page=>{setCurrentPage(page)}}
            previousLabel="Go back"
            showIcons
            totalPages={pagesCount}
          />
        </Table>
  </div>
  
</div>
  }
</>

    )
}

export default UserList