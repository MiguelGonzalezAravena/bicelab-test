'use strict';
const axios = require('axios');
const moment = require('moment');
const reply = require('../utils/reply');
const baseUrl = process.env.npm_package_config_URL_BACK;
const validKeyValues = process.env.npm_package_config_VALID_KEY_VALUES.split('|');
const validDateFormat = process.env.npm_package_config_VALID_DATE_FORMAT;

module.exports = {
  getLast: async (req, res) => {
    try {
      // Get last values from all elements
      let newData = [];
      const response = await axios.get(baseUrl + 'last');

      // Creating new array of values
      Object.entries(response.data).forEach(async ([ key, value ]) => {
        await newData.push(value);
      });

      res.json(reply.ok(newData));  
    } catch(err) {
      res.json(reply.error(err));
    }
  },
  getValues: async (req, res) => {
    try {
      // Arguments
      const args = JSON.parse(req.body.arg === undefined ? '{}' : req.body.arg);

      // Validation
      if(!args.hasOwnProperty('key') || args.hasOwnProperty('key') && args.key.length == 0) {
        res.json(reply.error('Por favor, ingresa el elemento a consultar.'));
      } else if(validKeyValues.indexOf(args.key) == -1) {
        res.json(reply.error('Por favor, ingresa un elemento válido.'));
      } else {
        // Get all values from a specific element
        let newData = [];
        const response = await axios.get(`${baseUrl}values/${args.key}`);
        /*
        // Creating new array of values
        Object.entries(response.data.values).forEach(async ([ key, value ]) => {
          await newData[]
        });
        */

        res.json(reply.ok(response.data || {}));
      }
    } catch(err) {
      console.log('error', err);
      res.json(reply.error(err));
    }
  },
  getValuesByDate: async (req, res) => {
    try {
      // Arguments
      const args = JSON.parse(req.body.arg === undefined ? '{}' : req.body.arg);

      // Validation
      if(!args.hasOwnProperty('key') || args.hasOwnProperty('key') && args.key.length == 0) {
        res.json(reply.error('Por favor, ingresa el elemento a consultar.'));
      } else if(!args.hasOwnProperty('date') || args.hasOwnProperty('date') && args.date.length == 0) {
        res.json(reply.error('Por favor, ingresa la fecha a consultar.'));
      } else if(validKeyValues.indexOf(args.key) == -1) {
        res.json(reply.error('Por favor, ingresa un elemento válido.'));
      } else if(!moment(args.date, validDateFormat).isValid()) {
        res.json(reply.error('Por favor, ingresa una fecha válida.'));
      } else {
        // Get all values from a specific element and date
        const response = await axios.get(`${baseUrl}date/${args.key}/${args.date}`);
        res.json(reply.ok(response.data || {}));
      }
    } catch(err) {
      res.json(reply.error(err));
    }
  },
  getKeys: (req, res) => {
    try {
      res.json(reply.ok(validKeyValues));
    } catch(err) {
      res.json(reply.error(err));
    }
  }
}