var ChatMessagesView = Backbone.View.extend({
	tagName: "div", // default
	collection: ChatMessages,
	render: function(){
		var rendered = this.template({messages: this.collection.toJSON()});
		this.$el.html(rendered);
		console.log("rendered");
		return this;
	},
	initialize: function(){
		var source = $("#chat-messages-template").html();
		this.template = Handlebars.compile(source);
		// fetch messages from API
		this.collection.fetch();
		// chat container listens to changes in collection
		this.listenTo(this.collection, 'add', this.render);
	}
});

var ChatFormView = Backbone.View.extend({
	tagName: "div", //default
	render: function(){
		this.$el.html(this.template); // set html of element to the compiled template
		return this;	// always return this from render function
	},
	initialize: function(){
		var source = $("#chat-form-template").html();	// get the html template from the DOM
		this.template = Handlebars.compile(source);		// run the html through Handlebars
	},
	events: {
			'click .form-submit': 'sendChat'
	},
	sendChat: function(e){
		e.preventDefault();
		this.collection.create({
			author: 'Jessica',
			text: this.$('input').val()
		});
		this.$('input').val("");
	}
});

