import { LightningElement } from 'lwc';

export default class WorkTypeName extends LightningElement {
    greeting = 'World';
        changeHandler(event) {
        this.greeting = event.target.value;
        }
}