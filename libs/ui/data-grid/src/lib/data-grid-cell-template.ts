import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[cellTemplate]',
    standalone: true
})
export class CellTemplateDirective {
    @Input('cellTemplate') name!: string;

    constructor(public template: TemplateRef<any>) { }
}
