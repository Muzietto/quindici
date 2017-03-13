(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'hyera': 'js/hyera',
      'hyera_test': 'spec/hyera_test',
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
    require(['hyera_test'], function() {
      var runner = mocha.run();
    });
  })
})();