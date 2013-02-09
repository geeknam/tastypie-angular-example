
angular.module('Product', ['ngResource'], function ($interpolateProvider){
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
}).factory('Product', ['$http', function($http){

    var Product = function(data) {
        angular.extend(this, data);
    };

    Product.get = function(id) {
        return $http.get('/api/product/' + id).then(function(response) {
            return new Product(response.data);
        });
    };

    Product.getAll = function() {
        return $http.get('/api/product/').then(function(response) {
            return response.data.objects;
        });
    };

    Product.create = function(product) {
        return $http.post('/api/product/', product).then(function(response) {
            return response.data;
        });
    };

    Product.prototype.update = function() {
        var product = this;
        return $http.put('/api/product/' + product.id + '/', product).then(function(response) {
            return response.data;
        });
    };

    Product.prototype.remove = function(id) {
        return $http.delete('/api/product/' + id + '/').success(function(){
            console.log("delete successful");
        });
    };

    return Product;
}]);


function ProductListController($scope, Product, $resource) {
    $scope.products = Product.getAll();
    $scope.orderProp = 'code';

    $scope.addProduct = function(){
        var product = new Product(Product.create($scope.product));
        $scope.$emit('product_added', product);
    };

    $scope.$on("product_added", function(event, product){
        $scope.products.$$v.push(product);
    });
}


function ProductController($scope, Product) {

    $scope.update = function(data){
        var product = new Product(data);
        product.update();
    };

    $scope.remove = function(data, index){
        var product = new Product(data);
        $scope.products.$$v.splice(index, 1);
        product.remove(product.id);
    };

}
