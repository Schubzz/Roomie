import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth"

declare const app: FirebaseApp;
declare const db: Firestore;

declare const auth: Auth


export { app, db, auth };
