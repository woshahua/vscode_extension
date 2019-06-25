import * as vscode from "vscode";
import goTourView from "./goTourView";

export class Scheduler{
    public constructor(private context: vscode.ExtensionContext){
    }

    public start(){
        setInterval(()=>{
            goTourView.show(this.context);
        }, 100);
    }
}