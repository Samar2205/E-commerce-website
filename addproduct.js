var shopcart = [];

$(document).ready(function(){
	outputCart();
	$(".productItem").click(function(e){
		e.preventDefault();
		var itemInfo = $(this.dataset)[0];
		itemInfo.qty = 1;
		var itemInCart = false;
		$.each(shopcart,function(index,value){
			if (value.id == itemInfo.id) {
				value.qty = parseInt(value.qty) + parseInt(itemInfo.qty);
				itemInCart = true;
			}
		})
		if (!itemInCart) {
			shopcart.push(itemInfo);
		}															
		sessionStorage["sca"] = JSON.stringify(shopcart);
		outputCart();
	})
	function outputCart() {
		if (sessionStorage["sca"] != null) {
			shopcart = JSON.parse(sessionStorage["sca"].toString());	
		}
		$("#checkoutdiv").show;
var holderHtml = "";
	var total = 0;
	var itemCount = 0;
	$.each(shopcart, function(index, value) {
		var subTotal = value.qty * value.price;
		total = total + subTotal;
		itemCount = itemCount + parseInt(value.qty);
		holderHtml = holderHtml + '<tr><td>' + value.qty + '</td><td>' + value.id + ' ' + value.name + '(' + value.s + ')</td><td> ' + formatMoney(value.price) + ' </td><td class="text-xs-right"> ' + formatMoney(subTotal) + '</td></tr>';
	})
	holderHtml = holderHtml + '<tr><td colspan="3" class="text-xs-right">Total</td><td class="text-xs-right">' + formatMoney(total) + '</td></tr>';
	$("#output").html(holderHtml);
	$(".total").html(formatMoney(total));
	$(".items").html(itemCount);
	}
	function formatMoney(n) {
                return 'Rs' + n;
            }

})
