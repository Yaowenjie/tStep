import ExampleFlow from './flow/example.flow';

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('My first test for BDD', async t => {
  // await t
  //     .typeText('#developer-name', 'John Smith')
  //     .click('#submit-button')
  //     .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
  return await new ExampleFlow(t)
      .typeYourName('John Smith')
      .submitForm()
      .checkArticleHeader('Thank you, John Smith!')
      .excute();
});
