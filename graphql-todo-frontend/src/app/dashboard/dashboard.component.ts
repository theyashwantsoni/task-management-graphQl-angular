import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {addTask,fetchStates,editTask,deleteTask} from '../graphql-query';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks = [];
  states = null;
  task : string;
  lenCounts = {};
  isLoaded : boolean;
  userid = 1; // todo session
  constructor(private apollo: Apollo){
    this.task = '';
    this.isLoaded = false;
    // this.states = [ { id : 1, name : "incomplete" }, { id : 2, name : "complete"} ];
    // this.genTaskObj();

  }

  ngOnInit() {
    this.apollo.query({
      query: fetchStates
    }).subscribe(res => {    
      this.states = res.data.states;
      this.genTaskObj();
      this.isLoaded = true;
    });
  }

  genTaskObj(){    
    this.states.forEach( item => {      
      this.tasks[ item.name ] = [];      
    });  
  }

  countCardLengths(){
    this.states.forEach( item => {
      this.lenCounts[ "len"+item.name ] = this.tasks[item.name].length;
    });
  }

  addTask(stateID : number){
    if(this.task.length>0){
      // this.countCardLengths();
      this.apollo.mutate({
        mutation: addTask,
        variables: {
          description: this.task,
          state: 1,
          userid: this.userid,
        }
      }).subscribe(({ data }) => {
          this.states.forEach( item => {          
            if(item.id == stateID){
              this.tasks[item.name].push( data.addTask );
              this.task = '';
            }
          });  
      }, (error) => {
        alert('there was an error sending the query' + error);
        console.log('there was an error sending the query', error);
      });    
    }
  }

  changeStatus(key,taskObj){
    let transferInto;
    let state;
    this.countCardLengths();

    if(key == "incomplete"){
        transferInto = "complete";
        state = 2;
    }else{
        transferInto = "incomplete";
        state = 1;
    }

    this.apollo.mutate({
      mutation: editTask,
      variables: {
        state: state,
        userid: this.userid,
        id:taskObj.id
      }
    }).subscribe(({ data }) => {
        this.tasks[transferInto].push( data.editTask );  
        this.tasks[key] = this.tasks[key].filter((item)=>{
          if(item.id != taskObj.id){
            return item;
          }
        });
    }, (error) => {
      alert('there was an error sending the query' + error);
    });
    // this.tasks[transferInto].push( { id : this.lenCounts['len'+transferInto], description : taskObj.description});
  }

  editTask(event,key,taskObj){    
    let listItem = event.target.parentNode;
    let editInput = listItem.querySelector("input[type=text");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");

      if(containsClass){
        this.apollo.mutate({
          mutation: editTask,
          variables: {
            state: taskObj.state,
            userid: this.userid,
            id:taskObj.id,
            description : editInput.value
          }
        }).subscribe(({ data }) => {
          this.tasks[key] = this.tasks[key].filter((item)=>{
            if(item.id == taskObj.id){
              item.description = data.editTask.description;
              return item;
            }else{
              return item;
            }
          });
          listItem.classList.toggle("editMode");
        }, (error) => {
          alert('there was an error sending the query' + error);
        });
      }else{
        editInput.value = label.innerText;
        listItem.classList.toggle("editMode");
      }
  }


  deleteTask(key,taskObj){
    this.apollo.mutate({
      mutation: deleteTask,
      variables: {
        userid: this.userid,
        id:taskObj.id
      }
    }).subscribe(({ data }) => {
        this.tasks[key] = this.tasks[key].filter((item)=>{
          if(item.id != taskObj.id){
            return item;
          }
        });
    }, (error) => {
      alert('there was an error sending the query' + error);
    });
  }

}
