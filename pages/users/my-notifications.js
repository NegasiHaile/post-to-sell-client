import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Next
import Head from "next/head";

// dev components
import Layout from "../../layouts/Main";
import Toast from "../../components/Utils/Toast";

// APIS
import {
  api_getUserProfile,
  api_UpdateNotificationStatusToSeen,
  api_DleteUserNotification,
} from "../../api";

// Redux
import { setProfile } from "../../store/actions/profileActions";

const MyNotifications = () => {
  const dispatch = useDispatch();
  const [myNotifications, setMyNotifications] = useState(
    useSelector((state) => state.profile.profile?.notifications)
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    const userAccess = JSON.parse(localStorage.getItem("auth"));
    setUser(userAccess);
    getUserProfile(userAccess);
  }, []);

  const getUserProfile = async (userAccess) => {
    const res = await api_getUserProfile(userAccess.accesstoken);
    dispatch(setProfile(res.data.profile));
    setMyNotifications(res.data.profile.notifications);
    const res1 = await api_UpdateNotificationStatusToSeen(userAccess);
  };

  const deleteNotification = async (notificationId) => {
    try {
      const res = await api_DleteUserNotification(user, notificationId);
      getUserProfile(user);
      Toast("success", res.data.msg);
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  return (
    <Layout>
      <div className="cart">
        <Head>
          <title> my notifications</title>
        </Head>
        <div className="container">
          <h3>Notifications</h3>
          <div className="notifications-container">
            {myNotifications?.length > 0 ? (
              myNotifications.map((notification) => {
                return (
                  <div
                    key={notification.id}
                    className={`notification ${
                      notification.status ? notification.status : "seen"
                    }`}
                  >
                    <div>
                      <p className="notification-title">{notification.title}</p>
                      <p className="notification-content">
                        {notification.content}
                      </p>
                    </div>
                    {/* <span style={notificationStyle}>{notification.status}</span> */}
                    <button
                      className="notification-delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <p>You haven't any notification yet!</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyNotifications;
