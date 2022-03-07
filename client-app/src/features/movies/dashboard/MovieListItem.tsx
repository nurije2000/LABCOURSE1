import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Movie } from "../../../app/models/movie";
import {format} from 'date-fns';

interface Props{
    movie: Movie
}

export default function MovieListItem({movie}: Props){

    return(
<Segment.Group>
    <Segment>
        <Item.Group>
            <Item>
                <Item.Image size='tiny' circular src='/assets/user.png' />
                <Item.Content>
                    <Item.Header as={Link} to={`/movies/${movie.id}`}>
                        {movie.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
    <Segment>
        <span>
            <Icon name='clock' /> {format(movie.date!, 'dd MMM yyyy h:mm aa' )}
            <Icon name='marker' /> {movie.venue}
        </span>
    </Segment>
   
    <Segment clearing>
        <span>{movie.description}</span>
        <Button 
            as={Link}
            to={`/movies/${movie.id}`}
            color='pink'
            floated='right'
            content='View'
        />
    </Segment>
</Segment.Group>
    )
}