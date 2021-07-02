// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  GET_STUDENT_URL: 'https://click-admin.herokuapp.com/click-escuela/admin-core/school/' + '{schoolId}' + '/student?fullDetail=' + '{fullDetail}',
  POST_STUDENT_URL: 'https://click-admin.herokuapp.com/click-escuela/admin-core/school/' + '{schoolId}' + '/student',
  GET_GRADES: 'http://18.118.163.213:8081/click-escuela/teacher-core/school/{schoolId}/grade',
  POST_GRADES: 'http://18.118.163.213:8081/click-escuela/teacher-core/school/{schoolId}/grade'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
