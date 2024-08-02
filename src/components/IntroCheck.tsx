import React, {ReactNode} from 'react';
import { Redirect } from 'react-router-dom';

interface IntroCheckProps {
    children: ReactNode;
}

const IntroCheck: React.FC<IntroCheckProps> = ({ children }) => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');

    if (hasSeenIntro) {
        return <Redirect to="/login" />;
    }

    return <>{children}</>;
};

export default IntroCheck;
