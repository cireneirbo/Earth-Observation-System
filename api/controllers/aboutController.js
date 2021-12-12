// import libraries and project files

// Make a request for data from NASA API
exports.index = function (req, res, next) {

    try {
          res.render('about', { title: 'About EOS' } );
    } catch (error) {
          console.error(error);
          res.render('error', { error: error});
    }

}
