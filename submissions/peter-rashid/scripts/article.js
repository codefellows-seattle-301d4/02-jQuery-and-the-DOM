var articles = [];

function Article (opts) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.author = opts.author;
  this.title = opts.title;
  this.category = opts.category;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);
  $newArticle.attr('href', this.authorUrl);
  $newArticle.find('a').text(this.author);
  $newArticle.find('.article-body').html(this.body);

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // This is a separate inclusion of the publication date as a 'title' attribute
  // to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.append('<hr>');

  // TODO: This cloned article is no longer a template, so we should remove that class...
  $newArticle.removeClass('template');
  return $newArticle;
};

// Sort our data by date published, descending order
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// Now iterate through our transformed collection and instantiate a new Article
//  instance.
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

// Append each Article to the DOM. Look carefully:
//   This '.toHtml' method is one we created.
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
