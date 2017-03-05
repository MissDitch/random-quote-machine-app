$(document).ready(function() {	
  init();
  $("#quoteBtn").click(changeQuote);
  $("#twitterBtn").click(sendTweet);
})


function init() {
  getQuoteWithJquery();
  changeColor();  
}

function sendTweet(e) {
  var post = '"' + $("#quote-content").html() +  '" ' + $("#quote-title").html();
  var filtered = post.replace(/<p>|<\/p>/g, "");
  e.target.href = "https://twitter.com/intent/tweet?hashtags=designquotes&text=" + filtered;
}

function changeQuote(e) {
  e.preventDefault(); 
  getQuoteWithJquery();
  changeColor(); 
}

function getQuoteWithJquery() { 
   $.ajax( {
     url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
     success: function(data) {
       var post = data.shift();
       console.log(post);
       $("#quote-content").html(post.content);
       $("#quote-title").text(post.title);
       // If the Source is available, use it. Otherwise hide it.
       if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
         $('#quote-source').html('Source:' + post.custom_meta.Source);
       } else {
         $('#quote-source').text('');
       }
     },
     cache: false
  });
}

function changeColor() {
  var hex = "#"; 
  var chars = "1234567890ABCDEF";
  for(var i = 0; i < 6; i++ ) {   
    var pos = Math.floor(Math.random() * 13); 
    //13: if  you can't put D E or F in the color, it prevents color becoming too light
    hex += chars[pos];   
  }
  $("body").css(   
   "background-color", hex);
  $(".main").css("color", hex );
  $(".quote").css("color", hex );
  $(".btn").css("background-color", hex); 
}
