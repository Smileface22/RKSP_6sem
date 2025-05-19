import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { AgreementForm } from "./components/AgreementForm";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <AgreementForm />
      </div>
    </Provider>
  );
};

export default App;
