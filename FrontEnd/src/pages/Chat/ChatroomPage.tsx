import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import CoverOne from '../../Dashboard/src/images/cover/cover-01.png';
import userSix from '../../Dashboard/src/images/user/user-06.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from "../../../Features/auth/authSlice.js"; 

import styles from './ChatStyle.module.css';



const ChatroomPage = () => {
    const user = useSelector(selectCurrentUser);
    const userFullName = user ? `${user.firstName} ${user.lastName}!` : 'Welcome';
    const userRole = user ? `Role : ${user.roles}` : 'Welcome';
    const userBio = user ? `Bio : ${user.bio}` : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.';
    console.log('user'+ user)
    console.log('role'+ userRole)
return (
    <DefaultLayout>
    <Breadcrumb pageName="Chat" />
    <div className={styles.chatroomPage}>
      <div className={styles.chatroomSection}>
        <div className={styles.cardHeader}>Chatroom Name</div>
        {/* <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div> */}
        <div className={styles.chatroomActions}>
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say Something !!"
            //   ref={messageRef}
            />
          </div>
          <div>
            <button className={styles.join}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>
);
};

export default ChatroomPage;
