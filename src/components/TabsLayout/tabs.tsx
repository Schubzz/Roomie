import Shopping from "../../pages/Shopping";
import {
    calendar,
    calendarOutline,
    cart,
    cartOutline, document,
    documentOutline,
    wallet,
    walletOutline
} from "ionicons/icons";
import Contracts from "../../pages/Contracts";
import Finance from "../../pages/Finance";
import Cleaning from "../../pages/Tasks";

export const tabs = [
    {
        id: 'cleaning',
        component: Cleaning,
        icon: {
            default: calendarOutline,
            active: calendar,
        },
        label: 'Putzen'
    },
    {
        id: 'finance',
        component: Finance,
        icon: {
            default: walletOutline,
            active: wallet,
        },
        label: 'Finanzen'
    },
    {
        id: 'contracts',
        component: Contracts,
        icon: {
            default: documentOutline,
            active: document,
        },
        label: 'Verträge'
    },
    {
        id: 'shopping',
        component: Shopping,
        icon: {
            default: cartOutline,
            active: cart,
        },
        label: 'Einkäufe'
    },
]