import {Selector} from "testcafe";

export class Page {
    constructor(
        public nameInput?: Selector,
        public submitButton?: Selector,
        public articleHeader?: Selector
    ) {
        this.nameInput = Selector('#developer-name');
        this.submitButton = Selector('#submit-button');
        this.articleHeader = Selector('#article-header');
    }
}