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
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import React, {useEffect} from "react";


const Tabs: React.FC = () => {

    const router = useIonRouter();
    const currentPath = router.routeInfo.pathname;


    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path='/app'>
                    <Redirect to='/app/tab1'/>
                </Route>

                <Route exact path='/app/tab1' component={Tab1}/>

                <Route exact path='/app/tab2' component={Tab2}/>

                <Route exact path='/app/tab3' component={Tab3}/>

                <Route exact path='/app/tab4' component={Tab4}/>
            </IonRouterOutlet>

            <IonTabBar slot='bottom' color='primary'>
                <IonTabButton tab='tab1' href='/app/tab1'>
                    <IonIcon icon={currentPath === '/app/tab1' ? calendar : calendarOutline}/>
                    <IonLabel>Putzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab2' href='/app/tab2'>
                    <IonIcon icon={currentPath === '/app/tab2' ? wallet : walletOutline}/>
                    <IonLabel>Finanzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab3' href='/app/tab3'>
                    <IonIcon icon={currentPath === '/app/tab3' ? document : documentOutline}/>
                    <IonLabel>Verträge</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab4' href='/app/tab4'>
                    <IonIcon icon={currentPath === '/app/tab4' ? cart : cartOutline}/>
                    <IonLabel>Kaufen</IonLabel>
                </IonTabButton>
            </IonTabBar>

        </IonTabs>
    );
};

export default Tabs;