/**
 * Created by joon1030 on 2014. 6. 13..
 */

;(function($){

    var callbackCnt = 0;

    var Model = Backbone.Model.extend({
        "url" : function(){
            return this.API + "?" + $.param(this.params);
        },

        "load" : function(options){
            this.apiType = "jsonp";
            Backbone.Model.prototype.fetch.call(this, _.extend({
                "reset" 		 : true,
                "dataType"  	 : "jsonp",
                "cache"			 : true,
                "jsonpCallback"  : "BaseApp" + callbackCnt++
            }, options));
        },

    });

    var Item = Backbone.View.extend({

        "tagName" : "li",

        "template" : _.template("<div><%=obj%></div>"),

        "initialize" : function(options){
            _.bindAll(this, "render");
            _.extend(this, options);
            this.on("preRender" , this.preRender);
            this.on("postRender" , this.postRender);
            this.postInitialize();
        },

        "postInitialize" : function(){

        },

        "render" : function(){
            this.trigger("preRender");
            this.$el.html(this.template(this.model.toJSON()));
            this.trigger("postRender");
            return this;
        },

        "preRender" : function(){
        },

        "postRender" : function(){
        }

    });

    var Collection = Backbone.Collection.extend({

        "params" : {

        },

        "API" : "",

        "url" : function(){
            return this.API + "?" + $.param(this.params);
        },

        "model" : Model,

        "fetch" : function(options){
            Backbone.Collection.prototype.fetch.call(this, _.extend({
                "reset" : true
            }, options));
        },

        "load" : function(options){
            this.apiType = "jsonp";
            Backbone.Collection.prototype.fetch.call(this, _.extend({
                "reset" 		 : true,
                "dataType"  	 : "jsonp",
                "cache"			 : true,
                "jsonpCallback"  : "BaseApp" + callbackCnt++
            }, options));
        },

        "next" : function(paramKey){
            this.params[paramKey] = parseInt(this.params[paramKey]) + 1;
            if(this.apiType == "jsonp"){
                this.load();
            }
            else this.fetch();
        }
    });

    var AppView = Backbone.View.extend({

        "views" : [],

        "Item" : Item,

        "Collection" : Collection,

        "initialize" : function(_options){
            _.extend(this, _options);
            _.bindAll(this,"render", "append");
            this.on("preRender", this.preRender);
            this.on("postRender", this.postRender);
            this.collection = new this.Collection();
            this.collection.on("reset" , this.render);
            this.firstRender = true;
            this.postInitialize();
        },

        "postInitialize" : function(){

        },

        "render" : function(){
            this.trigger("preRender");
            this.collection.each(this.append);
            if(this.firstRender){
                this.firstRender = false;
                this.trigger("firstRender");
            }

            this.trigger("postRender");
        },

        "append" : function(model , idx){
            var view = new this.Item({
                "model" : model.set("idx" , idx)
            });
            this.$el.append(view.render().el);
            this.views.push[view];
        },
        "preRender" : function(){

        },
        "postRender" : function(){
        }

    });

    Backbone.BaseApp =  {
        "Model" 		: Model,
        "Item" 			: Item,
        "Collection" 	: Collection,
        "AppView" 		: AppView
    };

})(jQuery);