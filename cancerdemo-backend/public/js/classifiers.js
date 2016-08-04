'use strict';

module.exports.getClassifiers = function getClassifiers() {
  return $.get('/api/classifiers');
};

module.exports.removeClassifier = function removeClassifier(id) {
  return $.post('/api/delete_classifier/' + id);
};