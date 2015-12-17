Template.front.helpers({
  articles:function(){

  	// var filteredArticles = Articles.find({}, {sort:{'updatedAt': 'asc'}});

		var filteredArticles = _.uniq(Articles.find({},{sort:{'updatedAt': 'asc'}}).fetch(), true, (article) => {
			return article.root_id;
		});

    return filteredArticles;
  }
});
