import {Injectable} from '@angular/core';
import * as CONSTANTS from './constants';

@Injectable()
export class RequestService {

  constructor() {
  }

  call(params, cb) {

    const callback = data => {
      if (typeof cb === 'function') {
        cb(data);
      }
    };

    const success = true;
    const doRequest = () => {

      const is_debug = true,
        allowed_transports = ['websocket', 'http'],
        allowed_methods = ['get', 'post', 'delete', 'put'],
        {method = 'GET', data, expected_status = 1, is_absolute_url} = params;

      let {url, transport} = params;

      if (
        !url
      ) {
        return callback({
          'success': !success,
          'result': {
            'message': 'Request: Url is required !'
          }
        });
      }

      if (
        !method ||
        allowed_methods.indexOf(method.toLowerCase()) === -1
      ) {
        return callback({
          'success': !success,
          'result': {
            'message': 'Request: Method is required !'
          }
        });
      }

      if (
        !transport ||
        allowed_transports.indexOf(transport.toLowerCase()) === -1
      ) {
        transport = 'http';
      }

      const original_transport = transport.toUpperCase(),
        original_method = method.toUpperCase(),
        original_url = is_absolute_url ? url : CONSTANTS.API_URL['development'] + url,
        original_data = data ? {...data} : {};


      if (expected_status !== undefined) {
        const expected_statuses = {
          '-1': 'ERROR',
          '0': 'EMPTY',
          '1': 'EXISTS'
        };

        if (url.startsWith('/')) {
          url = url.replace('/', '');
        }

        const selected_status = expected_statuses[expected_status],
          local_url = `_${method.toUpperCase()}_${url}_${selected_status}.json`,
          _success = selected_status !== 'ERROR',
          status = _success ? 200 : 500,
          response = {
            _success,
            'result': require(`./src/renderer/templates/expected_responses/${local_url}`)
          };

        setTimeout(() => {
          if (is_debug) {
            debug(status, response);
          }
          callback(response);
        }, 2000);

      } else if (transport === 'http') {

        const token = ''; // AUTH.token();
        const headers = {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded'
        };

        if (token) {
          headers['Authorization'] = token;
        }

        const options = {
          'url': original_url,
          method,
          data,
          headers
        };

        if (method.toUpperCase() === 'GET') {
          options['params'] = options.data;
          delete options.data;
        }

        // $http(
        //   options
        // ).then(
        //   response => {
        //     let {
        //       data: {
        //         success,
        //         result = {}
        //       },
        //       status
        //     } = response;
        //
        //     if (is_debug) {
        //       debug(status, {
        //         success,
        //         result
        //       });
        //     }
        //
        //     callback({
        //       success,
        //       result
        //     });
        //
        //   }
        // ).catch(
        //   response => {
        //     const {
        //       status,
        //       data = {}
        //     } = response;
        //
        //     let {result = {}} = data;
        //     const success = false;
        //     let {message = 'Error while requesting'} = result;
        //
        //     switch (status) {
        //       case  -1 :
        //         message = 'Server is down';
        //         break;
        //       case  404 :
        //         message = 'Url is not found';
        //         break;
        //     }
        //
        //     result = {
        //       message
        //     };
        //
        //     if (is_debug) {
        //       debug(status, {
        //         success,
        //         result
        //       });
        //     }
        //
        //     callback({
        //       success,
        //       result
        //     });
        //   }
        // );
      } else {
        return callback({
          'success': !success,
          'result': 'SocketIO not implemented yet'
        });
      }

      const debug = (status, response) => {
        console.log(
          status,
          original_transport,
          original_method,
          original_url,
          original_data,
          response
        );
      };


    };

    doRequest();

  }

}
