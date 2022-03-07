import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button,  Header,  Segment } from 'semantic-ui-react';
import LoadingComonent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Movie } from '../../../app/models/movie';
import { categoryMovies } from '../../../app/common/options/categoryMovies';


export default observer(function MovieForm(){
    const history = useHistory();
    const {movieStore} = useStore();
     const {createMovie, updateMovie, loading, loadMovie, loadingInitial} =movieStore;
     const {id} = useParams<{id: string}>();
     const [movie, setMovie] = useState<Movie>({
        id:'',
        title:'',
        category:'',
        description:'',
        date: null,
        city:'',
        venue:''
     });

     const validationSchema = Yup.object({
         title: Yup.string().required('The Movie title is required'),
         description: Yup.string().required('The Movie description is required'),
         category: Yup.string().required(),
         date: Yup.string().required('Date is required').nullable(),
         venue: Yup.string().required(), 
         city: Yup.string().required(),
     })

     useEffect(() =>{

        if(id) loadMovie(id).then(movie => setMovie(movie!))
     }, [id, loadMovie]);

    function handleFormSubmit(movie: Movie){
       if (movie.id.length === 0){
           let newMovie = {
               ...movie,
               id: uuid()
           };
           createMovie(newMovie).then(() =>history.push(`/movies/${newMovie.id}`))
      } else {
           updateMovie(movie).then(()=>history.push(`/movies/${movie.id}`))
       }
       }


    if(loadingInitial) return <LoadingComonent content='Loading activity...' />

    return(
        <Segment clearing>
            <Header content='Movie Details' sub color='grey'  />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={movie} 
            onSubmit={values => handleFormSubmit(values)} > 
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                <MyTextInput name='title' placeholder='Name' />
                <MyTextArea rows={3} placeholder='Description'  name='description' />
                <MySelectInput  options={categoryMovies} placeholder='Category'  name='category' />
                <MyDateInput 
                    placeholderText='Date' 
                    name='date' 
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    />
                 <Header content='Location Details' sub color='grey'  />
                <MyTextInput placeholder='City'  name='city' />
                <MyTextInput placeholder='Venue'  name='venue' />
                <Button
                 disabled={isSubmitting || !dirty || !isValid}
                 loading={loading} floated='right' 
                 positive type='submit' content='Submit' />
                <Button as={Link} to='/movies' floated='right'  type='button' content='Cancel' />
            </Form>
            )}
            </Formik>
           
        </Segment>
    )
});

