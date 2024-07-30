import React from "react";
import {IonButton, IonText} from '@ionic/react';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css'

// Img
import Sponge from '/img/Cleaning.png';
import Contract from '/img/Contract.png'
import Finance from "/img/Finance.png";
import Device from "/img/Device.png";
import Logo from '/icons/roomie-icon-512x512.png'
import {Link} from "react-router-dom";

interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton
        onClick={() => swiper.slideNext()}
        color="tertiary"
        expand="block"
        shape="round"
    >
        {children}
    </IonButton>
}

const Welcome: React.FC<ContainerProps> = ({onFinish}: ContainerProps) => {

    return (
        <div>
            <Swiper>
                <SwiperSlide>
                    <IonText color="dark">
                        <h2>Willkommen bei Roomie!</h2>
                    </IonText>
                    <img src={Logo} alt="Putzen"/>
                    <IonText color="dark">
                        <p>Deiner allrounder WG-App</p>
                    </IonText>
                    <SwiperButtonNext>Los gehts!</SwiperButtonNext>
                </SwiperSlide>
                <SwiperSlide>
                    <IonText color="dark">
                        <h2>Putzpläne</h2>
                    </IonText>
                    <img src={Sponge} alt="Putzen"/>
                    <IonText color="dark">
                        <p>Legt automatisch rotierende Putzpläne an, damit jeder weiß wer welche Aufgabe hat.</p>
                    </IonText>
                    <SwiperButtonNext>weiter</SwiperButtonNext>
                </SwiperSlide>
                <SwiperSlide>
                    <IonText color="dark">
                        <h2>Verträge</h2>
                    </IonText>
                    <img src={Contract} alt="Verträge"/>
                    <IonText color="dark">
                        <p>Ganz einfaches zuordnen von Verträgen. So entstehen keine Konflikte, wer welchen Vertrag
                            hält</p>
                    </IonText>
                    <SwiperButtonNext>weiter</SwiperButtonNext>
                </SwiperSlide>
                <SwiperSlide>
                    <IonText color="dark">
                        <h2>Finanzen</h2>
                    </IonText>
                    <img src={Finance} alt="Finanzen"/>
                    <IonText color="dark">
                        <p>Erstellt ganz einfach Ausgaben, damit jeder sieht wer wem wieviel schuldet.</p>
                    </IonText>
                    <SwiperButtonNext>weiter</SwiperButtonNext>
                </SwiperSlide>
                <SwiperSlide>
                    <IonText color="dark">
                        <h2>Auf allen Geräten!</h2>
                    </IonText>
                    <img src={Device} alt="Gerät"/>
                    <IonText color="dark">
                        <p>Auf dem Smartphone oder auf dem PC. Nutze Roomie wo du möchtest!</p>
                    </IonText>
                    <Link to="/register">
                        <IonButton expand="block">
                            Loslegen!
                        </IonButton>
                    </Link>

                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Welcome;
