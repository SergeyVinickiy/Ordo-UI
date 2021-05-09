import React from 'react';
import { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../general/Button';

const WeekTable = () => {
    const [week, setWeek] = useState([
        {
            'id' : '1',
            'day':'Sunday'
        },
        {
            'id' : '2',
            'day':'Monday'
        },
        {   
            'id' : '3',
            'day':'Tuesday'
        },
        {
            'id' : '4',
            'day':'Wednesday'
        },
        {
            'id' : '5',
            'day':'Thursday'
        },
        {
            'id' : '6',
            'day':'Friday'
        },
        {
            'id' : '7',
            'day':'Saturday'
        }
    ])

    const onClick = () => { console.log('Shifts was send to server and saved in db :))')}  
     
    return (

        <tbody>
        <tr>
          {week.map((dayOfTheWeek) => (<td 
          
          style={{
            border: 'solid 3px white',
            background: 'grey',
            color: 'black',
            fontWeight: 'bold',
          }}
          
          key={dayOfTheWeek.id}>{dayOfTheWeek.day}</td>
          ))}
        </tr>
        <tr>

        {week.map((dayOfTheWeek) => (<td 
          
          style={{
            border: 'solid 3px white',
            background: 'grey',
            color: 'black',
            fontWeight: 'bold',
          }}
          
          key={dayOfTheWeek.id}>{
              
             <FormGroup row>

                <FormControlLabel control={<Checkbox name="checkedC" />} label="Morning" />
                <FormControlLabel control={<Checkbox name="checkedC" />} label="Afternoon" />
                <FormControlLabel control={<Checkbox name="checkedC" />} label="Night" />
        
             </FormGroup>

        
              }</td>
          ))}

        </tr>
        
        <Button
                  text = 'Send'
                  onClick = {onClick}
        /> 
        
        
        </tbody>
      


  )
}

export default WeekTable
