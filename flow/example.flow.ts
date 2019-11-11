import {Page} from '../po/basic.po';
import {step} from '../utils/utils';
import BasicFlow from './basic.flow';

class ExampleFlow extends BasicFlow<Page> {
    constructor(public t: TestController) {
        super(t, new Page());
    }

    @step({desc: 'type your name {0}', expected: 'action should work'})
    typeYourName(name: string): this | any {
        return async t =>  await t.typeText(this.page.nameInput, name)
    }

    @step({desc: 'click submit button', expected: 'should go to thank you page'})
    submitForm(): this | any {
        return async t =>  await t.click(this.page.submitButton)
    }

    @step({desc: 'check article header', expected: 'should be {0}'})
    checkArticleHeader(expectedHeader: string): this | any {
        return async t =>  await t.expect(this.page.articleHeader.innerText).eql(expectedHeader);
    }

}

export default ExampleFlow;