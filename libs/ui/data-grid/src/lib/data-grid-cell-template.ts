import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[cellTemplate], ng-template[appCellTemplate]',
    standalone: true
})
export class CellTemplateDirective {
    @Input('cellTemplate') name!: string;
    @Input('appCellTemplate') set appName(value: string) {
        this.name = value;
    }

    constructor(public template: TemplateRef<any>) { }
}
