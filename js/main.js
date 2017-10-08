(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};


// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 30,
		occupation: 'worker',
		gender:'unknown'
		
	}
});

// A List of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},
	
	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	}
});

// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	
	events: {
	 'click .edit' : 'editPerson',
	 'click .delete' : 'DestroyPerson'	
	},
	
	editPerson: function(){
		var newName = prompt("Please enter the new name", this.model.get('name'));
		var newAge = prompt("Please enter the new age", this.model.get('age'));
		var newOccupation = prompt("Please enter the new occupation", this.model.get('occupation'));
		var newGender = prompt("Please enter the new gender", this.model.get('gender'));
		if (newName ) this.model.set('name', newName);
		if (newAge )this.model.set('age', newAge);
		if (newOccupation )this.model.set('occupation', newOccupation);
		if (newGender )this.model.set('gender', newGender);
	},
	
	DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});


App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'
	},

	submit: function(e) {
	    var persondefault= new App.Models.Person();
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('#newname').val();
	    if (! newPersonName) newPersonName = persondefault.get('name');
		var newPersonAge = $(e.currentTarget).find('#newage').val();
		if (! newPersonAge) newPersonAge = persondefault.get('age');
		var newPersonOccupation = $(e.currentTarget).find('#newoccupation').val();
		if (! newPersonOccupation) newPersonOccupation = persondefault.get('occupation');
		var newPersonGender = $(e.currentTarget).find('#newgender').val();
		if (! newPersonGender) newPersonGender = persondefault.get('gender');
		var person = new App.Models.Person({ name: newPersonName , age: newPersonAge, occupation: newPersonOccupation, gender:newPersonGender });
		this.collection.add(person);
	

	}
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer',
		gender:'male'
		
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
		
	}
]);
var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
})();
