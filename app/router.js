import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource("locations", function() {
    this.route("new");

    this.route("edit", {
      path: ":location_id/edit"
    });

    this.route("show", {
      path: ":location_id"
    });
  });

  this.resource("meetings", function() {
    this.route("new");

    this.route("edit", {
      path: ":meeting_id/edit"
    });

    this.route("show", {
      path: ":meeting_id"
    });
  });

  this.resource("pairings", function() {
    this.route("new");

    this.route("edit", {
      path: ":pairing_id/edit"
    });

    this.route("show", {
      path: ":pairing_id"
    });
  });
});