import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


// Modules
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from "./pipes/pipe.module";

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';

// Services
import { ApiService } from "./services/api.service";
import { CustomInterceptor } from "./interceptor/custom.interceptor";
import { LinkService } from "./services/link.service";
import { MetaService } from "./services/meta.service";
import { LocalStorageService } from "./services/local-storage.service";
import { AuthService } from "./services/auth.service";
import { HelpersService } from "./services/helpers.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ProductComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "sample-app" }),
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        PipeModule
    ],
    providers: [
        ApiService,
        {
            multi:    true,
            provide:  HTTP_INTERCEPTORS,
            useClass: CustomInterceptor
        },
        LinkService,
        MetaService,
        LocalStorageService,
        AuthService,
        HelpersService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
