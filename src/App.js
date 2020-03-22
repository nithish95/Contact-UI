import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Contacts from './Contacts/Contacts';
import ContactModal from './ContactModal/ContactModal';
import ModifyContact from './ModifyContact/ModifyContact';
import './App.css';

function App() {
  return (
    <main className="main-content">
    <Switch>
        <Route path="/" component={Contacts} exact />
        <Route path="/add" component={ContactModal} />
        <Route path="/modify" component={ModifyContact} /> 
    </Switch>
</main>
  );
}

export default App;
