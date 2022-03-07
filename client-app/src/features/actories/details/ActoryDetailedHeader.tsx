import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Actory} from "../../../app/models/actory";
import {format} from 'date-fns';

const actoryImageStyle = {
    filter: 'brightness(30%)'
};

const actoryImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    actory: Actory
}

export default observer (function ActoryDetailedHeader({actory}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/categoryImages/${actory.category}.jpg`} fluid style={actoryImageStyle}/>
            <Segment style={actoryImageTextStyle} basic>
            <Item.Group>
            <Item>
             <Item.Content>
            <Header
             size='huge'
            content={actory.title}
            style={{color: 'white'}}
            />
            <p>{format(actory.date!, 'dd MMM yyyy')}</p>
            <p>
             Hosted by <strong>Bob</strong>
            </p>
            </Item.Content>
            </Item>
            </Item.Group>
            </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                
            <Button as={Link} to='/actories' >Cancel attendance</Button>
                <Button as={Link} to={`/manageActory/${actory.id}`}  color='red' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})
