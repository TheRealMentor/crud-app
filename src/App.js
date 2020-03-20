import React, { Component } from 'react';
import './App.css';
import FoodItemList from './FoodItemList';
import EditFoodItemForm from './EditFoodItemForm';
import AddFoodItemForm from './AddFoodItemForm';

class App extends Component {
  
  state = {
    id: null,
    userId: 1,
    food: '',
    cost: '',
    status: false,
    foodItem: {},
    foodItems: [],
    editing: false
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addFoodItem = (event) => {
    event.preventDefault();
    if(!this.state.food) return;
    const foodItem = {
      id: this.state.foodItems.length + 1,
      userId: this.state.userId,
      food: this.state.food,
      cost: this.state.cost,
      status: this.state.status
    };

    this.setState({
      food: '',
      cost: '',
      foodItem: foodItem,
      foodItems: [...this.state.foodItems, foodItem]
    });
  }

  deleteFoodItem = (id) => {
    const foodItems = this.state.foodItems.filter( item => item.id !== id);
    this.setState({ foodItems: foodItems });
    if(this.state.editing === true) {
      window.location.reload();
    }
  }

  boughtFoodItem = (currFood) => {
    const updatedCurrFood = Object.assign({}, currFood, { status: true });
    const foodItems = this.state.foodItems.map((foodItem, index) => (
      foodItem.id === currFood.id ? updatedCurrFood : foodItem
    ));

    this.setState({ foodItems: foodItems });
  }

  editFoodItem = (foodItem) => {
    this.setEditing(true);
    this.setState({
      food: foodItem.food,
      cost: foodItem.cost,
      footItem: foodItem
    });
  }

  setEditing = (value) => {
    if(typeof value !== 'boolean') { throw 'This must be a boolean value' };
    this.setState({
      editing: value
    });
  }

  updateFoodItem = (event) => {
    event.preventDefault();
    const updatedFood = this.state.food;
    const updatedCost = this.state.cost;
    const updatedFoodItem = Object.assign({}, this.state.foodItem, { food: updatedFood, cost: updatedCost });
    const foodItems = this.state.foodItems.map((foodItem) => (
      foodItem.id === this.state.foodItem.id ? updatedFoodItem : foodItem
    ));
    this.setState({
      food: '',
      cost: '', 
      foodItems: foodItems 
    });
  }

  render() {
    const { cost, food, foodItems, editing } = this.state;
    return (
      <div className="App">
        <div className="row App-main">
          <FoodItemList 
            foodItems={foodItems}
            deleteFoodItem={this.deleteFoodItem}
            boughtFoodItem={this.boughtFoodItem}
            editFoodItem={this.editFoodItem}
          />
        </div>

        <div className="row App-main">
          {
            editing ? (
              <EditFoodItemForm 
                food={food}
                cost={cost}
                handleInputChange={this.handleInputChange}
                updateFoodItem={this.updateFoodItem}
                setEditing={this.setEditing}
              />
            ) : (
              <AddFoodItemForm 
                food={food}
                cost={cost}
                handleInputChange={this.handleInputChange}
                addFoodItem={this.addFoodItem}
              />
            )
          }
        </div>

      </div>
    );
  }
}

export default App;
