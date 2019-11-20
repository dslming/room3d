/** The dimensioning unit for 2D floorplan measurements. */
export const configDimUnit = "dimUnit";
export const dimInch = "inch";
// WALL:
/** The initial wall height in cm. */
export const configWallHeight = "wallHeight";
/** The initial wall thickness in cm. */
export const configWallThickness = "wallThickness";
/** Global configuration to customize the whole system.  */
export class Configuration {
    /** Set a configuration parameter. */
    static setValue(key, value) {
        this.data[key] = value;
    }
    /** Get a string configuration parameter. */
    static getStringValue(key) {
        switch (key) {
            case configDimUnit:
                return this.data[key];
            default:
                throw new Error("Invalid string configuration parameter: " + key);
        }
    }
    /** Get a numeric configuration parameter. */
    static getNumericValue(key) {
        switch (key) {
            case configWallHeight:
            case configWallThickness:
                return this.data[key];
            default:
                throw new Error("Invalid numeric configuration parameter: " + key);
        }
    }
}
/** Configuration data loaded from/stored to extern. */
Configuration.data = {
    dimUnit: dimInch,
    wallHeight: 250,
    wallThickness: 10
};
//# sourceMappingURL=configuration.js.map