/**
 * Created by Machete on 27.12.2014.
 */
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var formidable = require('formidable');

exports.list = function(req, res, next){
    Photo.find({}, function(err, photos){
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};

exports.form = function(req, res){
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function(dir){
    return function(req, res, next){
        var form = new formidable.IncomingForm();
        form.uploadDir = './upload';
        form.parse(req, function(err, fields, files) {
            var img = files.image;
            var name = fields.name || img.name;
            var path = join(dir, img.name);

            fs.rename(img.path, path, function(err){
                if (err) return next(err);

                Photo.create({
                    name: name,
                    path: img.name
                }, function(err){
                    if (err) return next(err);
                    res.redirect('/');
                })
            });
        });
    };
};