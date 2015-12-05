Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function(){
  //For development purposes?  Discuss
  this.render('front')
  //Actual future implementation?
  //this.redirect("/admin/Intro_to_Clearing_House");
})

Router.route('/new', function(){
  if(Meteor.user())
    this.render('new');
});

Router.route('/:author/:article_url', function () {
  var article = Articles.findOne({username:this.params.author, url:this.params.article_url});
  if(!!article)
    this.render('article', {data: article});
  else
    this.render('article', {data: {title:this.params.article_url + ": Not Found", body:"¯\\_(ツ)_/¯"}})
});
