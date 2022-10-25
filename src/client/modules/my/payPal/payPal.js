import { LightningElement} from 'lwc';
const HTML = `<p>test</p>`;
export default class PayPal extends LightningElement {

    testRender(){
        return HTML;
    }

    renderedCallback() {
        console.log(window.paypal.Buttons);
        let el = this.template.querySelector('#paypal-button-container');
        window.paypal.Buttons({
            // Order is created on the server and the order id is returned
            createOrder: (data, actions) => {
                return fetch("http://localhost:3002/api/orders", {
                    method: "post",
                    // use the "body" param to optionally pass additional order information
                    // like product ids or amount
                })
                    .then((response) => response.json())
                    .then((order) => order.id);
            },
            // Finalize the transaction on the server after payer approval
            onApprove: (data, actions) => {
                return fetch(`http://localhost:3002/api/orders/${data.orderID}/capture`, {
                    method: "post",
                })
                    .then((response) => response.json())
                    .then((orderData) => {
                        // Successful capture! For dev/demo purposes:
                        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                        const transaction = orderData.purchase_units[0].payments.captures[0];
                        alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                        // When ready to go live, remove the alert and show a success message within this page. For example:
                        // const element = document.getElementById('paypal-button-container');
                        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                        // Or go to another URL:  actions.redirect('thank_you.html');
                    });
            }
        }).render(el);
        // let el = this.template.querySelector('#paypal-button-container');
        // el.innerHTML = HTML;
    }
}
