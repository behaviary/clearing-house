Template.front.helpers({
  articles:function(){

  	var filteredArticles = _.uniq(Articles.find().fetch(), true, function(article) {
  		return article.root_id;
  	});

    return filteredArticles;
  }
});
