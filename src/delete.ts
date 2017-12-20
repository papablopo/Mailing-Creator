import {autoinject, bindable} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {Confirm} from "./confirm";

@autoinject
export class Delete {
   
    @bindable
    action=()=>{};

    @bindable
    msg = "Are you sure";

    constructor(public dlg:DialogService) {
  
    }

    do() {
        this.dlg.open({
            viewModel: Confirm
            , model: this.msg
        }).then(result => {
            if (result.wasCancelled) return;
            this.action();
        });
    }
}
