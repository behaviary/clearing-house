if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    	var intro = {id: 0,
    							 title: "Intro to Clearing House",
    							 body: "Welcome to Clearing House!\
    							 				This is the app that let's you create pages for things\
    							 				and vote on those pages. If you are just getting started, good!"}

    if(Articles.find().fetch().length == 0){
      Articles.insert({title: intro.title,
                       username:"admin",
                       url: URLify2(intro.title),
      								 body: intro.body,
      								 createdAt: new Date()});
    }
  });

  Meteor.methods({
    newArticle: function(article){
      if (!Meteor.user())
        return;
      article.url = URLify2(article.title);
      article.createdAt = new Date();
      article.revision = 0;
      var id = Articles.insert(article, function(error, id){
        Articles.update(id, {$set:{root_id:id}});
      });

    }
  })
}
