import React from 'react';

const JoinLeftCard = ({data}) => {

  if(data.type==='Joined'){

    return (
      <div className="joined_div">
          <span> <strong> {data.name} </strong> Joined </span>
      </div>
    )
  }

  else{
    
    return(
      <div className="left_div">
          <span> <strong> {data.name} </strong> Left </span>
      </div>
    )
  }
  
}

export default JoinLeftCard;