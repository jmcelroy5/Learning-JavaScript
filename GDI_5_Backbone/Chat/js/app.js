var testMessages = [
	{text: "Hello world", author: "Jessica"},
	{text: "What a beautiful day", author: "Jessica"},
	{text: "Want to go for a walk?", author: "Jessica"},
	{text: "Give me coffee.", author: "Jessica"},
	{text: "I'm never going to get a job.", author: "Jessica"}
];

// Creating the collection
var messagesCollection = new ChatMessages();

// Creating the chat messages view
var messagesView = new ChatMessagesView({
	collection: messagesCollection,
	el: $(".chat-messages-wrapper")
}).render();

// Creating the form view
var chatForm = new ChatFormView({
	collection: messagesCollection,
	el: $(".chat-form-wrapper")
}).render();

