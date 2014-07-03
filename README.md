Backbone을 활용한 web application을 쉽게 만들수 있습니다.

  var Item = Backbone.BaseApp.Item.extend({
       template : _.template($("#listTmpl").html()),
       postRender : function(){
           console.log("item " + this.model.get("id") + " postRender")
       }
    });

    var app = new Backbone.BaseApp.AppView({
        Item : Item,
        el   : $("#list"),
        postRender : function(){
            console.log("app is render finished");
        }
    });
    app.collection.reset or  app.collection.fetch



