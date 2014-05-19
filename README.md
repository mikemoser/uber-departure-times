Departure Times by Mike Moser
=====

[uberVs](http://ubervs.herokuapp.com) (uber versus) gets real-time departures for nearby MUNI stops based on the users current location and compares it to the estimated time for the closest uber (mocked).  Hence the vs (e.g. uber vs muni). A fun feature to encourage Uber usage and new riders.  

Live on Heroku @ [http://ubervs.herokuapp.com](http://ubervs.herokuapp.com)

![uberVs screen shot](http://ubervs.herokuapp.com/img/screen-shot.png)

Technology
---
I went full stack and built a fully functional app using the following technologies:

- **Backbone.js** (first time using) - it's lightweight and gives you full control while still promoting good separation of concerns. Plus a fun chance to learn it!


- **Require.js** (first time using) - to organize the client side javascript modules and dependencies.


- **Node.js** - great for quickly building RESTful servers and allows one language (javascript) to be used on both the client and the server.


- **MongoDb** - used for its [geoNear](http://docs.mongodb.org/manual/reference/command/geoNear) command to easily find stops near the users location and its BJSON format plays well with Node.js.


Trade-offs & Todos
---

Functionality 

- Only supports MUNI (e.g SF users)
- Does not filter inactive routes (so downtown shows a lot of routes w/o predictions)
- Uber estimates are mocked, "Request Uber" links to site, doesn't launch app
- Ux dead end if location not found/allowed (should allow manual selection)
- Doesn't consider accuracy of user location data
- Doesn't show user's location on map (confidence/confirmation)
- UI doesn't have smooth transitions on load
- Need live polling to update predictions


Architecture

- Need better test coverage (very lacking) 
- Denormalized model for search due to MongoDb limitations and search optimization
- Ensure Backbone best practices (need peer review)
- Crude data loading process for Nextbus data (would organize better)
- Need to separate CSS files and then concat on build process
- Use HTML5 Boilerplate & Modernizer

Known Issues / Assumptions

- Some Nextbus stops don't have direction data, need to investigate why (currently assuming "end of line").


Setup & Configuration
---

This setup assumes you have the following dependencies installed: 

- [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
- [Node.js](http://nodejs.org/)
- [Npm](http://nodejs.org/) (note: installed with latest node.js)
- [MongoDb](http://www.mongodb.org/) (note: could use hosted db, [MongoHQ](https://www.mongohq.com/))
- [Grunt](http://gruntjs.com/)

To set up your local environment, open terminal and:

```
$ git clone git@github.com:mikemoser/uber-departure-times.git
$ cd uber-departure-times
$ mongod            // Open new terminal tab, Should start on port 27017
$ node server/load-data
$ grunt
```
Check out the site!

[http://localhost:3000](http://localhost:3000)


#### Configuration
Open /server/config/env/app.json and adjust values

```
{
  "default": {
    "port": 3000,
    "db": "mongodb://127.0.0.1:27017/uber-departure-times",
    "maxDistance" : 0.01,
    "search": {
      "limit": 5
    }
  },
  
  "test": {
    "db": "mongodb://127.0.0.1:27017/uber-departure-times-test"
  },

  "production": {
    "db": "mongodb://[USERNAME]:[PASSWORD]@oceanic.mongohq.com:10055/app25273437"
  }
}
```

Links
---
[my resume](https://drive.google.com/file/d/0BwJ5-4p6KtTyU2xwdWZ6eDJfNDg/edit?usp=sharing)

