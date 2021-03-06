/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test ensures that feed URL is defined and not empty
         */
         it('URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
              var feedUrl = feed.url;
              expect(feedUrl).toBeDefined();
              expect(feedUrl.length).not.toBe(0);
            });
         });

        /* test ensures that each feed has a name defined
         * and that the name is not empty.
         */
         it('Name defined and not empty', function() {
           allFeeds.forEach(function(feed) {
             var feedName = feed.name;
             expect(feedName).toBeDefined();
             expect(feedName.length).not.toBe(0);
           });
         });
    });


    /* test suite for application Menu */
      describe('The menu', function() {
        /* test that ensures the menu element is
         * hidden by default
         */
         it('menu hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked
          */
          it('menu visibility changes when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    /* test suite to check that feeds load */
      describe('Initial Entries', function() {
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * load the first feed before testing
         */
        beforeEach(function(done) {
          loadFeed(0, done);
        });
        it('at least one entry element', function() {
          expect($('.feed .entry').length).toBeGreaterThan(0);
        });
      });

    /* test suite to check that content changes when new feed is loaded */
        describe('New Feed Selection', function() {
          var prevFeed;
          var newFeed;
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeEach((done)=> {
             loadFeed(0, function() {
          //load previous feed variable
             prevFeed = $('.feed').html();
             
              loadFeed(1, function() {
           //load new feed  variable
              newFeed = $('.feed').html();
            done();
        });
      });
    });
        /* compare the two feed screens for differences
         * to make sure that content changes when new feed is loaded
         */
        it('content changes with new feed', function(done) {
            expect(prevFeed).not.toBe(newFeed);
            done();
          });
        });

}());
