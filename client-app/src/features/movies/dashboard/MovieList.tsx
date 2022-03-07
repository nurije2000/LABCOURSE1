import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import {Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import MovieListItem from './MovieListItem';


export default observer(function MovieList(){
    const {movieStore} = useStore();
    const {groupedMovies} = movieStore
    return(
        <>
        {groupedMovies.map(([group, movies])=>(
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
        {movies.map(movie => (
            <MovieListItem key={movie.id} movie={movie} />
              ))}
            </Fragment>
           ))}
        </>
    )
})