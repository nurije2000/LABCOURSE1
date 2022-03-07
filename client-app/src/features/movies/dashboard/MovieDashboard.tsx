import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import MovieFilters from './MovieFilters';
import MovieList from './MovieList';


export default observer(function MovieDashboard(){

    const {movieStore} = useStore();
    const {loadMovies, movieRegistry} = movieStore;

        useEffect(() => {
          if(movieRegistry.size ===0 ) loadMovies();
        }, [movieRegistry.size, loadMovies])
      
        if (movieStore.loadingInitial) return <LoadingComponent content='Loading movies...' />


    return(
        <Grid>
            <Grid.Column width='10'>
      <MovieList />
            </Grid.Column>
            <Grid.Column width='6'>
               <MovieFilters />
            </Grid.Column>
        </Grid>
    )
})