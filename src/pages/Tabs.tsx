import {Redirect, Route} from "react-router-dom";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import {
    calendar,
    calendarOutline,
    cartOutline,
    documentOutline,
    ellipse,
    triangle,
    walletOutline
} from "ionicons/icons";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";


const Tabs: React.FC = () => {


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
                    <IonIcon icon={calendarOutline}/>
                    <IonLabel>Putzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab2' href='/app/tab2'>
                    <IonIcon icon={walletOutline}/>
                    <IonLabel>Finanzen</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab3' href='/app/tab3'>
                    <IonIcon icon={documentOutline}/>
                    <IonLabel>Verträge</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab4' href='/app/tab4'>
                    <IonIcon icon={cartOutline}/>
                    <IonLabel>Kaufen</IonLabel>
                </IonTabButton>
            </IonTabBar>

        </IonTabs>
    );
};

export default Tabs;