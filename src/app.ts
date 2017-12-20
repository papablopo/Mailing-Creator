import {Todo} from './todo';
import {Confirm} from './confirm';
import {inject, bindable} from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as $ from  'jquery';



let httpClient = new HttpClient();

httpClient.configure(config => {
  config
    .withDefaults({
    method: 'get',
     mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'X-VTEX-API-AppKey': 'pablov@yaesta.com',
        'X-VTEX-API-AppToken': 'PvP123456@'
      }
    })
    .withInterceptor({ response(response) {															  // MODIFY TO TAKE CAR OF OTHER 2XX SUCCESS CODES															
      if (response.status !== 200)
      {
	      throw response;
      }
        else
      {
	      return response;
      }
    }})
});

let baseUrl='http://yaesta.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/';
let baseUrlPrice='http://yaesta.vtexcommercestable.com.br/yaesta/pricing/prices/';
let productUrl='http://www.yaesta.com'
let utmValue='http://www.yaesta.com/'


@inject(HttpClient)
@inject(Confirm)
export class App {
  headingSku = "Productos por SKu";
  headingBanner = "Banner Principal";
  todos: Todo[] = [];
  todoDescription = '';
  todoCols=0;
  todoImageBanner = '';

  todoVerMas='';
  todoUnsuscribe='';

  todoMessage = '';
  todoMessageFinal = '';

  todoUrlBanner='';
  todoSkuCampaign='';
  todoSkuSource='';
  todoSkuMedium='';
  
  skuName='';
  skuPrice=0.00;
  skuListPrice=0.00;  
  skuImage='';  
  skuPath='';

  skuGet=false;
  skuPriceGet=false;
  

  skuSkuObj;
  skuPriceSkuObj;

  skuSkuJson="";
  skuPriceSkuJson="";

  constructor(){

  } 

 toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
      
        return match.toUpperCase();
    });
}

showDialog() {
 
 $('#botondel [name="btnremove"]').each(function(index,item ) {
   $(item).remove();
});
 this.todoMessageFinal="<style>";
 this.todoMessageFinal=this.todoMessageFinal + $("#main").html();
 this.todoMessageFinal=this.todoMessageFinal + "</style>"
 this.todoMessageFinal=this.todoMessageFinal + $("#template").html();
this.todoMessage= this.todoMessageFinal;


$( "#copy").click(function() {
      console.log("click");
      var $temp = $("<input>");
    $("#myModal").append($temp);
        $temp.val($("#myModal .modal-body").text()).select();
        document.execCommand("copy");
        $temp.remove();
    });
}



  saveTemplate() {
    
    console.log("path");
    
  }

urlUtmBanner () {
  this.todoUrlBanner=this.todoUrlBanner+"?utm_campaign="+this.todoSkuCampaign+"&utm_source="+this.todoSkuSource+"&utm_medium="+this.todoSkuMedium
  
}

roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

async getDataSku(skuId: string){
//debugger;    
event.preventDefault();
console.log(skuId)
    try{
        this.skuSkuObj=null;
        this.skuPriceSkuObj=null;
        this.skuSkuJson=null;
        this.skuPriceSkuJson=null;

        this.skuSkuObj =  await  httpClient.fetch(baseUrl+skuId );
        this.skuPriceSkuObj = await  httpClient.fetch(baseUrlPrice+skuId);
        
        if (this.skuSkuObj.ok) {
            this.skuSkuObj.json().then(json => {
              this.skuSkuJson=json;
                   
              if (this.skuPriceSkuObj.ok) {
                this.skuPriceSkuObj.json().then(json => {
                 
                  this.skuPriceSkuJson=json;
                    console.log(this.skuSkuJson.ImageUrl.replace("-100-100","-250-250"))
                    this.todos.push(new Todo(skuId,
                                     this.toTitleCase(this.skuSkuJson.ProductName.toLowerCase ().substring(0,32)),
                                     this.roundToTwo(this.skuPriceSkuJson.basePrice*1.12),
                                     this.roundToTwo(this.skuPriceSkuJson.listPrice*1.12),
                                     this.skuSkuJson.ImageUrl.replace("-100-100","-250-250"),
                                     productUrl+this.skuSkuJson.DetailUrl+"?utm_campaign="+this.todoSkuCampaign+"&utm_source="+this.todoSkuSource+"&utm_medium="+this.todoSkuMedium));

                                     this.todoDescription='';
                });
              }

            });
            
          }else{
             console.log("Error al leer sku: ");
            alert("error");
          }

      
        /**/
    } 
      catch(error){
        console.error(error);
      };    
   
}



  /*
  getSku1(skuId:string){
          
          var serverData = "";

                  $.ajax({
                            type: "get",
                            url: baseUrl+skuId,
                            crossDomain: true,
                            headers: {
                                'X-VTEX-API-AppKey':'name',
                                'X-VTEX-API-AppToken':'pass',
                                'Content-Type':'text/plain',
                                'Access-Control-Allow-Origin':''
                            },
                            success: function (data) {                        
                                serverData = data;
                                console.log(JSON.stringify(data));
                                this.addTodo();
                            },
                            error: function (err) {               
                                console.log('error:' + JSON.stringify(err));
                            },
                            complete: function () {
                            return serverData;
                            }
                        });     

    }
*/



  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

   

}