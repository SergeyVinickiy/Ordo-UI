import React from 'react';
import {observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import WeekTable from './sendShifts/WeekTable';
import './App.css';
import Navigation from './Navigation';
import Profile from './profile/Profile';
import Home from './home/Home'
import {BrowserRouter as Router, Switch, Route}from  'react-router-dom';


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
            <div>
              <Router>
                <Navigation />
                  <Switch>  
                    <Route path = "/" exact component = {Home}/>
                    <Route path = "/profile" component = {Profile}/>
                    <Route path = "/options" component = {WeekTable}     />
                    </Switch>
                  </Router>

            </div>
          );

        }
        return (
          <div className="app">
               <div className = 'container'>
                  <LoginForm/>
               </div>
          </div>
      );
    }
  }
}

export default observer(App);
