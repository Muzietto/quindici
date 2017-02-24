(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'quindici': 'js/quindici',
      'quindici_test': 'spec/quindici_test',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai'
    },
    shim: {
      mocha: {
        init: function() {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });
  define(['mocha'], function(mocha) {
    require(['quindici_test'], function() {
      var runner = mocha.run();
    });
  })
})();