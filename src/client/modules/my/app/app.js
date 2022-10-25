import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isPayPal = false;

    handleClick(){
        console.log('handleClick');
        this.isPayPal = !this.isPayPal;
    }

    handleNode(){
        fetch('http://localhost:3002/api/testing', {
            method: 'post',
            body: '{"name" : "Sherbaz"}',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => console.log(res));
    }
}
