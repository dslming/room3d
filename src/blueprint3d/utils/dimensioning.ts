// / <reference path="../core/configuration.ts" />


/** Dimensioning in Inch. */
export const dimInch: string = "inch";

/** Dimensioning in Meter. */
export const dimMeter: string = "m";

/** Dimensioning in Centi Meter. */
export const dimCentiMeter: string = "cm";

/** Dimensioning in Milli Meter. */
export const dimMilliMeter: string = "mm";

/** The dimensioning unit for 2D floorplan measurements. */
export const configDimUnit = "dimUnit";

/** Dimensioning functions. */
export class Dimensioning {
  /** Converts cm to dimensioning string.
   * @param cm Centi meter value to be converted.
   * @returns String representation.
   */
  // public static cmToMeasure(cm: number): string {
  //   switch (Core.Configuration.getStringValue(configDimUnit)) {
  //     case dimInch:
  //       var realFeet = ((cm * 0.393700) / 12);
  //       var feet = Math.floor(realFeet);
  //       var inches = Math.round((realFeet - feet) * 12);
  //       return feet + "'" + inches + '"';
  //     case dimMilliMeter:
  //       return "" + Math.round(10 * cm) + " mm";
  //     case dimCentiMeter:
  //       return "" + Math.round(10 * cm) / 10 + " cm";
  //     case dimMeter:
  //     default:
  //       return "" + Math.round(10 * cm) / 1000 + " m";
  //   }
  // }
}
