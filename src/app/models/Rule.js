const { isWithinInterval, parseISO } = require('date-fns');
const { format } = require('date-fns-tz');
const { resolve } = require('path');
const fs = require('fs');

const pathFile = require('../config/database');

class Rule {
  constructor() {
    this.rules = [];
    this.path = resolve(__dirname, '..', '..', 'database', pathFile.db);
    this.loadJson();
  }

  loadJson() {
    const localRules = [];

    fs.readFile(this.path, 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else if (data) {
        const rules_obj = JSON.parse(data);
        rules_obj.map(rule => localRules.push(rule));
      }
    });

    this.rules = localRules;
  }

  /**
   * @api http://localhost:3334/
   * @apiGroup List
   *
   *
   * @apiSuccess {Array} Lists all rules stored in the constructor rules variable
   *
   * @apiSuccessExample {json}
   *    HTTP/1.1 200 OK
   *    [
   *      {
   *        "id": 1,
   *        "type": "daily",
   *        "date": null,
   *        "days": [],
   *        "hours": [
   *         {
   *            "start": "05:00",
   *            "end": "06:05"
   *          }
   *        ]
   *      }
   *     ]
   *
   *
   */

  list() {
    const rules = [...this.rules];
    return rules.map(r => ({
      ...r,
      date: r.date
        ? r.date
            .split('-')
            .reverse()
            .join('-')
        : null,
    }));
  }

  /**
   * @api http://localhost:3334/rules/period
   * @apiGroup Period
   *
   * @apiParam {Date} since > "2019-11-01"
   * @apiParam {Date} until > "2019-11-13"
   * @apiSuccess {Array} Lists all rules in a given period;
   *
   * @apiSuccessExample {json}
   *    HTTP/1.1 200 OK
   *    [
   *      {
   *        "id": 2,
   *        "type": "specific",
   *        "date": 01-11-2019,
   *        "days": [],
   *        "hours": [
   *         {
   *            "start": "05:00",
   *            "end": "06:05"
   *          },
   *          {
   *            "start": "06:20",
   *            "end": "07:00"
   *          }
   *        ]
   *      },
   *
   *       {
   *        "id": 2,
   *        "type": "specific",
   *        "date": 10-11-2019,
   *        "days": [],
   *        "hours": [
   *         {
   *            "start": "05:00",
   *            "end": "06:05"
   *          },
   *          {
   *            "start": "06:20",
   *            "end": "07:00"
   *          }
   *        ]
   *      }
   *     ]
   *
   *
   */

  period(data) {
    const { start, end } = data;

    const rules = [...this.rules];
    const rules_period = [];

    rules.forEach(rule => {
      if (rule.date) {
        const date_aux = parseISO(rule.date);
        const date = parseISO(format(date_aux, 'yyyy-MM-dd'));

        const interval = isWithinInterval(date, { start, end });
        if (interval) rules_period.push(rule);
      }
    });

    return rules_period.map(r => ({
      ...r,
      date: r.date
        .split('-')
        .reverse()
        .join('-'),
    }));
  }

  /**
   * @api http://localhost:3334/rules/:type
   * @apiGroup Create
   *
   * @apiParam {string} type > :type ['specific', 'daily', 'weekly'];
   * @apiParam {Date} date_start  > "2020-03-05 13:00:00";
   * @apiParam {Date} date_end  > "2020-03-05 14:05:00";
   * @apiParam {Array} days > [ 'Monday', 'Friday' ];
   * @apiSuccess {Array} Lists all rules;
   *
   * @apiSuccessExample {json}
   *    HTTP/1.1 200 OK
   *    [
   *      {
   *        "id": 2,
   *        "type": "specific",
   *        "date": 05-03-2020,
   *        "days": [],
   *        "hours": [
   *         {
   *            "start": "05:00",
   *            "end": "06:05"
   *          },
   *          {
   *            "start": "06:20",
   *            "end": "07:00"
   *          }
   *        ]
   *      }
   *     ]
   *
   *
   */
  create(type, data) {
    const { days, date_start, date_end } = data;
    const date = format(parseISO(date_start), 'yyyy-MM-dd');
    const start = format(parseISO(date_start), 'HH:mm');
    const end = format(parseISO(date_end), 'HH:mm');

    const date_aux = date || null;
    const days_aux = days || [];

    const findDate_specific = this.rules.find(
      rule => rule.date === date_aux && rule.type === type
    ); // specific

    if (findDate_specific) {
      this.rules
        .find(rule => rule.date === date_aux && rule.type === type)
        .hours.push({ start, end });
    } else {
      const id = this.rules[this.rules.length - 1].id + 1;

      const rule = {
        id,
        type,
        date: date_aux,
        days: days_aux,
        hours: [
          {
            start,
            end,
          },
        ],
      };

      this.rules.push(rule);
    }

    const strJson = JSON.stringify(this.rules);

    fs.writeFile(this.path, strJson, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
    });

    const rules = [...this.rules];

    return rules.map(r => ({
      ...r,
      date: r.date
        ? r.date
            .split('-')
            .reverse()
            .join('-')
        : null,
    }));
  }

  update(type, data) {
    const { days, date_start, date_end } = data;
    const days_aux = days || [];
    const index = this.rules.findIndex(rule => rule.type === type);

    this.rules[index].days = days_aux;
    this.rules[index].hours[0].start = format(parseISO(date_start), 'HH:mm');
    this.rules[index].hours[0].end = format(parseISO(date_end), 'HH:mm');

    const strJson = JSON.stringify(this.rules);

    fs.writeFile(this.path, strJson, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
    });

    return this.rules;
  }

  /**
   * @api  http://localhost:3334/rules/5
   * @apiGroup Delete
   *
   * @apiParam {Number} id > 5
   * @apiSuccess {Array} Lists all rules
   *
   * @apiSuccessExample {json}
   *    HTTP/1.1 200 OK
   *    true
   *
   */

  delete(id) {
    const { rules } = this;

    const index = rules.findIndex(rule => rule.id === parseInt(id));
    console.log(index);

    if (index !== -1) {
      const delet = this.rules.splice(index, 1);
      const json = JSON.stringify(this.rules);

      fs.writeFile(this.path, json, 'utf8', function(err) {
        if (err) throw err;
        console.log('Banco atualizado');
      });

      if (delet) {
        return true;
      }
    } else {
      return 'error';
    }
  }
}

module.exports = new Rule();
