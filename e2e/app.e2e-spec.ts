import { RubyconPage } from './app.po';

describe('rubycon App', () => {
  let page: RubyconPage;

  beforeEach(() => {
    page = new RubyconPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
