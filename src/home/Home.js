import React from 'react';
import '../App.css';
import SubmitButton from '../general/SubmitButton';
import UserStore from '../stores/UserStore';

function Home(){
    return(
  
        <div className="app">
        <div className = 'container'>
         Welcome { UserStore.userName}. You are on the main screen and here is most importent stuff presented
        <SubmitButton
            text = {'Log out'}
            disable={false}
            onClick={ () => this.doLogout()}
         />
        </div> 
     </div>
    )
}

export default Home;