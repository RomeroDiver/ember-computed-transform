App.Car = Ember.Object.extend({
    CarName: null,
    CarModel: null,
 
    fullDetails: function() {
       return this.get('CarName') + ' ' + this.get('CarModel');
    }.property('CarName', 'CarModel')
 });