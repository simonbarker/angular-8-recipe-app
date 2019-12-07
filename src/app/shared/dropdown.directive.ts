import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') open = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('click') toggleOpen(eventDate: Event) {
        this.open = !this.open;
        // if (this.open) {
        //     this.renderer.addClass(this.elRef.nativeElement, 'open');
        // } else {
        //     this.renderer.removeClass(this.elRef.nativeElement, 'open');
        // }
    }

}