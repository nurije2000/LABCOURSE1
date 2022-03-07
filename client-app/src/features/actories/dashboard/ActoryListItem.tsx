import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Actory } from "../../../app/models/actory";
import {format} from 'date-fns';

interface Props{
    actory: Actory
}

export default function ActoryListItem({actory}: Props){

    return(
<Segment.Group>
    <Segment>
        <Item.Group>
            <Item>
                <Item.Image size='tiny' circular src='/assets/user.png' />
                <Item.Content>
                    <Item.Header as={Link} to={`/actories/${actory.id}`}>
                        {actory.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
    <Segment>
        <span>
            <Icon name='clock' /> {format(actory.date!, 'dd MMM yyyy h:mm aa' )}
            <Icon name='marker' /> {actory.venue}
        </span>
    </Segment>
   
    <Segment clearing>
        <span>{actory.description}</span>
        <Button 
            as={Link}
            to={`/actories/${actory.id}`}
            color='pink'
            floated='right'
            content='View'
        />
    </Segment>
</Segment.Group>
    )
}