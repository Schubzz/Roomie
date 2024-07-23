import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonRouter} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import {tabs} from "./tabs";

const TabsLayout: React.FC = () => {

    const router = useIonRouter();
    const currentPath = router.routeInfo.pathname;
    const makePath = (path: string) => `/app/${path}`;


    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path='/app'>
                    <Redirect to='/app/cleaning'/>
                </Route>

                {tabs.map(tab => (
                    <Route
                        key={tab.id}
                        exact path={makePath(tab.id)}
                        component={tab.component}
                    />
                ))}
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color="light" className='tabbar'>
                {tabs.map(tab => (
                    <IonTabButton key={tab.id} tab={tab.id} href={makePath(tab.id)}>
                        <IonIcon
                            icon={currentPath === makePath(tab.id) ? tab.icon.active : tab.icon.default}
                            color='dark'
                        />
                        <IonLabel>{tab.label}</IonLabel>
                    </IonTabButton>
                ))}
            </IonTabBar>
        </IonTabs>
    )
};

export default TabsLayout;
