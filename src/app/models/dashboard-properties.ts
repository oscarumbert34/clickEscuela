export class Dashboardproperties {
    private title: string;
    private result: string;
    private classIcon: string;


    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getResult(): string {
        return this.result;
    }

    public setResult(result: string): void {
        this.result = result;
    }

    public getClassIcon(): string {
        return this.classIcon;
    }

    public setClassIcon(classIcon: string): void {
        this.classIcon = classIcon;
    }


    constructor(title: string, result: string, classIcon: string){
        this.result = result;
        this.title = title;
        this.classIcon = classIcon;
    }



}