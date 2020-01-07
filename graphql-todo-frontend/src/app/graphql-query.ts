
'use strict';

import gql from 'graphql-tag';

export const addTask = gql`
        mutation addTask($description: String!, $state: Int!, $userid: Int!) {
            addTask(description : $description, state : $state, userid : $userid){
            id,
            description,
            state,
            userid
            }
        }
        `; 
export const editTask = gql`
        mutation editTask($id: Int!, $userid: Int!, $description: String, $state : Int){
            editTask(description : $description, state : $state, userid : $userid, id : $id){
                id,
            	description,
                state,
                userid
            }
        }`;

export const deleteTask = gql`
        mutation deleteTask($id: Int!, $userid: Int!){
            deleteTask( id:$id , userid : $userid ){
                id,
                userid
            }
        }
        `;
export const fetchStates =  gql`{ states { id, name } }`;