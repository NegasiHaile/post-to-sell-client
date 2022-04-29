import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { api_getAllUserAdverts, api_deleteAdvert } from "../../api/index";

import { server } from "../../utils/server";

import Layout from "../../layouts/Main";
import AdvertLoading from "../../components/Adverts/peview/add-advert";
import Modal from "../../components/modal/Modal";
import Toast from "../../components/Utils/Toast";

import { BsPencilFill, BsTrashFill } from "react-icons/bs";

import Link from "next/link";

function MyAdverts() {
  const { user } = useSelector((state) => {
    return { user: state.auth.user };
  });
  const [myAdvertsList, setMyAdvertsList] = useState([]);
  const [deleteAdvertStatus, setDeleteAdvertStatus] = useState({
    state: "success",
    message: "",
    deleting: false,
    advertId: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    if (user) {
      getMyAdverts();
    }
  }, [user]);

  const getMyAdverts = async () => {
    try {
      const res = await api_getAllUserAdverts(user);
      setMyAdvertsList(res.data);
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  const deleteAdvert = async () => {
    try {
      const res = await api_deleteAdvert(user, deleteAdvertStatus.advertId);
      getMyAdverts();
      setShowModal(false);
      setDeleteAdvertStatus({ advertId: "" });
      Toast("success", res.data.msg);
    } catch (error) {
      setDeleteAdvertStatus({ advertId: "" });
      Toast("error", error.response.data.msg);
    }
  };
  return (
    <Layout>
      <div className="container">
        <br />
        <br />
        <p>
          {" "}
          {myAdvertsList.length
            ? "List of my adverts"
            : "You haven't any advertisement yet!"}
        </p>
        <div className="products-content">
          <section className="my-adverts-list">
            {myAdvertsList.length ? (
              myAdvertsList.map((advert, index) => (
                <div className="advert-item-container" key={index}>
                  <AdvertLoading
                    advertBanner={`${server}/${advert.advertBanner}`}
                    link={advert.link}
                  />
                  <div className="overlay">
                    <Link href={`/users/add-advert/${advert._id}`}>
                      <span>
                        <BsPencilFill
                          style={{ color: "#39ac73", cursor: "pointer" }}
                        />
                      </span>
                    </Link>
                    <span>
                      <BsTrashFill
                        onClick={() => {
                          setShowModal(true),
                            setDeleteAdvertStatus({ advertId: advert._id });
                        }}
                        style={{ color: "#ff471a", cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </section>
        </div>
        {showModal && (
          <Modal
            onCloseModal={() => {
              setShowModal(!showModal), setDeleteAdvertStatus({ advertId: "" });
            }}
            onConfirm={() => deleteAdvert()}
            confirmLabel={"Delete?"}
            confirmProcessLabel={"Deleting..."}
            title={"Delete?"}
            content={"Are you sure you want to delete the advert?"}
            confirming={deleteAdvertStatus.deleting}
            confirmResult={{
              message: deleteAdvertStatus.message,
              state: deleteAdvertStatus.state,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export default MyAdverts;
