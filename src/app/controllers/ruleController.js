const { parseISO, isWithinInterval, isBefore, isValid } = require('date-fns');
const { format } = require('date-fns-tz');
const Rule = require('../models/Rule');

class ruleController {
  async index(__, res) {
    const rules = await Rule.list();

    return res.json({ rules });
  }

  /**
   * @api src/app/Controllers/ruleController.js
   * @apiGroup Conditions
   * @apiDescription
   *  <li> If it really is a date; </li>
   *  <li> When searching for a period, it is checked whether the order of the parameters is correct;</li>
   *  <li> When registering a rule for a specific date, it is analyzed if it has previously registered times.</li>
   *
   */

  async period(req, res) {
    const { since, until } = req.body;
    try {
      const verifyDateSince = isValid(new Date(since));
      const verifyDateUntil = isValid(new Date(until));

      if (!verifyDateSince || !verifyDateUntil) {
        return res.status(401).json({ error: 'Date invalid!' });
      }

      const Since = parseISO(format(parseISO(since), 'yyyy-MM-dd'));
      const Until = parseISO(format(parseISO(until), 'yyyy-MM-dd'));

      // Treatment of possible inversion error in the request
      const biggest_date = isBefore(Since, Until);
      const start = !biggest_date ? Until : Since;
      const end = !biggest_date ? Since : Until;
      const body = { start, end };

      const rules = await Rule.period(body);
      return res.json({ rules });
    } catch (err) {
      if (err) return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    const types = ['specific', 'daily', 'weekly'];
    const { type } = req.params;
    const { date_start, date_end } = req.body;

    const verifyDateStart = isValid(new Date(date_start));
    const verifyDateEnd = isValid(new Date(date_end));

    if (!verifyDateStart || !verifyDateEnd) {
      return res.status(401).json({ error: 'Date invalid!' });
    }

    const ds = parseISO(date_start);
    const de = parseISO(date_end);
    const date = format(ds, 'yyyy-MM-dd');

    try {
      const Rules = await Rule.list();
      const rules = Rules.map(r => ({
        ...r,
        date: r.date
          ? r.date
              .split('-')
              .reverse()
              .join('-')
          : null,
      }));
      const verifyType = types.find(r => r === type);

      if (!verifyType) {
        return res.status(401).json({
          error: `Type ${type} wrong. Please try using one of these [ ${types.map(
            r => r
          )} ]`,
        });
      }

      if (type === 'specific') {
        const findSpecific = rules.find(
          rule => rule.date === date && rule.type === 'specific'
        );
        if (findSpecific) {
          let err = '';
          rules.find(rule => {
            if (rule.date === date && rule.type === 'specific') {
              for (const hour of rule.hours) {
                const hs = parseISO(`${date} ${hour.start}:00`); // Hour Start from DB;
                const he = parseISO(`${date} ${hour.end}:00`); // Hour End from DB;
                const isInterval_start = isWithinInterval(ds, {
                  start: hs,
                  end: he,
                }); // Check if (date_start) is between hours in the database;
                const isInterval_end = isWithinInterval(de, {
                  start: hs,
                  end: he,
                }); // Check if (date_end) is between hours in the databasee

                if (ds !== hs) {
                  if (isInterval_start) {
                    err = 'Hour start beetwen another rule';
                    break;
                  } else if (isInterval_end) {
                    err = 'Hour end beetwen another rule';
                    break;
                  }
                } else {
                  err = 'Hour already exist';
                  break;
                }
              }
            }
          });

          if (err) {
            return res.status(401).json({ error: err });
          }
        }
      } else {
        const findTypes = rules.find(rule => rule.type === type);

        if (findTypes) {
          const update = await Rule.update(type, req.body);

          return res.json({
            menssage: 'Successfully updated rule!',
            update,
          });
        }
      }

      const rule = Rule.create(type, req.body);
      return res.json({
        status: 'Success',
        rules: rule,
      });
    } catch (err) {
      if (err) return res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const rules = await Rule.delete(id);

      if (rules === 'error') {
        return res.status(401).json({ error: 'id invalid!' });
      }
      return res.json(rules);
    } catch (err) {
      if (err) return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ruleController();
