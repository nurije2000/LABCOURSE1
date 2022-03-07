import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function MovieFilters(){
    return(
        <>
         <Menu vertical size='large' style={{width: '100%,marginTop:25 '}}>
            <Header icon='filter' attached color='black' content='Movies' />
            <Menu.Item content="Comedy"/>
            <Menu.Item content="Drama" />
            <Menu.Item content="Romance" />
            <Menu.Item content="Horror" />
            <Menu.Item content="Thriller" />
            <Menu.Item content=".." />
        </Menu>
        <Header />
        <Calendar   />

        </>
       
    )
}