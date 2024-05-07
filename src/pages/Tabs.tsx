import {Redirect, Route} from "react-router-dom";
import { useIonRouter } from '@ionic/react';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {
    calendar,
    calendarOutline, cart,
    cartOutline, document,
    documentOutline, wallet,
    walletOutline
} from "ionicons/icons";
import Finance from "./Finance";
import React from "react";
import Cleaning from "./Cleaning";
import Contracts from "./Contracts";
import Shopping from "./Shopping";


const Tabs: React.FC = () => {

    const router = useIonRouter();
    const currentPath = router.routeInfo.pathname;


    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path='/app'>
                    <Redirect to='/app/cleaning'/>
                </Route>

                <Route exact path='/app/cleaning' component={Cleaning}/>

                <Route exact path='/app/finance' component={Finance}/>

                <Route exact path='/app/contracts' component={Contracts}/>

                <Route exact path='/app/shopping' component={Shopping}/>
            </IonRouterOutlet>

            <IonTabBar slot='bottom' color='primary'>
                <IonTabButton tab='cleaning' href='/app/cleaning'>
                    <IonIcon icon={currentPath === '/app/cleaning' ? calendar : calendarOutline}/>
                    <IonLabel>Putzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='finance' href='/app/finance'>
                    <IonIcon icon={currentPath === '/app/finance' ? wallet : walletOutline}/>
                    <IonLabel>Finanzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='contracts' href='/app/contracts'>
                    <IonIcon icon={currentPath === '/app/contracts' ? document : documentOutline}/>
                    <IonLabel>Verträge</IonLabel>
                </IonTabButton>
                <IonTabButton tab='shopping' href='/app/shopping'>
                    <IonIcon icon={currentPath === '/app/shopping' ? cart : cartOutline}/>
                    <IonLabel>Kaufen</IonLabel>
                </IonTabButton>
            </IonTabBar>

        </IonTabs>
    );
};

export default Tabs;