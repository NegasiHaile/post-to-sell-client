import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/modal/Modal";

const PaymentModal = ({
  category,
  showModal,
  setShowModal,
  payFor,
  setPayFor,
  updateProductPaymentStatus,
}) => {
  const [thePostFee, setThePostFee] = useState(0);
  const { categories } = useSelector((state) => {
    return {
      categories: state.product.categories,
    };
  });

  useEffect(() => {
    console.warn(categories);
    categories.map((ctgry) => {
      if (ctgry._id == category) {
        setThePostFee(ctgry.postFee);
      }
    });

    console.warn(category);
  }, [categories, category]);

  console.warn(thePostFee);
  return (
    <Modal
      onCloseModal={() => setShowModal(!showModal)}
      onConfirm={() => updateProductPaymentStatus()}
      title={"Pay the post fee!"}
      confirmLabel={
        "Pay " +
        Number(thePostFee) * Number(payFor) +
        " ETB for " +
        payFor +
        " month" +
        `${payFor > 1 ? "s" : ""}`
      }
      confirmProcessLabel={"Paying..."}
      content={
        "Your product is successfuly registered, Please pay the post fee!."
      }
      confirmButtonDisabled={payFor == 0}
    >
      <div style={{ margin: "20px 1px 10px" }}>
        <p>Pay for?</p>
        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <div className="select-wrapper select-form">
              <select
                placeholder="Pay for"
                className="form__input form__input--sm"
                name="payFor"
                value={payFor}
                onChange={(e) => setPayFor(e.target.value)}
              >
                <option value={1}>1 Month</option>
                <option value={2}>2 Months</option>
                <option value={3}>3 Months</option>
                <option value={4}>4 Months</option>
                <option value={5}>5 Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
