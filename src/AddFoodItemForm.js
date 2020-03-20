import React from 'react';

const AddFoodItemForm = (props) => (
  <form onSubmit={ props.addFoodItem } className="col-sm-4">
    <div>
      <label className="text-white">Food Name</label>
      <input type="text" name="food" value={props.food} onChange={props.handleInputChange} />
    </div>
    <div>
      <label className="text-white">Food Cost</label>
      <input type="number" name="cost" value={props.cost} onChange={props.handleInputChange} />
    </div>
    <button className="btn btn-custom btn-primary ml-2">Add item</button>
  </form>
);

export default AddFoodItemForm;