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
import { Actory } from '../../../app/models/actory';
import { categoryActories } from '../../../app/common/options/categoryActories';


export default observer(function ActoryForm(){
    const history = useHistory();
    const {actoryStore} = useStore();
     const {createActory, updateActory, loading, loadActory, loadingInitial} = actoryStore;
     const {id} = useParams<{id: string}>();
     const [actory, setActory] = useState<Actory>({
        id:'',
        title:'',
        category:'',
        description:'',
        date: null,
        city:'',
        venue:''
     });

     const validationSchema = Yup.object({
         title: Yup.string().required('The actory title is required'),
         description: Yup.string().required('The actory description is required'),
         category: Yup.string().required(),
         date: Yup.string().required('Date is required').nullable(),
         venue: Yup.string().required(), 
         city: Yup.string().required(),
     })

     useEffect(() =>{

        if(id) loadActory(id).then(actory => setActory(actory!))
     }, [id, loadActory]);

    function handleFormSubmit(actory: Actory){
       if (actory.id.length === 0){
           let newActory = {
               ...actory,
               id: uuid()
           };
           createActory(newActory).then(() =>history.push(`/actories/${newActory.id}`))
      } else {
           updateActory(actory).then(()=>history.push(`/actories/${actory.id}`))
       }
       }


    if(loadingInitial) return <LoadingComonent content='Loading actory...' />

    return(
        <Segment clearing>
            <Header content='Actory Details' sub color='grey'  />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={actory} 
            onSubmit={values => handleFormSubmit(values)} > 
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                <MyTextInput name='title' placeholder='Name' />
                <MyTextArea rows={3} placeholder='Description'  name='description' />
                <MySelectInput  options={categoryActories} placeholder='Category'  name='category' />
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
                <Button as={Link} to='/actories' floated='right'  type='button' content='Cancel' />
            </Form>
            )}
            </Formik>
           
        </Segment>
    )
});

