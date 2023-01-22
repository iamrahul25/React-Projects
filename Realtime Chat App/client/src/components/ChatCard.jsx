import React from 'react';

const ChatCard = ({data, current_user}) => {

    return (
        <div className={current_user===data.name ? "chat_div left" : "chat_div right"}>

            <div className="imagediv">
                <img src={data.image} alt=""/>
            </div>

            <div className="message_div">

                <div className="name_time">
                    <span>{data.name}</span>
                    <span>{data.time}</span>
                </div>

                <p>{data.message}</p>
                
            </div>

        </div>
    )
}

export default ChatCard;