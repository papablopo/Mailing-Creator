import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import * as $ from 'jquery';

//import 'fetch';
//import { HttpClient, json } from 'aurelia-fetch-client';

/*
let httpClient = new HttpClient();

httpClient.configure(config => {
  config
   // .withBaseUrl('http://yaesta.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/123')
    .withDefaults({
    method: 'get',
     mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'X-VTEX-API-AppKey': 'pablov@yaesta.com',
        'X-VTEX-API-AppToken': 'PvP123456@'
      }
    })
});
*/
let baseUrl='https://yaesta.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/';


/*
var client = new HttpClient()
  .configure(x => {
    x.withBaseUrl(baseUrl);
    //x.withParams({'X-VTEX-API-AppKey': 'pablov@yaesta.com', 'X-VTEX-API-AppToken': 'PvP123456@'} );
    //x.withParams('X-VTEX-API-AppToken: PvP123456@' );
    x.withHeader('X-VTEX-API-AppKey' , 'pablov@yaesta.com');
    x.withHeader('X-VTEX-API-AppToken' , 'PvP123456@');
    
  });*/
@inject(HttpClient)
export class Sku {
 heading = 'Sku Object';
  skuObject='';
  githubEndpoint = null;

/*
constructor(httpClient) {
    httpClient.configure(config => {
      config
        .withBaseUrl('http://localhost:8080/api/v1')
        .withDefaults({
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-type' : 'application/json'
          }
        });
    });
    
}

*/
/*
constructor(httpClient) {
    client = httpClient;
    //client.configure(x => { x.withCredentials(); });
}
*/

    getSku(skuId:string){
          
          var serverData = "";

                  $.ajax({
                            type: "get",
                            url: baseUrl+skuId,
                            headers: {
                                'X-VTEX-API-AppKey':'pablov@yaesta.com',
                                'X-VTEX-API-AppToken':'PvP123456@',
                                'Content-Type':'application/json'
                            },
                            success: function (data) {                        
                                serverData = data;
                                console.log(JSON.stringify(data));
                            },
                            error: function (err) {               
                                console.log('error:' + JSON.stringify(err));
                            },
                            complete: function () {
                            return serverData;
                            }
                        });     

    }

/*    getSku1(skuId: string){ 
       var urlconsume=baseUrl+skuId;
        client.get(urlconsume)
        .then(response => {
            return response.content;
        }).catch(error => {
        console.log('Error consulting sku!'+error);
    });
    }
 
   /* getSku(skuId: string){
       httpClient.fetch (baseUrl+skuId).then(response => response.json())
    .then(sku => {
        console.log('SKU! ID: ${sku.id}');
    })
    .catch(error => {
        console.log('Error consulting sku!'+error);
    });
        
    return;
    }   */   
      
  }