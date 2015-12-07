// TODO:
// New Article
// Edit Article
// 		^be cool if this was on hover for properly permissioned user
// View Article
var EDITING_KEY = "editingArticle";
Session.setDefault(EDITING_KEY, false);

var CAN_EDIT = "currentUserIsAuthor";
Session.setDefault(CAN_EDIT, false);

// for some reason onRendered needs an explicit anon func
Template.article.onRendered(function () {
	var data = this.data;

	if (!Meteor.user())
		return;

	var _canEdit = (Meteor.user().username === data.username);

	Session.set(CAN_EDIT, _canEdit);
});

Template.article.helpers({
	canEdit: () => {
		return Session.get(CAN_EDIT);
	},
	editing: () => {
		return (Session.get(EDITING_KEY));
	}
});

Template.article.events({
	'click .editable': (e, template) => {
		Session.set(EDITING_KEY, true);
	},
	'click #cancel': (e) => {
		Session.set(EDITING_KEY, false);
	},
	'click #submit': (e) => {

		var originalArticle = Template.currentData();
		var _title = originalArticle.title;
		var _body = originalArticle.body;
		var _author = originalArticle.username;
		var titleEl = document.getElementById('js-editTitle');
		var bodyEl = document.getElementById('js-editBody');

		if (titleEl != null)
			_title = titleEl.value;

		if (bodyEl != null)
			_body =  bodyEl.value;

		Session.set(EDITING_KEY, false);

		// Just a note for future of other authors editing content
		// if (Meteor.user !== _author)
		// _author = Meteor.user;
		var _url = URLify2(_title);
		var article = originalArticle;

		var article = {
			revision: originalArticle.revision + 1,
			title: _title,
			body: _body,
			url: URLify2(_title),
			username: _author
		};

		Meteor.call('saveArticle', article);

		// Not sure if this is the safest way to do this.
		Router.go('article.show', {author: _author, article_url: _url});
	}
});
