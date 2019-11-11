import {logger} from './logger';

export function step({desc, expected}: {desc: string, expected: string})  {
    return function (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const oneStep = originalMethod.apply(this, args);
            let stepDesc = desc;
            let expectedDescContent = expected;
            args.forEach((val, idx) => {
                const paraReg = new RegExp('{(' + idx + ')}', 'g');
                stepDesc = stepDesc.replace(paraReg, JSON.stringify(val));
                expectedDescContent = expectedDescContent.replace(paraReg, JSON.stringify(val));
            });

            Object.defineProperty(oneStep, 'name', {
                value: {content: stepDesc, expected: expectedDescContent},
                writable: false
            });
            this.steps.push(oneStep);
            return this;
        }
    }
}

let TEST_IDX_NUM = 0;
const IS_CONCURRENT = process.argv.includes('-c');

export const pipePromise = (...fns: any[]) => (x: any) => {
    logger.logCase(IS_CONCURRENT ? undefined : ++TEST_IDX_NUM);
    return fns.reduce((p, fn) => p.then(_ => {
        logger.logStep(fn.name.content, fn.name.expected);
        return fn(x);
    }), Promise.resolve())
};

export const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
    baseCtors.forEach(baseCtors => {
        Object.getOwnPropertyNames(baseCtors.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtors.prototype, name));
        });
    });
};

