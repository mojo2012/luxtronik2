'use strict';

var luxtronik = require('../luxtronik.js');
var assert = require('assert');
var fs = require('fs');

describe('Test luxtronik integration', function () {
    describe('Test energy usage calculation', function () {
        it('should return undefined when the heatpump is not running', function () {
            const pump = luxtronik.createConnection('127.0.0.1', 8888);
            const path = fs.realpathSync('./test/data/response_heatpump_not_running.json');
            const data = JSON.parse(fs.readFileSync(path));
            const energyUsage = pump._calculateElectricEnergyConsumption(data.values);

            assert.equal(energyUsage, undefined);
        });

        it('should return ~1.8kWh when the heating is running', function () {
            const pump = luxtronik.createConnection('127.0.0.1', 8888);
            const path = fs.realpathSync('./test/data/response_heatpump_running_heating.json');
            const data = JSON.parse(fs.readFileSync(path));
            const energyUsage = pump._calculateElectricEnergyConsumption(data.values);

            assert.equal(energyUsage >= 1800, true);
        });

        it('should return ~3kWh when the hotwater production is running', function () {
            const pump = luxtronik.createConnection('127.0.0.1', 8888);
            const path = fs.realpathSync('./test/data/response_heatpump_running_hotwater.json');
            const data = JSON.parse(fs.readFileSync(path));
            const energyUsage = pump._calculateElectricEnergyConsumption(data.values);

            assert.equal(energyUsage >= 2800, true);
        });
    });
});

