if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    	var intro = {root_id: 0,
    							 title: "Intro to Clearing House",
    							 username:"admin",
                   updatedAt: new Date(),
    							 createdAt: new Date(),
    							 body: "Welcome to Clearing House!\
    							 				This is the app that let's you create pages for things\
    							 				and vote on those pages. If you are just getting started, good!"}
    intro.url = URLify2(intro.title);
    if(Articles.find().fetch().length == 0){
      Articles.insert(intro);
    }
  });

  Meteor.methods({
    newArticle: function(article){
      if (!Meteor.user())
        return;
      article.url = URLify2(article.title);
      article.updatedAt = new Date();
      article.createdAt = new Date();
      article.revision = 0;
      var id = Articles.insert(article, function(error, id){
        Articles.update(id, {$set:{root_id:id}});
      });
    },
    saveArticle: function(article){
    	if (!Meteor.user())
    		return;
    	article.updatedAt = new Date();
			Articles.insert(article);
    }
  })
}
