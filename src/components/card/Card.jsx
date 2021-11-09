import "./card.css"
import { 
    ChatBubbleOutline,
    Favorite,
    FavoriteBorder,
    InfoOutlined, 
    Share 
} from '@mui/icons-material'
import { useState } from "react"

export default function Card({post, socket, user}) {
    const [isLike, setIsLike] = useState(false)

    const handleNotification = (type) => {
        type===1 && setIsLike(true)
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: post.username,
            type
        })
    }

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg" />
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                {isLike ?
                <Favorite 
                    color="error" 
                    className="cardIcon" 
                    onClick={() => setIsLike(false)}
                />
                :
                <FavoriteBorder 
                    className="cardIcon" 
                    onClick={() => handleNotification(1)}
                />
                }
                <ChatBubbleOutline className="cardIcon" onClick={() => handleNotification(2)}/>
                <Share className="cardIcon" onClick={() => handleNotification(3)}/>
                <InfoOutlined fontSize="small" className="cardIcon infoIcon"/>
            </div>
        </div>
    )
}
