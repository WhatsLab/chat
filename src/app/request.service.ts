import {Injectable} from '@angular/core';
import * as CONSTANTS from './constants';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RequestService {

  private is_debug = true;
  private success = true;
  private original_transport;
  private original_method;
  private original_url;
  private original_data;
  private allowed_transports = ['websocket', 'http'];
  private allowed_methods = ['get', 'post', 'delete', 'put'];

  constructor(private http: HttpClient) {
  }

  errorResponse(error, callback) {
    const result = {
      'success': error.ok,
      'result': error.body
    };

    if (this.is_debug) {
      this.debug(error.status, result);
    }

    callback(result);
  }

  successResponse(res, callback) {
    const result = {
      'success': res.ok,
      'result': res.body
    };

    if (this.is_debug) {
      this.debug(res.status, result);
    }

    callback(result);
  }

  debug(status, response) {
    console.log(
      status,
      this.original_transport,
      this.original_method,
      this.original_url,
      this.original_data,
      response
    );
  }

  call(params, cb) {

    const callback = output => {
      if (typeof cb === 'function') {
        cb(output);
      }
    };

    const {url, method = 'get', data, force_result, is_absolute_url} = params;

    let {transport} = params;

    if (
      !url
    ) {
      return callback({
        'success': !this.success,
        'result': {
          'message': 'Request: Url is required !'
        }
      });
    }

    if (
      !method ||
      this.allowed_methods.indexOf(method.toLowerCase()) === -1
    ) {
      return callback({
        'success': !this.success,
        'result': {
          'message': 'Request: Method is required !'
        }
      });
    }

    if (
      !transport ||
      this.allowed_transports.indexOf(transport.toLowerCase()) === -1
    ) {
      transport = 'http';
    }

    this.original_transport = transport.toUpperCase();
    this.original_method = method.toUpperCase();
    this.original_data = data ? {...data} : {};


    if (force_result !== undefined) {
      this.original_url = CONSTANTS.MOCK_SERVER['URL'] + url;
    } else {
      this.original_url = is_absolute_url ? url : CONSTANTS.API_URL['development'] + url;
    }


    if (transport === 'http') {


      const options = {
        method: method.toLowerCase(),
        data
      };

      if (force_result !== undefined) {
        const expected_statuses = {
          '-1': 'ERROR',
          '0': 'EMPTY',
          '1': 'EXISTS'
        };

        const selected_status = expected_statuses[force_result || 1].toLowerCase();
        options['url'] = `${this.original_url}_${selected_status}`;

      } else {
        options['url'] = this.original_url;
      }

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      const token = ''; // AUTH.token();
      if (token) {
        headers = headers.append('Authorization', token);
      }

      if (options.method === 'get') {
        let search = new HttpParams();
        for (const key in options.data) {
          if (options.data[key]) {
            search = search.set(key, options.data[key]);
          }
        }
        this.http.get(options['url'], {headers, 'params': search, 'observe': 'response'}).subscribe(res => {
            this.successResponse(res, callback);
          },
          error => {
            this.errorResponse(error, callback);
          });
      } else if (options.method === 'post') {
        this.http.post(options['url'], options.data, {headers, 'observe': 'response'}).subscribe(res => console.log(res));
      }
    } else {
      return callback({
        'success': !this.success,
        'result': 'SocketIO not implemented yet'
      });
    }


  }

}
