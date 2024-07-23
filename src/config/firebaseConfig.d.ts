import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

declare const app: FirebaseApp;
declare const db: Firestore;

export { app, db };
