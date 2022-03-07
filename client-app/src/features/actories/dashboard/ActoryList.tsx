import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import {Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActoryListItem from './ActoryListItem';


export default observer(function ActoryList(){
    const {actoryStore} = useStore();
    const {groupedActories} = actoryStore

    return(
        <>
        {groupedActories.map(([group, actories])=>(
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
        {actories.map(actory => (
            <ActoryListItem key={actory.id} actory={actory} />
              ))}
            </Fragment>
           ))}
        </>
    )
})