
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
        return $http.post('/api/product/', product).success(function(response) {
            return response.data;
        }).error(function(data){
            console.log(data);
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
    $resource('/api/product/').get(function(response){
        $scope.products = response.objects;
    });
    $scope.orderProp = 'code';

    $scope.addProduct = function(){
        $("#loader").removeClass("hide");
        var product = Product.create($scope.product);
        $scope.$emit('product_added', product.$$v);
    };

    $scope.$on("product_added", function(event, product){
        $scope.products.push(product);
        $("#loader").addClass("hide");
    });
}


function ProductController($scope, Product) {
    $scope.update = function(data){
        $("#loader").removeClass("hide");
        var product = new Product(data);
        product.update();
        $("#loader").addClass("hide");
    };

    $scope.remove = function(data, index){
        $("#loader").removeClass("hide");
        var products = $scope.products;
        var product = new Product(data);
        products.splice(products.indexOf(product), 1);
        product.remove(product.id);
        $("#loader").addClass("hide");
    };

}
