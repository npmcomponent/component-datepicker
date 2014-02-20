/**
 * Module dependencies.
 */

var bind = require('component-bind')
  , Calendar = require('component-calendar')
  , Popover = require('component-popover')
  , event = require('component-event')

/**
 * Expose `Datepicker`.
 */

module.exports = Datepicker;

/**
 * Initialize a new date picker with the given input `el`.
 *
 * @param {Element} el
 * @api public
 */

function Datepicker(el) {
  if (!(this instanceof Datepicker)) return new Datepicker(el);
  this.el = el;
  this.cal = new Calendar;
  this.cal.addClass('datepicker-calendar');
  event.bind(el, 'click', bind(this, this.onclick));
}

/**
 * Handle input clicks.
 */

Datepicker.prototype.onclick = function(e){
  if (this.popover) return;
  this.cal.once('change', bind(this, this.onchange));
  this.popover = new Popover(this.cal.el);
  this.popover.classname = 'datepicker-popover popover';
  this.popover.show(this.el);
};

/**
 * Handle date changes.
 */

Datepicker.prototype.onchange = function(date){
  this.el.value = date.getFullYear()
    + '/'
    + (date.getMonth() + 1)
    + '/'
    + date.getDate();

  this.popover.remove();
  this.popover = null;
};
