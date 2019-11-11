import {Page} from '../po/basic.po';
import {applyMixins, pipePromise} from '../utils/utils';

class BasicFlow<T extends Page> {
    protected steps: Array<(t: TestController) => Promise<any>> = [];
    constructor(public t: TestController, public page: T) {
    }

    async excute() {
        await this.t.maximizeWindow();
        await pipePromise(...this.steps)(this.t);
        return this.steps.map(tStep => tStep.name);
    }
}


// applyMixins(BasicFlow, [SomeFlow]);

export default BasicFlow;