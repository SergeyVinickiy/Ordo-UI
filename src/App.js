import React from 'react';
import {observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import Button from './components/Button';
import WeekTable from './components/WeekTable';
import './App.css';
import ShiftOptions from './components/ShiftOptions';


class App extends React.Component{


async componentDidMount(){

    try{

        let res = await fetch('/isLogedIn', {

          method: 'post',
          headers: {
            'Accept' : 'application.json',
            'Content-Type' : 'application.json'
          }
        });

        let result = await res.json();
        if(result && result.success){

          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.userName = result.userName;

        }
        else{
          UserStore.loading = false;
          UserStore.isLoggedIn = false;
        }

    }
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
}


async doLogout(){
    try{

      let res = await fetch('/logout', {

          method: 'post',
          headers: {
            'Accept' : 'application.json',
            'Content-Type' : 'application.json'
          }
      });

      let result = await res.json();
      if(result && result.success){

          UserStore.isLoggedIn = false;
          UserStore.userName = '';

      }
    }
    catch(e){
     console.log(e)
    }

}


  render(){
    const onClick = () => { console.log('Shifts was send to server and saved in db :))')}
      if(UserStore.loading){
        return(
          <div className="app">
             <div className = 'container'>
               Loading, please wait..
             </div> 
          </div>
        );
      }
      else{
        if(UserStore.isLoggedIn){

          return(
            <div className="app">
               <div className = 'container'>
                Welcome { UserStore.userName}. You are loged in


                <WeekTable />
                <Button
                  text = 'Send'
                  onClick = {onClick}
                  />
                <SubmitButton
                
                  text = {'Log out'}
                  disable={false}
                  onClick={ () => this.doLogout()}
                
                />
               </div> 
            </div>
          );

        }
        return (
          <div className="app">
               <div className = 'container'>
               
               <LoginForm
               
               />


               </div>
          </div>
        );

        }
  }
}

export default observer(App);
