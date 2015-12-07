Template.front.helpers({
  articles:function(){

  	var filteredArticles = _.uniq(Articles.find().fetch(), true, function(article) {
  		console.log(article, article.root_id)
  		return article.root_id;
  	});

    return filteredArticles;
  }
});
