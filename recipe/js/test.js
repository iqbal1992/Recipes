$(document).ready(function (){
// function myFunction(){
//   alert("nbhjh");
// }
        $("button").click(function(){


          $('body').append('<div id="loading"><img id="loading-image" src="images/giphy.gif" /></div>');


          var checkedValue = [ ];
          var table_body=" ";
          $.each($("input[name='recipes']:checked"), function(){
              checkedValue.push($(this).val());
          });
          newVariable=checkedValue.join(", ");
          $.ajax({
            url:"https://api.spoonacular.com/recipes/findByIngredients?ingredients="+newVariable+"&apiKey=your_api_key",
            type: "GET" ,
            success: function(result) {
                console.log(result.length);
                 //table_body = "";

                   $( "#loading" ).fadeOut(7000, function() {
                     // fadeOut complete. Remove the loading div
                     $( "#loading" ).remove(); //makes page more lightweight
                   });

                   console.log(result);

              for(var p=0;p<result.length;p++)
                {
                   // (function(p){
                    table_body=" ";
                    var ID=result[p].id;
                    //alert(ID);
                  //================================
                  table_body+='<section class="col-1-3"><div class="wrap-col">'
                  table_body+='<div class="box">'
                  table_body+='<div>'
                  table_body+="<h3><span>" + result[p].title + "</span></h3>"
                  table_body+='<figure><img src="'+result[p].image+'" alt="" ></figure>'
                  if (ID!= null) {
                  $.ajax({
                  async: false,
                  url:"https://api.spoonacular.com/recipes/"+ID+"/information?includeNutrition=true&apiKey=your_api_key",
                  type: "GET" ,
                  success: function(result)
                  {
                    //alert(ID);
                    //alert(result.cookingMinutes);
                    table_body +='<p class="pad_bot1"><b>Cooking Time:</b> '+ result.cookingMinutes +'</p>'

                  },

                  error: function (error) {
                  console.log(error);
                  }
                  })
                  //===================
                  $.ajax({
                  async: false,
                  url:"https://api.spoonacular.com/recipes/"+ID+"/nutritionWidget.json?apiKey=your_api_key",
                  type: "GET" ,
                  success: function(result)
                  {
                    console.log();
                    //alert(ID);
                    //alert(result.cookingMinutes);
                    table_body +='<p class="pad_bot1"><b>Cooking Time:</b> '+ result.calories +'</p>'
                    table_body +='<p class="pad_bot1"><b>Carbs:</b> '+ result.carbs +'</p>'
                    table_body +='<p class="pad_bot1"><b>Fat:</b> '+ result.fat +'</p>'
                    table_body +='<p class="pad_bot1"><b>Protein:</b> '+ result.protein +'</p>'
                    table_body +='<a href="recipeInfo.html?val=' + ID +'" target="_blank" class="button">Read More</a>'
                    // table_body +='<span id="lblData"> '+ ID +'</span>'
                    table_body+="</div>"
                    table_body+="</div>"
                    table_body+="</div>"
                    table_body+="</section>"
                    $('.wrap').append(table_body,"<br>");

                  },

                  error: function (error) {
                  console.log(error);
                  }
                  })
                  //===================

                }
              }

            },
            error: function (error) {
              console.log(error);
            }
          })
        });

      });
