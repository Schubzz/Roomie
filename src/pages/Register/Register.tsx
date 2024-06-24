import {
    IonContent, IonGrid,
    IonHeader, IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { useRef, useState } from 'react';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import CreateWgStep1 from './CreateWGStep1';
import CreateWgStep2 from './CreateWGStep2';

const Register: React.FC = () => {
    const swiperRef = useRef<any>(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        profilePicture: null,
        wgName: '',
        country: '',
        postalCode: '',
        city: ''
    });

    const [stepValid, setStepValid] = useState({
        step1: false,
        step2: false,
        step3: true,
        step4: false,
        step5: false,
    });

    const goToNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const goToPrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData({
            ...formData,
            [field]: value
        });
        validateForm(field, value);
    };

    const validateForm = (field: string, value: any) => {
        let valid = false;

        switch (field) {
            case 'email':
                valid = /\S+@\S+\.\S+/.test(value);
                setStepValid({ ...stepValid, step1: valid && formData.password.length > 0 });
                break;
            case 'password':
                valid = value.length > 0;
                setStepValid({ ...stepValid, step1: valid && /\S+@\S+\.\S+/.test(formData.email) });
                break;
            case 'username':
                valid = value.length > 0;
                setStepValid({ ...stepValid, step2: valid });
                break;
            case 'wgName':
                valid = value.length > 0;
                setStepValid({ ...stepValid, step4: valid });
                break;
            case 'country':
            case 'postalCode':
            case 'city':
                const { country, postalCode, city } = formData;
                valid = field === 'country' ? value.length > 0 && postalCode.length > 0 && city.length > 0
                    : field === 'postalCode' ? country.length > 0 && value.length > 0 && city.length > 0
                        : country.length > 0 && postalCode.length > 0 && value.length > 0;
                setStepValid({ ...stepValid, step5: valid });
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        console.log('Form Data Submitted:', formData);
        // Hier können die Daten an einen Server gesendet werden, z.B. per fetch oder axios
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle style={{textAlign: 'center'}}>Registrierung</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSwiper={(swiper) => swiperRef.current = swiper}
                    >
                        <SwiperSlide>
                            <RegisterStep1 onNext={goToNextSlide} handleInputChange={handleInputChange} isNextDisabled={!stepValid.step1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RegisterStep2 onNext={goToNextSlide} onPrev={goToPrevSlide} handleInputChange={handleInputChange} isNextDisabled={!stepValid.step2} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RegisterStep3 onNext={goToNextSlide} onPrev={goToPrevSlide} handleInputChange={handleInputChange} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CreateWgStep1 onNext={goToNextSlide} onPrev={goToPrevSlide} handleInputChange={handleInputChange} isNextDisabled={!stepValid.step4} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CreateWgStep2 onPrev={goToPrevSlide} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isNextDisabled={!stepValid.step5} />
                        </SwiperSlide>
                    </Swiper>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;
