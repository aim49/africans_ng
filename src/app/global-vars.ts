export class globalvars {
  public static apiURL: string = 'http://localhost:8080/';
  public static authURL: string =
    'http://localhost:8080/oauth/token?grant_type=password&';
  public static errorsInitAndReset: any = {
    // save initial values
    init: function () {
      var origValues: any = {};
      for (var prop in this) {
        if (this.hasOwnProperty(prop) && prop != 'origValues') {
          origValues[prop] = this[prop];
        }
      }
      this.origValues = origValues;
    },
    // restore initial values
    reset: function () {
      for (var prop in this.origValues) {
        this[prop] = this.origValues[prop];
      }
    },
  };
}
