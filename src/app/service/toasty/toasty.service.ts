import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData} from 'ng2-toasty';
import {Subject, Observable, Subscription} from 'rxjs/Rx';
 
@Component({
    selector: 'app',
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-toasty></ng2-toasty>
    `
})
export class AppComponent {
    
    getTitle(num: number): string {
        return 'Countdown: ' + num;
    }
 
    getMessage(num: number): string {
        return 'Seconds left: ' + num;
    }
    
    constructor(private toastyService:ToastyService) { }
    
    addToast() {
        let interval = 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(0),
            msg: this.getMessage(0),
            showClose: true,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval);
                // Start listen seconds beat
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast
                    toast.title = this.getTitle(count);
                    // Update message of toast
                    toast.msg = this.getMessage(count);
                    // Extra condition to hide Toast after 10 sec
                    if (count > 10) {
                        // We use toast id to identify and hide it
                        this.toastyService.clear(toast.id);
                    }
                });
 
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };
 
        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}