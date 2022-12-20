// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sessionApi: {
    url: 'http://localhost:8080/sessions/api/today',
    domain: 'localhost:8080'
  },
  menuApi: {
    url: 'http://localhost:8000/api/menu',
    domain: 'localhost:8000'
  },
  orderApi: {
    url: 'http://localhost:9000/order-sandwiches',
    domain: 'localhost:9000'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
