import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';//bagong add ko lang oct 11
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe, TitleCasePipe } from '@angular/common';
// import { Geolocation } from '@capacitor/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';
// import { WebSocketServer } from '@ionic-native/web-socket-server';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';




@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, //bagong add ko lang oct 11
    ImageCropperModule,
    IonicStorageModule.forRoot(), 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    TitleCasePipe,
    Geolocation,
    CallNumber,
    Clipboard,
    FileTransfer,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
