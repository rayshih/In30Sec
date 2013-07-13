var parseData = function ( data ){
  var user = data;
  var earliest_yr = 2020;
  var latest_yr = 1900;
  var publications = user.publications.values;
  var educations = user.educations.values;
  var positions = user.positions.values;
  var skills = user.skills.values;

  var timeline = new Object();

  timeline.name = user.firstName +" " + user.lastName;
  timeline.headline = user.firstName +" " + user.lastName+ "'s timeline";
  timeline.type = "default";
  timeline.text = user.summary;
  /*
     var asset = new Object();

     asset.media = "http://yourdomain_or_socialmedialink_goes_here.jpg";
     asset.credit = "Credit Name Goes Here";

     asset.caption = "Caption text goes here";

     timeline.asset = asset;
     */
  timeline.date = new Array();

  var asset = new Object();

  asset.media = "http://www.springerhealthcare-rapidpubs.com/Images/content-icon-rapid-publication.png";
  asset.credit = "http://www.springerhealthcare-rapidpubs.com/Home/why-choose-us";

  asset.caption = "publication";

  for (var i in publications){

    var dateObject = new Object();
    dateObject.startDate = publications[i].date.year + "," +publications[i].date.month+",15";
    var end_month = publications[i].date.month+1; 
    dateObject.endDate = publications[i].date.year + ","+ end_month+",15";
    dateObject.headline = publications[i].title;
    dateObject.text = publications[i].title;
    dateObject.asset = asset;
    timeline.date.push(dateObject);
  }

  timeline.era = new Array();

  for (var i in educations){
    var dateObject = new Object();
    dateObject.startDate = educations[i].startDate.year + ",8,15";
    dateObject.endDate = educations[i].endDate.year + ",6,15";
    dateObject.headline = educations[i].schoolName;
    dateObject.text = educations[i].degree+" in "+educations[i].fieldOfStudy;
    timeline.era.push(dateObject);
  }

  for (var i in positions){
    if(positions[i].startDate.year < earliest_yr){
      earliest_yr = positions[i].startDate.year;
    }
    if(positions[i].endDate.year > latest_yr){
      latest_yr = positions[i].endDate.year;
    }
    var dateObject = new Object();
    dateObject.startDate = positions[i].startDate.year + "," +positions[i].startDate.month +",15";
    dateObject.endDate = positions[i].endDate.year + ","+ positions[i].endDate.month +",15";
    dateObject.headline = positions[i].title + " in " + positions[i].company.name;
    dateObject.text = positions[i].summary;
    //dateObject.asset = asset;
    timeline.date.push(dateObject);
  }


  var out = new Object();

  timeline.skills = new Array();

  for (var i in skills){
    var skillObject = new Object();
    skillObject.name = skills[i].skill.name;
    skillObject.ability = skills[i].id%5+1;
    timeline.skills.push(skillObject);
  }

  timeline.experience_year = latest_yr - earliest_yr;

  timeline.numConnections = user.numConnections;

  timeline.summary = user.summary;

  timeline.pictureUrl = user.pictureUrl;

  out.timeline = timeline;

  return out;
}
