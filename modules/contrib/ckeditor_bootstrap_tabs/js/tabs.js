/**
 * @file
 * Provides JavaScript additions to ckeditor tabs bootstrap.
 *
 * This file provides bootstrap tabs in ckeditor.
 */

 jQuery(document).ready(function(){
     jQuery('.menu-item a').click(function(event){
         //remove all pre-existing active classes
         jQuery('.is-active').removeClass('is-active');
         jQuery('.active-content').removeClass('active-content');

         //add the active class to the link we clicked
         jQuery(this).addClass('is-active');
         console.log(jQuery('.is-active').parents('ul').length);

         //Load the content
         //e.g.
         //load the page that the link was pointing to
         //$('#content').load($(this).find(a).attr('href'));

         //event.preventDefault();
     });
 });

(function ($, Drupal) {

  "use strict";

  var initCKEditorTabs = function() {
    for (var i in CKEDITOR.instances) {
      if (CKEDITOR.instances[i].document) {
        var $tabComponents = $(CKEDITOR.instances[i].document.$.body).find('.bootstrap-tabs');
        tabsInit($tabComponents);
      } else {
        CKEDITOR.instances[i].on('instanceReady', function (instanceReadyEventObj) {
          var editorInstanceData = CKEDITOR.instances[i].document.getBody();
          var $tabComponents = $(editorInstanceData.$).find('.bootstrap-tabs');
          tabsInit($tabComponents);
        });
      }
    }
  };

  /**
   * Attach behaviors to tabs for ckeditor.
   */
  Drupal.behaviors.ckeditorTabs = {
    attach: function (context, settings) {
      if (typeof CKEDITOR === 'undefined') {
        var $viewTabs = $('.bootstrap-tabs', context);
        if ($viewTabs.length > 0) {
          tabsInit($viewTabs);
        }
        return;
      }

      initCKEditorTabs();

      CKEDITOR.on("instanceReady", function() {
        initCKEditorTabs();
      });
    }
  };

  function tabsInit(elements) {
    var $tabComponents = elements;

    if ($tabComponents.length > 0) {
      $tabComponents.each(function () {
        var $tabs = $(this).find('.nav-tabs');
        $tabs
          .off('click', 'li > a')
          .on('click', 'li > a', function (e) {
            e.preventDefault();

            var link = $(this);

            link
              .parent().addClass('active')
              .siblings().removeClass('active');

            link.parents('.bootstrap-tabs').find(link.attr('href')).addClass('active')
              .siblings().removeClass('active');
          })
      });
    }
  }

}(jQuery, Drupal));
