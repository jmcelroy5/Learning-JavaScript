// insert your new code here

var areGirlDevelopersCool = true;

// Creating a Backbone Model 
var Person = Backbone.Model.extend({
	// default attributes
	defaults: {
		role: 'hater',
		imgUrl: 'http://uproxx.files.wordpress.com/2012/09/grumpy-cat-03.jpg',
		firstName: 'Grumpy',
		lastName: 'Cat'
	},
	// custom method on a Person model
	generateUserName: function(){
		var username = this.get('firstName') + this.get('lastName');
		this.set('userName', username);
		return username;
	},
	// initialize 
	initialize: function() {
		this.generateUserName();
	}
});

// this person model will get the default attributes
var person = new Person();

// Creating a new Backbone Collection (group of person models)
var People = Backbone.Collection.extend({
	model: Person,
	comparator: function(model){
		return model.get('lastName').toLowerCase();
	}
});

// Instantiating a Backbone Collection
var people = new People([
	{role:'engineer',
	imgUrl: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/287.jpg',
	firstName: 'Bethany',
	lastName: 'Brickson'
	},
	{role:'philosopher',
	imgUrl: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/140.jpg',
	firstName: 'Benjamin',
	lastName: 'Button'
	},
	{role:'storyteller',
	imgUrl: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/139.jpg',
	firstName: 'Betty',
	lastName: 'Beamer'
	}]);

people.add(
	{role:'chef',
	imgUrl: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg',
	firstName: 'Bartholomew',
	lastName: 'Betterman'
	});

// Define what the view looks like for a single person
var PersonView = Backbone.View.extend({
	tagName: "div", // default
	className: "rolodex",
	render: function(){
		// create an img and set src attr to model's imgurl
		var personPic = $('<img />');
		personPic.attr('src', this.model.get('imgUrl'));
		// $el references the element that view is creating
		this.$el.append(personPic);
		// render function should return 'this'
		return this;
	},
	events: {
		'click': 'onClick'
	},
	onClick: function(){
		alert("Hey, you poked my face!");
	}
});

// instantiating sample view for a specific person 
var personView = new PersonView({
	model: person
});

// Define what a view looks like for a collection of people
var RolodexView = Backbone.View.extend({
	tagName: "div",
	initialize: function(){
		// re-render on changes to collection
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function(){
		// ??
		var source   = $("#rolodex-template").html();
		var template = Handlebars.compile(source);
		var rendered = template({people: this.collection.toJSON()});
		this.$el.append(rendered);
		return this;
	}
});

var rolodexView = new RolodexView({
	collection: people
});

$(document).ready(function() {
	rolodexView.render();
	$("body").append(rolodexView.$el);
});




