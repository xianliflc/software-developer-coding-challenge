var M = require('materialize-css');
var http = require('http');
const baseUrl = "http://localhost:8080/api";
var J = require('jquery')
const http_utils = require('./utils/http');
const beautify_json = require('./utils/beautify_json').beautify_json;

document.addEventListener('DOMContentLoaded', function() {

    var cars_list = document.querySelectorAll('.collapsible');
    var cars_list_instance = M.Collapsible.init(cars_list, {});
    var users_drop_down = document.querySelectorAll('#users_dropdown-trigger');
    var users_drop_down_instance = M.Dropdown.init(users_drop_down, {});
    var user_id = 1;

    // render car list
    http_utils.http_get(baseUrl + '/car', function(data){
      data.data.cars.forEach(function(item) {
        J(cars_list).append(`<li id="car_id_` + item.id + `">
        <div class="collapsible-header"><i class="material-icons">directions_car</i>` + item.id + ':' + item.name + `</div>
        <div class="collapsible-body"> 
          <a id="all_` + item.id + `"class="waves-effect waves-light btn allbids">All Bids</a>
          <a id="winner_` + item.id + `"class="waves-effect waves-light btn winningbid">Winning Bid</a>
          <a id="add_` + item.id + `"class="waves-effect waves-light btn addbid">Add Bid</a>
          <input id="input_` + item.id + `" type="text">
          <label for="input_` + item.id + `">Bidding value, only number</label>
          <pre class="result" style="display:none;"></pre>
        </div>
        </li>`);
      });
      // add event listeners for getting all bids on a car
      J('.allbids').on('click', function(){
        var parent = J(this).closest('.collapsible-body');
        var id = this.id.replace('all_', '');
        console.log(this, this.id)
        http_utils.http_get(baseUrl + '/bids/' + id, function(allbids){
          parent.children('.result').show().empty().append(beautify_json(allbids));
        })
      });
      // add event listeners for get the winning bid
      J('.winningbid').on('click', function(){
        var parent = J(this).closest('.collapsible-body');
        var id = this.id.replace('winner_', '');
        console.log(this, this.id)
        http_utils.http_get(baseUrl + '/bids/' + id + '/winner', function(winner){
          parent.children('.result').show().empty().append(beautify_json(winner));
        })
      });
      // add event listeners for adding a bid
      J('.addbid').on('click', function(){
        var parent = J(this).closest('.collapsible-body');
        var id = this.id.replace('add_', '');
        console.log(this, this.id)
        http_utils.http_post('/bids/' + id , {user_id: user_id, bidding_value : J('#input_' + id).val()},function(result){
          parent.children('.result').show().empty().append(beautify_json(result));
        })
      });
      J(cars_list).show();
    });

    // render users list
    http_utils.http_get(baseUrl + '/user', function(data){
      data.data.users.forEach(function(item) {
        J('#users_dropdown').append('<li id="user_id_' + item.id + '"><a href="#!">' + item.id + ':' + item.name + '</a></li>');
      });
      J('#users_dropdown li').on('click', function(){
        user_id = this.id.replace('user_id_', '');
        J('#current_user').text('Current User: user ' + user_id);
      });
      J('#users_dropdown-trigger').show();
    });

});


