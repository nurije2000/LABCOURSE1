import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Movie} from "../../../app/models/movie";
import {format} from 'date-fns';

const movieImageStyle = {
    filter: 'brightness(30%)'
};

const movieImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    movie: Movie
}

export default observer (function MovieDetailedHeader({movie}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/categoryImages/${movie.category}.jpg`} fluid style={movieImageStyle}/>
            <Segment style={movieImageTextStyle} basic>
            <Item.Group>
            <Item>
             <Item.Content>
            <Header
             size='huge'
            content={movie.title}
            style={{color: 'white'}}
            />
            <p>{format(movie.date!, 'dd MMM yyyy')}</p>
            <p>
             Hosted by <strong>Bob</strong>
            </p>
            </Item.Content>
            </Item>
            </Item.Group>
            </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                
            <Button as={Link} to='/movies' >Cancel attendance</Button>
                <Button as={Link} to={`/manageMovie/${movie.id}`}  color='red' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})
