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
		// fetch messages on a timer
		self = this; // ??
		window.setInterval(function(){
			self.collection.fetch();
		}, 5000);
	}
});

var ChatFormView = Backbone.View.extend({
	tagName: "div", //default
	render: function(){
		// set html of element to the compiled template
		this.$el.html(this.template);
		// always return this from render function
		return this;
	},
	initialize: function(){
		// get the html template from the DOM
		var source = $("#chat-form-template").html();
		// run the html through Handlebars
		this.template = Handlebars.compile(source);
	},
	events: {
		'click .form-submit': 'sendChat',
		'click .form-refresh': 'refreshMessages'
	},
	sendChat: function(e){
		e.preventDefault();
		this.collection.create({
			author: 'Jessica',
			text: this.$('input').val()
		});
		this.$('input').val("");
	},
	refreshMessages: function(){
		this.collection.fetch();
	}
});

