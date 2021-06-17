import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/index";

@Injectable()

export class CustomInterceptor implements HttpInterceptor {

    constructor () { }

    /**
     * Intercept HTTP Requests
     *
     * @Param  {HttpRequest} Request
     * @Param  {HttpHandler} Next
     *
     * @Return {HttpEvent}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set Default Headers
        req = req.clone({
            setHeaders: {
                'Accept': 'application/json',
            }
        });

        // TODO: Implement token service
        /*const hasToken = this.tokenService.getAllTokenModel();
        if ( hasToken ) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.tokenService.getToken()
                }
            });
        }*/

        return next.handle(req);

    }
}
