import React from 'react';
import './App.css';
import Gif from './Gif.js';

class ToDoList extends React.Component {
        /* 
        Requirements:
        - An input at the top where a user can input their username and click "Submit Username"
        - "Welcome, ____!" should appear on the screen with the user's name in the blank after they've submitted their name 
        - A box where a user can input a new to do item (there is no limit to how many they may add) that says "Add!"
        - An option to "complete" which will delete the item from the screen that says "Delete!"
        - A "Finish All" button that would remove all items from the list 
        
        */

    constructor(props) 
    {
        super(props);
        this.state = {userName: '',
                      newItem: '',
                      toDoList: [],
                      catagories: [] };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeNewItem = this.changeNewItem.bind(this);
        this.addItemToToDoList = this.addItemToToDoList.bind(this);
        this.removeItemFromToDoList = this.removeItemFromToDoList.bind(this);
        this.removeAllItemsFromToDoList = this.removeAllItemsFromToDoList.bind(this);
        this.handleEnterOnToDo = this.handleEnterOnToDo.bind(this);
        this.handleEnterOnCatagories = this.handleEnterOnCatagories.bind(this);
        
    }
    
    componentDidMount(){

        
     //   alert('initialize was called got this initial value: ' + localStorage.getItem('userName'))
        let name = localStorage.getItem('userName')
        this.setState({userName: name })

        let list =  localStorage.getItem('toDoList')

        if(list != null){
            let listArray = list.split(',')
            this.setState({toDoList: listArray})
        }

    }

    setUserName = () =>{
        
        localStorage.setItem('userName', this.state.userName)
      //  alert('this value was stored ' + localStorage.getItem('userName'))
    }

    handleChange(event) {
        this.setState({userName: event.target.value});
    }

    handleSubmit(event) {
        alert('Welcome, ' + this.state.userName + "!");
        event.preventDefault();
        this.setUserName();
    }
    
    changeNewItem(event){
        this.setState({newItem: event.target.value})
    }

    addItemToToDoList(event){
        event.preventDefault();
        if(this.state.newItem === ''){
            return
        }

        if(this.state.toDoList.indexOf(this.state.newItem) !== -1){
            alert('ToDo List already has that entry')
            return
        }

        let list = this.state.toDoList
        list.push(this.state.newItem)
        this.setState({toDoList: list})

        localStorage.setItem('toDoList', this.state.toDoList)
    }

    removeItemFromToDoList(event){
        event.preventDefault();

        
        let list = this.state.toDoList
        list.splice(this.state.toDoList.indexOf( event.target.id),1)
        this.setState({toDoList: list})

        

        localStorage.setItem('toDoList', this.state.toDoList)

        if(this.state.toDoList.length === 0){
            localStorage.removeItem('toDoList')
        }
    }

    removeAllItemsFromToDoList(event){
        event.preventDefault();
        // alert('Removing all items from the list')
        this.setState({toDoList: []})
        localStorage.removeItem('toDoList')
    }

    handleEnterOnToDo(event){
        
        if(event.key === 'Enter'){
            event.preventDefault();
            this.addItemToToDoList(event)
            this.setState({newItem: ''})
        }
    }

    handleEnterOnCatagories(event){
        

        if(event.key === 'Enter'){
            event.preventDefault();
        }
    }

    render(){

        

        // key={cityTZ[0]} 
        // id={cityTZ[0]} 
        // onClick={() => this.setTimeZone(cityTZ[1])}>
        // {cityTZ[0]}

        //alert('the ToDo list is : ' + this.state.toDoList)
        const todoListItems = this.state.toDoList.map(item => {
            return (
                <li>
                    {item} 
                    <button onClick={this.removeItemFromToDoList} id={item} className="deleteBtn">Delete!</button>
                    Category: 
                    <input type="text" onKeyPress={this.handleEnterOnCatagories} ></input>
                </li>
            )
        })
        return ( 

            <form className = "customForm">
                <div className="usernameArea">
                    
                    <div className="col">

                        <p>UserName
                        <input type="text" value={this.state.userName} onChange={this.handleChange} />
                        </p>

                        <div>
                        <input type="submit" onClick={this.handleSubmit} value = "Submit Username" />
                        </div>
                    </div>
                    
                </div>
                
                <div className = "usernameArea">
                
                    ToDo Item: 
                    <input type="text" onKeyPress={this.handleEnterOnToDo} value={this.state.newItem} onChange={this.changeNewItem}></input>

                
                    <button onClick={this.addItemToToDoList}> Add! </button>
                    <button onClick={this.removeAllItemsFromToDoList}>Finish all!</button>

                </div>
                
                <div className="row">
                <ul className="customUList">
                    {todoListItems}
                </ul>
                </div>
            </form>
            
        )
    }
}
export default ToDoList