import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function ActivityDetailedSidebar () {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='pink'
            >
                3 People saw this
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='red'
                            ribbon='right'
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Erza</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'red' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Gresa</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'red' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Fjola</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>

    )
})
