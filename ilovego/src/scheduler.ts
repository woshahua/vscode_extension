import * as vscode from "vscode";
import {GotourView} from "./goTourView";

export class Scheduler{
    public constructor(private context: vscode.ExtensionContext){
    }

    public start(){
        setInterval(()=>{
            GotourView.show(this.context);
        }, 10000);
    }
}