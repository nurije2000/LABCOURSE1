import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters(){
    return(
        <>
         <Menu vertical size='large' style={{width: '100%,marginTop:25 '}}>
            <Header icon='filter' attached color='black' content='Snacks' />
            <Menu.Item content="Drinks"/>
            <Menu.Item content="Popcorn" />
            <Menu.Item content="Chocolate" />
            <Menu.Item content="Cola" />
            <Menu.Item content="Chips" />
            <Menu.Item content="..." />
        </Menu>
        <Header />
        <Calendar   />

        </>
       
    )
}