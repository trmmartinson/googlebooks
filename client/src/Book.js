import React from "react";

function Book(props) {
  return (
    <div className="container black_box">
      <div className="row">
        <div className="col-sm">
          <h5>{props.title} </h5>
        </div>
        <div className="col-sm-3">
          <button type="button" onClick={() => { props.clicker("view" + props.id) }}   className="btn btn-primary">{props.button_1}</button>
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          <button type="button" onClick={() => { props.clicker( props.button_2 + props.id) }}   className="btn btn-primary">{props.button_2}</button>
        </div>
      </div>

      <div className="row">
        <div className="col-sm">
          <h5>{props.authors}</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
        <img src={props.thumbnail} alt="Book" height="250" width="250"></img>
        </div>
        <div className="col-sm">
        <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}





export default Book;
