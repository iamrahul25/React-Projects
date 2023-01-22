import React from 'react'

const OnlineUserCard = ({data}) => {

    return (
        <div className="user_card">
            <div className="user_image">
                <img src={data.userImage} alt=""/>
                <span className="green_circle"></span>
            </div>
            <div className="user_name">
                <p>{data.userName}</p>
            </div>
        </div>
    )
}

export default OnlineUserCard;