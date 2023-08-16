import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './views/auth/auth.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD4S-2J3fm0X5KkINq6ZNzgEVfZq9iQfVw",
  authDomain: "e-university-30961.firebaseapp.com",
  projectId: "e-university-30961",
  storageBucket: "e-university-30961.appspot.com",
  messagingSenderId: "855506186176",
  appId: "1:855506186176:web:72cb067539f33a00616225",
  measurementId: "G-HN19N6EX7S"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
