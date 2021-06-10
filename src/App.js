import React, {useState, useEffect} from 'react';
import { FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {

  const[input, setInput] = useState('');
  const[messages, setMessages] = useState([]);
  const[username, setUsername] = useState('');

  //useState = variable in react
  //useEffect = run code on a condition in REACT

  //run once when the app component loads
  useEffect(() => {
    //TODO: makin this function to pull data from forestore when ever the app component loads

    db.collection('messages')
    .orderBy("timestamp", 'desc')
    .onSnapshot(snapshot => {
      //console.log(snapshot);
      //console.log(snapshot.docs.map(doc => doc.data()))
      setMessages(snapshot.docs.map(doc =>(
        {id: doc.id ,
         message: doc.data()
        })))

      console.log(snapshot.docs.map(doc =>(
        {id: doc.id ,
         message: doc.data()
        })))
    })

  }, [])

  useEffect(() => {
    // run the code here...,

    setUsername(prompt('Enter your name'));

  }, []) //the condition (if its blank than this code euns when the site loads) 
 
  // console.log(input);

  //TODO: all the logic to send messages here
  const sendMessage = (e) => {

    e.preventDefault(); //it disables from refresh

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //TODO: we have connected the data base so we dont need to set state anymore
    // setMessages([...messages, { username: username, message: input }]); //above syntax gonna save the existing messages but at the same time appends input to the array
    setInput('');
    
  }

  // console.log(messages);
  return (
    <div className="App" >
      <img src="https://scontent-maa2-1.xx.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-3&_nc_sid=6825c5&_nc_ohc=-_rkq_N6YeoAX_DZKOC&_nc_ht=scontent-maa2-1.xx&oh=ca418a1806fb8ca6bdbe1f782a04c821&oe=60A8D87D"
      alt="messenger"/>

      <h2>Welcome  {username}</h2>

      {/* basic features -> */}
      {/* {

        input field
        send button
        messages themselves

      } */}

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder='Enter a message...' value={input} onChange={e => setInput(e.target.value)} />
          <IconButton className="app__iconButton"  variant="contained" color="primary" type='submit' disabled={!input} onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
      {
        messages.map( ({ id, message })  => (

          <Message key={id} username={username} message={message} />

        ))
      }
      </FlipMove>

    </div>
  );
}

export default App;
