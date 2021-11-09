import "./navbar.css"
import {
    Notifications,
    Message,
    AccountCircle
} from '@mui/icons-material';
import { useEffect, useState } from "react";

export default function Navbar({socket}) {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications(prev => [...prev, data])
        })
    }, [socket])

    const DisplayNotification = ({senderName, type}) => {
        let action

        if (type === 1) {
            action = "liked"
        } else if (type === 2) {
            action = "commented"
        } else {
            action = "shared"
        }

        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([])
        setOpen(false)
    }

    return (
        <div className="navbar">
            <div className="logo">App</div>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <Notifications />
                    {notifications.length > 0 && 
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon">
                    <Message />
                </div>
                <div className="icon">
                    <AccountCircle />
                </div>
            </div>
            {open && 
                <div className="notifications">
                    {notifications.map((n, index) => <DisplayNotification key={index} {...n} />)}
                    <button className="notiButton" onClick={handleRead}>Mark as read</button>
                </div>
            }
        </div>
    )
}
