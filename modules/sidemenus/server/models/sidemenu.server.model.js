'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    fs = require('fs'),
    async=require('async'),
	Schema = mongoose.Schema;

/**
 * Sidemenu Schema
 */


var SidemenuSchema = new Schema({
    icon:{
        type: String,
        default: 'modules/sidebars/svg/default.JSON'
    },
    title:{
        type:String,
        default:'menu',
        trim:true
    },
    link:{
        type: String,
        trim:true,
        require:true
    },
    position:{
        type:Number,
        require:true
    },
    params:{
        type: String
    },
    category:{
        type: String,
        require:true
    },
    activation:{
        type:Boolean,
        default:false
    },
    htmlContent:{
        type: String
    },
    public:{
        type: Boolean,
        default:true
    },
    createdBy:{
        type: String
    }
});


SidemenuSchema.statics.createUserSidebar = function(callback){
    var Self = this;
    this.find({createdBy : 'default'}).exec(function(err, menus){
        if(err){
            console.log(err);
        }
        //A SUPPRIMER POUR LA VERSION DE PRODUCTION
        else if(menus.length === 0){
            createSidemenuCollection(function(menus){
                callback(populateSidebar(menus));
            });
        }
        else if(menus.length>0){
            callback(populateSidebar(menus));
        }
    });

    function createSidemenuCollection(callback){
        fs.readFile('modules/sidemenus/server/data/userSidebar.server.data.txt', function(err, sidebar) {
            var menus=[];
            async.each(JSON.parse(sidebar), function(menu, callbackEach){
                var newMenu = new Self(menu);
                newMenu.save(function (err, menu) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        menus.push(menu);
                        callbackEach();
                    }
                });

            }, function(err){
                if(err){
                    console.log(err);
                } else {
                    callback(menus);
                }
            });
        });
    }

    function populateSidebar(menus){
        return {
            profile :menus.filter(function(menu){return menu.category === 'profile';}).map(function(menu){return menu._id;}),
            search: menus.filter(function(menu){return menu.category === 'search';}).map(function(menu){return menu._id;})
        };
    }

};


mongoose.model('Sidemenu', SidemenuSchema);



