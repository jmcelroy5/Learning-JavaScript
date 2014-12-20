var ChatMessage = Backbone.Model.extend({
	defaults: {
		author: "Unknown",
		text: "",
		time: (new Date()).getTime()
	},
	getPurified: function(){
		// worst purification method ever
		var clean_text = this.get("text").replace(/shit|damn|crap|fuck/, '****');
		this.set('text', clean_text);
		return clean_text;
	},
	initialize: function(model){
		this.getPurified();
	}
});

var ChatMessages = Backbone.Collection.extend({
	model: ChatMessage,
	url: "http://backchat-backend.appspot.com/messages",
	comparator: function(message){
		return message.get("time");
	}
});



