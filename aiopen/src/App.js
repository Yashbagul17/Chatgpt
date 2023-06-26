import SmartToyIcon from '@mui/icons-material/SmartToy';
import {Box,Text,Input} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';



const App = () => {

  const hell = useRef(null);
  const [msg,setmsg] = useState('');
  const [allmsg,setallmsg] = useState([
    {
    message:'How may i Help you ??.',
    user:'#444654'
  },
]);
 useEffect(()=>{
   hell.current?.scrollIntoView();
 },[allmsg])

  const sendtobackend = async(e) =>{
    e.preventDefault();
    if(msg.message ==='') return;
    let newmessage = [...allmsg,{message:msg,user:'#343541'}]
   await setallmsg(newmessage);
    setmsg('');
    const response = await fetch("http://localhost:1000/",{
      method:"POST",
      headers:{
       'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        message:msg
      })
    });
    const data = await response.json();

    newmessage = [...newmessage, {message:data.message,user:'#444654'}]

   await setallmsg(newmessage);
    

  }
  return (
    <>
    <Box
    w='100vw'
    h='90vh'
    overflowY={'scroll'} 
   
    >
      {
        allmsg.map((target,index)=>(
  <Box
   key={index}
      display={'flex'}
      padding={'0 20%'}
      mt='2rem'
      bg={target.user}
      >
        
        {target.user==='#444654'? <SmartToyIcon style={{marginRight:'1rem',fontSize:'2.2rem', marginTop:'5px'}}/> : <PersonIcon style={{marginRight:'1rem', marginTop:'5px',fontSize:'2.2rem'}}/>}
      <Text 
      p='1rem'>
        {target.message}
      </Text>
      </Box>
        ))
      }
      <div ref={hell}></div>
    </Box>


    <Box w='100vw'
    >
     
        <Input
         display={'block'}
         outline={'none'}
         value={msg}
        //  border='1px solid white'
        onChange={(e)=>setmsg(e.target.value)}
         border={'none'}
          boxShadow="0px 5px 20px rgba(0,0,0,0.3)"
        type='text'
        placeholder='Asm someting...'
        w='60vw'
       margin={'auto'}
         bg={'none'}
         p='0.7rem' 
        />

       <SendIcon 
        onClick={sendtobackend}      
       style={{position:'absolute',bottom:'6vh',right:'18vw'}} />
    </Box>
    </>
  )
}

export default App
