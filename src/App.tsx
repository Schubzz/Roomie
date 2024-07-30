import {Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

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
import {UserProvider} from "./Context/UserContext";
import Welcome from "./pages/Welcome";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        < ReloadPrompt/>

        <IonReactRouter>
            <UserProvider>
                <WGProvider>
                    <IonRouterOutlet>
                        <Route path="/" component={Welcome} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/login" component={Login} exact/>
                        <Route path="/select-wg" component={SelectWG} exact/>
                        <Route path="/create-wg" component={CreateWG} exact/>
                        <Route path="/settings" component={Settings} exact/>
                        <Route path='/app' component={TabsLayout}/>
                    </IonRouterOutlet>
                </WGProvider>
            </UserProvider>
        </IonReactRouter>
    </IonApp>
);

export default App;
