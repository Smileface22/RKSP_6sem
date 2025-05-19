import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAgreement } from "../actions/agreementActions";
import "./AgreementForm.css";

export const AgreementForm = () => {
  const dispatch = useDispatch();
  const accepted = useSelector((state) => state.agreement.accepted);

  const handleCheckboxChange = () => {
    dispatch(toggleAgreement());
  };
  const handleConfirmClick = () => {
    alert("Вы успешно приняли пользовательское соглашение!");
  };

  return (
    <div className="agreement-container">
      <h2>Пользовательское соглашение</h2>
      <p>Здесь будет текст пользовательского соглашения...</p>
      <p>Прочитайте внимательно перед тем как принять.</p>
      <div className="agreement-checkbox">
        <input
          type="checkbox"
          checked={accepted}
          onChange={handleCheckboxChange}
        />
        <span>Я принимаю условия соглашения</span>
      </div>
      <button
       className="agreement-button" 
       onClick={handleConfirmClick}
       disabled={!accepted}
       >Подтвердить</button>
    </div>
  );
};

