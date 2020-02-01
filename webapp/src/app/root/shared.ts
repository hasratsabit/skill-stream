

export class SharedComponent {
    constructor(
        public text: string
    ) {}


    logThis() {
        console.log(this.text);
    }
}