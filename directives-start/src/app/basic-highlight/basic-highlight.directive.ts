import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elemnetRef: ElementRef){

    }

    ngOnInit(): void {
        this.elemnetRef.nativeElement.style.backgroundColor = 'green';
    }
}