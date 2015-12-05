Template.new.events({
  'click #submit': function(){
    if(! Meteor.user())
      return;

    var title = document.getElementById("title").value;
    var body = document.getElementById("body").value;

    var article = {
      title:title,
      username: Meteor.user().username,
      body:body,
    }

    Meteor.call('newArticle', article)

    Router.go('/');
  }
});
