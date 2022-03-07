import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActoryFilters(){
    return(
        <>
         <Menu vertical size='large' style={{width: '100%,marginTop:25 '}}>
            <Header icon='filter' attached color='black' content='Actor' />
            <Menu.Item content="Robin Williams-comedy"/>
            <Menu.Item content="Billy Porter-drama " />
            <Menu.Item content="Jennifer Lopez-romance" />
            <Menu.Item content="Vincent Price-horror" />
            <Menu.Item content="Tom Cruise-action" />
            <Menu.Item content="..." />
        </Menu>
        <Header />
        <Calendar   />

        </>
       
    )
}