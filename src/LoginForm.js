import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './general/SubmitButton';
import UserStore    from './stores/UserStore';
import axios        from 'axios';

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userName : '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    //max userName and password value
    if(val.length > 12){
      return;
    }
    this.setState({
      [property]: val
    })
  }

    //If something goes incorrect
    resetForm(){
      this.setState({
        userName: '',
        password: '',
        buttonDisabled: false
      })
    }

    //for login api
    async doLogin(){

      if(!this.state.userName){
        return;
      }
      if(!this.state.password){
        return;
      }
      this.setState({
        buttonDisabled : true
      })
      try{ 
        let response = await axios.post(
          'https://ordo-ui.herokuapp.com/api/v1/auth/login',
          {
            username: this.state.userName,
            password: this.state.password
          },
         { headers: { 'Content-Type': 'application/json',
          'Accept' : 'application/json',
        }
       
      })

          if(response.status === 200){
            UserStore.isLoggedIn = true;
            UserStore.userName = response.data.username;
          }
          else if(response !== 200){

            this.resetForm();
            alert(response.msg);
          
          }
      }
      catch(e){
        console.log(e);
        this.resetForm();
      }


    }


  render(){
    return (
      <div className="loginForm">
        Welcome to ordo
        <InputField 
          type = 'text'
          placeholder = 'User name'
          value = {this.state.userName ? this.state.userName : ''}
          onChange = { (val) => this.setInputValue('userName', val)}
        />

        <InputField 
          type = 'password'
          placeholder = 'Password'
          value = {this.state.password ? this.state.password : ''}
          onChange = { (val) => this.setInputValue('password', val)}
        />


        <SubmitButton
          text = 'Log In'
          disabled = {this.state.buttonDisabled}
          onClick = { () => this.doLogin()}
        />

      </div>
    );
  }
}

export default LoginForm;
