import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class HelpersService {

  constructor(private location: Location) { }

  /**
   * This method will prepare query params from array of input.
   * ! Params is an object and any key must has array value.
   *
   * @param params
   */
  public makeQueryParam(params: any) {

    const urlParams: any[] = [];

    for ( const key in params ) {
      if ( params[key] && params[key].length > 0 ) {
        if (typeof params[key] === 'object') {
          urlParams.push(key + '=' + params[key].join(','));
        } else {
          urlParams.push(key + '=' + params[key]);
        }
      }
    }

    let queryString = urlParams.length > 0 ? "?" + urlParams.join("&") : "";

    if ( queryString.length > 0 ) {
      return queryString;
    }
    return "";
  }

  /**
   * This method will change route params.
   * ! Route is required.
   * ! Params is an object and any key must has array value.
   * @param route
   * @param params
   */
  public changeRouteParams(route, params: any) {
    const queryString = this.makeQueryParam(params);
    if ( queryString.length > 0 ) {
      const url = route + queryString;
      this.location.go(url);
      return true;
    }
  }

  /**
   * This method will create slug to use in routes.
   *
   * @param name
   */
  public createSlug(name) {
    if ( !name ) {
      return 'not-valid';
    }
    return name
      .replace(/\s+/g, '-')
      .replace(/[0-9]/gi, '-')
      .replace(/\//g, '-')
      .replace(/\\/g, '-')
      .replace(/\\/g, '-')
      .replace(/[)(_;:|,.&*%]/g, '-')
      .replace(/-$/g, '')
      .replace(/^-/g, '')
      .replace(/\-\-/gi, ' ')
      .replace(/\s+/g, '-');
  }


  public handleResponseError(error, formError, defaultField = 'name') {

    if ( error.code !== 422 && error.message ) {
      formError[defaultField] = error.message;
      return false;
    }

    if ( error.code === 422 && error.message ) {

      for ( const key in formError ) {

        if ( error.message[key] && error.message[key].length > 0 ) {
          formError[key] = error.message[key][0];
        }

      }

    }
  }


}
