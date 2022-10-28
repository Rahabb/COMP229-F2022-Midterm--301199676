// modules required for routing
const { response } = require("express");
let express = require("express");
const { grep } = require("jquery");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  res.render('faculties/add', { title: 'Add facutly' })
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  let newFaculty = faculty({
    "Facultyid": Number(req.body.Facultyid),
    "Facultyname": req.body.Facultyname,
    "Department": req.body.Department,
    "Subject": req.body.Subject,
  });

  faculty.create(newFaculty, (err, faculty) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/faculties');
    }
  });
});
/*****************
 * ADD CODE HERE *
 *****************/

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  faculty.findById(req.params.id, (err, faculty) => {
    if (err) {
      console.log(err)
      res.end(err);
    } else {
      console.log({ faculty });
      res.render('faculties/details', { title: 'facutly Details', faculty })
    }
  })

  /*****************
   * ADD CODE HERE *
   *****************/
});


//Edit Page
router.get("/edit/:id", (req, res, next) => {
  faculty.findById(req.params.id, (err, faculty) => {
    if (err) {
      console.log(err)
      res.end(err);
    } else {
      console.log({ faculty });
      res.render('faculties/edit', { title: 'facutly Edit', faculty })
    }
  })

  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let newFaculty = {
    "Facultyid": Number(req.body.Facultyid),
    "Facultyname": req.body.Facultyname,
    "Department": req.body.Department,
    "Subject": req.body.Subject,
  };

  faculty.findByIdAndUpdate(req.params.id, newFaculty, (err, faculty) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect(`/faculties/${faculty._id}`);
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  faculty.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/faculties');
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
