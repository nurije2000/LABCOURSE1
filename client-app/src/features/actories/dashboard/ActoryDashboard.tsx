import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActoryFilters from './ActoryFilters';
import ActoryList from './ActoryList';


export default observer(function ActoryDashboard(){

    const {actoryStore} = useStore();
    const {loadActories, actoryRegistry} = actoryStore;

        useEffect(() => {
          if(actoryRegistry.size ===0 ) loadActories();
        }, [actoryRegistry.size, loadActories])
      
        if (actoryStore.loadingInitial) return <LoadingComponent content='Loading actories...' />


    return(
        <Grid>
            <Grid.Column width='10'>
      <ActoryList />
            </Grid.Column>
            <Grid.Column width='6'>
               <ActoryFilters />
            </Grid.Column>
        </Grid>
    )
})