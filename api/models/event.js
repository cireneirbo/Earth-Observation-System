/*const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    eonet_id: {type: String, required: true, maxLength: 100},
    eonet_title: {type: String, required: true, maxLength: 100},
    eonet_description: {type: String, required: false, maxLength: 500},
    eonet_link: {type: String, required: true, maxLength: 100},
    eonet_closed: {},//{type: String, required: true, maxLength: 10},
    eonet_categories: {type: Array},
    eonet_sources: {type: Array},
    eonet_geometry: {type: Array},
  }
);

// Virtual for event's time since opened
EventSchema.virtual('duration').get(function() {
  let duration_string = '';
  // if closed
  if (this.eonet_closed != null) {
    duration_string = "Closed On: " + DateTime.fromJSDate(this.eonet_geometry.date).toLocaleString(DateTime.DATE_MED);
  }
  else {
    duration_string = "Opened On: " + DateTime.fromJSDate(this.eonet_geometry.date).toLocaleString(DateTime.DATE_MED);
  }
  return duration_string;
});

// Virtual for event's URL
EventSchema
    .virtual('url')
    .get(function () {
        return '/events/event/' + this._id;
    }
);

//Export model
module.exports = mongoose.model('Event', EventSchema);
*/