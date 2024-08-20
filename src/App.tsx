import {Route, Redirect} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact, IonLoading} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import React from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */

import Register from "./pages/Register";
import TabsLayout from "./components/TabsLayout/Tabs-Layout";
import CreateWG from "./pages/CreateWG";
import SelectWG from "./pages/SelectWg";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ReloadPrompt from "./ReloadPrompt";

import {WGProvider} from "./Context/WGContext";
import {UserProvider, useUser} from "./Context/UserContext";

setupIonicReact();

const AuthRoute: React.FC<{ component: React.ComponentType<any>, exact?: boolean, path: string }> = ({ component: Component, ...rest }) => {
    const { user, loading } = useUser();
    if (loading) {
        return <IonLoading isOpen={loading} message={'Momentchen...'} />;
    }
    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

const App: React.FC = () => (
    <IonApp>
        <ReloadPrompt/>
        <IonReactRouter>
            <UserProvider>
                <WGProvider>
                    <IonRouterOutlet>
                        {/* Open Routes */}
                        <Route path="/" component={Login} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/select-wg" component={SelectWG} exact/>
                        <Route path="/create-wg" component={CreateWG} exact/>
                        {/* Protected Routes */}
                        <AuthRoute path='/app' component={TabsLayout}/>
                        <AuthRoute path="/settings" component={Settings} exact/>
                    </IonRouterOutlet>
                </WGProvider>
            </UserProvider>
        </IonReactRouter>
    </IonApp>
);

export default App;
